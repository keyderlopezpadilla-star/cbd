'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Politeness level for the aria-live region
 */
export type AriaLivePoliteness = 'polite' | 'assertive' | 'off'

/**
 * Props for the AriaLiveRegion component
 */
export interface AriaLiveRegionProps {
  /** Politeness level: 'polite' waits for user idle, 'assertive' interrupts */
  politeness?: AriaLivePoliteness
  /** Message to announce */
  message: string
  /** Additional className (region is visually hidden by default) */
  className?: string
  /** Whether to make the region visible */
  visible?: boolean
  /** Role attribute for the region */
  role?: 'status' | 'alert' | 'log'
  /** Whether the entire region content is relevant on updates */
  atomic?: boolean
  /** Clear message after a delay (in ms, 0 to disable) */
  clearAfter?: number
}

/**
 * Component rendering an aria-live region for dynamic announcements.
 * Screen readers will announce changes to this region based on the politeness level.
 *
 * @example
 * ```tsx
 * // Status message (polite)
 * <AriaLiveRegion
 *   politeness="polite"
 *   message={`${items.length} results found`}
 * />
 *
 * // Error message (assertive)
 * <AriaLiveRegion
 *   politeness="assertive"
 *   message={errorMessage}
 *   role="alert"
 * />
 *
 * // Visible status
 * <AriaLiveRegion
 *   visible
 *   politeness="polite"
 *   message="Saving..."
 *   className="text-sm text-muted-foreground"
 * />
 * ```
 */
export function AriaLiveRegion({
  politeness = 'polite',
  message,
  className,
  visible = false,
  role = 'status',
  atomic = true,
  clearAfter = 0,
}: AriaLiveRegionProps) {
  const [currentMessage, setCurrentMessage] = useState(message)

  useEffect(() => {
    setCurrentMessage(message)

    if (clearAfter > 0 && message) {
      const timer = setTimeout(() => {
        setCurrentMessage('')
      }, clearAfter)
      return () => clearTimeout(timer)
    }
  }, [message, clearAfter])

  const hiddenStyles = !visible
    ? {
        position: 'absolute' as const,
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden' as const,
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap' as const,
        borderWidth: 0,
      }
    : undefined

  return (
    <div
      role={role}
      aria-live={politeness}
      aria-atomic={atomic}
      className={cn(visible && className)}
      style={hiddenStyles}
    >
      {currentMessage}
    </div>
  )
}
