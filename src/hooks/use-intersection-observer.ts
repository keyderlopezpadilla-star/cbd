'use client'

import { useEffect, useRef, useState, useCallback, type RefObject } from 'react'

/**
 * Options for the IntersectionObserver
 */
export interface UseIntersectionObserverOptions {
  /** Element that is used as the viewport for checking visibility */
  root?: Element | null
  /** Margin around the root element */
  rootMargin?: string
  /** Percentage of the target's visibility the observer's callback should execute */
  threshold?: number | number[]
  /** Whether to disconnect observer after first intersection */
  triggerOnce?: boolean
  /** Whether the observer is enabled */
  enabled?: boolean
}

/**
 * Return value of the useIntersectionObserver hook
 */
export type UseIntersectionObserverReturn<T extends HTMLElement> = [
  /** Ref to attach to the target element */
  RefObject<T | null>,
  /** Whether the element is currently intersecting */
  boolean,
  /** The IntersectionObserverEntry or undefined if not yet observed */
  IntersectionObserverEntry | undefined,
]

/**
 * Lightweight IntersectionObserver hook for triggering animations
 * or lazy-loading when elements enter the viewport.
 *
 * @param options - IntersectionObserver configuration
 * @returns Tuple of [ref, isIntersecting, entry]
 *
 * @example
 * ```tsx
 * const [ref, isIntersecting] = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true,
 * })
 *
 * return (
 *   <div ref={ref} className={isIntersecting ? 'visible' : 'hidden'}>
 *     Content that animates on scroll
 *   </div>
 * )
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false,
    enabled = true,
  } = options

  const elementRef = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(undefined)
  const hasTriggered = useRef(false)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [observerEntry] = entries

      if (!observerEntry) return

      setEntry(observerEntry)
      setIsIntersecting(observerEntry.isIntersecting)

      if (triggerOnce && observerEntry.isIntersecting) {
        hasTriggered.current = true
      }
    },
    [triggerOnce]
  )

  useEffect(() => {
    const element = elementRef.current

    if (!element || !enabled) return
    if (triggerOnce && hasTriggered.current) return

    // Check for browser support
    if (typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true)
      return
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [root, rootMargin, threshold, triggerOnce, enabled, handleIntersect])

  return [elementRef, isIntersecting, entry]
}
