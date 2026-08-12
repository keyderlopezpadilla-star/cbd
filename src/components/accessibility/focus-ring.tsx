'use client'

import React, { type ReactNode, type ElementType } from 'react'
import { cn } from '@/lib/utils'

/**
 * Props for the FocusRing component
 */
export interface FocusRingProps {
  /** Child elements */
  children: ReactNode
  /** Additional className */
  className?: string
  /** HTML element to render */
  as?: ElementType
  /** Focus ring color variant */
  variant?: 'default' | 'primary' | 'destructive' | 'subtle'
  /** Whether to show focus ring only on keyboard focus */
  focusVisible?: boolean
}

/**
 * Focus ring style classes for each variant
 */
const variantStyles = {
  default: 'ring-ring ring-offset-background',
  primary: 'ring-cbd-green ring-offset-cbd-black',
  destructive: 'ring-red-500 ring-offset-background',
  subtle: 'ring-muted-foreground/50 ring-offset-background',
}

/**
 * Component providing consistent focus ring styling via Tailwind classes.
 * Wraps children with accessible focus indicators that meet WCAG 2.2 requirements.
 *
 * @example
 * ```tsx
 * // Wrapping a custom button
 * <FocusRing variant="primary">
 *   <button className="px-4 py-2 bg-cbd-green rounded">
 *     Click me
 *   </button>
 * </FocusRing>
 *
 * // As a div wrapper
 * <FocusRing as="div" variant="default">
 *   <input type="text" className="..." />
 * </FocusRing>
 * ```
 */
export function FocusRing({
  children,
  className,
  as: Component = 'div',
  variant = 'default',
  focusVisible = true,
}: FocusRingProps) {
  const focusClass = focusVisible
    ? 'focus-within:ring-2 focus-within:ring-offset-2'
    : 'focus:ring-2 focus:ring-offset-2'

  return (
    <Component
      className={cn(
        'rounded-sm outline-none',
        focusClass,
        variantStyles[variant],
        'transition-shadow duration-200',
        className
      )}
    >
      {children}
    </Component>
  )
}

/**
 * Utility class string for applying focus ring styles directly.
 * Use this when you cannot wrap with the FocusRing component.
 *
 * @example
 * ```tsx
 * <button className={cn('px-4 py-2', focusRingClasses)}>
 *   Click me
 * </button>
 * ```
 */
export const focusRingClasses =
  'outline-none focus-visible:ring-2 focus-visible:ring-cbd-green focus-visible:ring-offset-2 focus-visible:ring-offset-cbd-black transition-shadow duration-200'
