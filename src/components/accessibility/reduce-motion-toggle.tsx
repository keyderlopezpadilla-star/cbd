'use client'

import React from 'react'
import * as Switch from '@radix-ui/react-switch'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Props for the ReduceMotionToggle component
 */
export interface ReduceMotionToggleProps {
  /** Additional className for the container */
  className?: string
  /** Label text */
  label?: string
  /** Description text */
  description?: string
  /** Whether to show the label */
  showLabel?: boolean
}

/**
 * UI toggle switch that controls the reduced motion preference.
 * Uses Radix Switch for accessible toggle behavior.
 * Integrates with the useReducedMotion hook's global state.
 *
 * @example
 * ```tsx
 * // In an accessibility settings panel:
 * <ReduceMotionToggle
 *   label="Reduce motion"
 *   description="Minimize animations throughout the interface"
 * />
 *
 * // Compact version without label
 * <ReduceMotionToggle showLabel={false} />
 * ```
 */
export function ReduceMotionToggle({
  className,
  label = 'Reduce motion',
  description = 'Minimize animations and transitions for a calmer experience',
  showLabel = true,
}: ReduceMotionToggleProps) {
  const { prefersReducedMotion, toggle, systemPreference } = useReducedMotion()

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {showLabel && (
        <div className="flex-1 space-y-1">
          <label
            htmlFor="reduce-motion-toggle"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
              {systemPreference && (
                <span className="block mt-1 text-cbd-green">
                  Your system prefers reduced motion
                </span>
              )}
            </p>
          )}
        </div>
      )}
      <Switch.Root
        id="reduce-motion-toggle"
        checked={prefersReducedMotion}
        onCheckedChange={toggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center',
          'rounded-full border-2 border-transparent',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-cbd-green focus-visible:ring-offset-2',
          'focus-visible:ring-offset-cbd-black',
          'disabled:cursor-not-allowed disabled:opacity-50',
          prefersReducedMotion ? 'bg-cbd-green' : 'bg-muted'
        )}
        aria-label={showLabel ? undefined : label}
        aria-describedby={showLabel ? 'reduce-motion-description' : undefined}
      >
        <Switch.Thumb
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full',
            'bg-white shadow-lg ring-0',
            'transition-transform duration-200',
            prefersReducedMotion ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </Switch.Root>
      {showLabel && description && (
        <span id="reduce-motion-description" className="sr-only">
          {description}
        </span>
      )}
    </div>
  )
}
