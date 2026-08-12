import React, { type ReactNode } from 'react'

/**
 * Props for the VisuallyHidden component
 */
export interface VisuallyHiddenProps {
  /** Content to be hidden visually but accessible to screen readers */
  children: ReactNode
  /** HTML element to render */
  as?: 'span' | 'div' | 'label' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Additional props to pass to the rendered element */
  id?: string
}

/**
 * Renders children in a span that is visually hidden but accessible to screen readers.
 * Uses the clip-rect technique for reliable cross-browser hiding.
 *
 * @example
 * ```tsx
 * // Labeling an icon button
 * <button>
 *   <IconSearch />
 *   <VisuallyHidden>Search products</VisuallyHidden>
 * </button>
 *
 * // Adding context for screen readers
 * <VisuallyHidden as="p">
 *   There are 5 items in your cart
 * </VisuallyHidden>
 * ```
 */
export function VisuallyHidden({
  children,
  as: Component = 'span',
  id,
}: VisuallyHiddenProps) {
  return (
    <Component
      id={id}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    >
      {children}
    </Component>
  )
}
