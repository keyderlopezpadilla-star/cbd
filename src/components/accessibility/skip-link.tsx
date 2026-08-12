'use client'

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Props for the SkipLink component
 */
export interface SkipLinkProps {
  /** Target element ID to skip to (without #) */
  targetId?: string
  /** Link text */
  label?: string
  /** Additional className */
  className?: string
}

/**
 * 'Skip to main content' link that is visually hidden until focused.
 * Provides keyboard users a way to bypass repetitive navigation.
 * Should be placed as the first focusable element in the document.
 *
 * @example
 * ```tsx
 * // In your root layout:
 * <body>
 *   <SkipLink />
 *   <Header />
 *   <main id="main-content">
 *     {children}
 *   </main>
 * </body>
 * ```
 */
export function SkipLink({
  targetId = 'main-content',
  label = 'Skip to main content',
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        // Visually hidden by default
        'fixed left-4 top-4 z-[9999]',
        'transform -translate-y-full opacity-0',
        // Visible when focused
        'focus:translate-y-0 focus:opacity-100',
        // Styling
        'bg-cbd-green text-cbd-black px-4 py-2 rounded-md',
        'font-semibold text-sm',
        'transition-all duration-200',
        'outline-none ring-2 ring-cbd-green ring-offset-2 ring-offset-cbd-black',
        'focus:ring-2',
        className
      )}
    >
      {label}
    </a>
  )
}
