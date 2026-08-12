'use client'

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react'

/**
 * Global state for the reduced motion override.
 * This allows a manual toggle that persists across components.
 */
let globalReducedMotionOverride: boolean | null = null
const listeners = new Set<() => void>()

function getSnapshot(): boolean | null {
  return globalReducedMotionOverride
}

function getServerSnapshot(): boolean | null {
  return null
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function setReducedMotionOverride(value: boolean | null): void {
  globalReducedMotionOverride = value
  listeners.forEach((listener) => listener())

  // Persist to localStorage
  if (typeof window !== 'undefined') {
    if (value === null) {
      localStorage.removeItem('reduced-motion-override')
    } else {
      localStorage.setItem('reduced-motion-override', JSON.stringify(value))
    }
  }
}

/**
 * Return type of the useReducedMotion hook
 */
export interface UseReducedMotionReturn {
  /** Whether the user prefers reduced motion (system or manual override) */
  prefersReducedMotion: boolean
  /** The system media query value */
  systemPreference: boolean
  /** The manual override value (null means use system preference) */
  override: boolean | null
  /** Set the manual override (pass null to reset to system preference) */
  setOverride: (value: boolean | null) => void
  /** Toggle the reduced motion preference */
  toggle: () => void
}

/**
 * Hook that reads the prefers-reduced-motion media query AND provides
 * a manual override via global state. Useful for accessibility settings.
 *
 * @returns Object with current preference state and controls
 *
 * @example
 * ```tsx
 * const { prefersReducedMotion, toggle, setOverride } = useReducedMotion()
 *
 * // In animation code:
 * const duration = prefersReducedMotion ? 0 : 0.5
 *
 * // In settings UI:
 * <Switch checked={prefersReducedMotion} onCheckedChange={toggle} />
 * ```
 */
export function useReducedMotion(): UseReducedMotionReturn {
  const [systemPreference, setSystemPreference] = useState(false)

  // Read the global override using useSyncExternalStore
  const override = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setSystemPreference(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setSystemPreference(event.matches)
    }

    mediaQuery.addEventListener('change', handler)

    // Load persisted override from localStorage
    const stored = localStorage.getItem('reduced-motion-override')
    if (stored !== null) {
      try {
        const parsed = JSON.parse(stored)
        if (typeof parsed === 'boolean') {
          setReducedMotionOverride(parsed)
        }
      } catch {
        // Ignore invalid stored values
      }
    }

    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  const prefersReducedMotion = override !== null ? override : systemPreference

  const setOverride = useCallback((value: boolean | null) => {
    setReducedMotionOverride(value)
  }, [])

  const toggle = useCallback(() => {
    const current = override !== null ? override : systemPreference
    setReducedMotionOverride(!current)
  }, [override, systemPreference])

  return {
    prefersReducedMotion,
    systemPreference,
    override,
    setOverride,
    toggle,
  }
}
