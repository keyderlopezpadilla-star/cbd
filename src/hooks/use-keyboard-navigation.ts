'use client'

import { useState, useCallback, type KeyboardEvent } from 'react'

/**
 * Navigation orientation for keyboard control
 */
export type NavigationOrientation = 'vertical' | 'horizontal' | 'grid'

/**
 * Options for keyboard navigation
 */
export interface UseKeyboardNavigationOptions {
  /** Total number of items */
  itemCount: number
  /** Orientation of the list/grid */
  orientation?: NavigationOrientation
  /** Number of columns (for grid orientation) */
  columns?: number
  /** Whether navigation wraps around at boundaries */
  loop?: boolean
  /** Callback when an item is selected (Enter/Space) */
  onSelect?: (index: number) => void
  /** Initial active index */
  initialIndex?: number
}

/**
 * Return value of the useKeyboardNavigation hook
 */
export interface UseKeyboardNavigationReturn {
  /** Currently active (focused) index */
  activeIndex: number
  /** Key down handler to attach to the container */
  handleKeyDown: (event: KeyboardEvent) => void
  /** Manually set the active index */
  setActiveIndex: (index: number) => void
  /** Reset active index to initial value */
  reset: () => void
}

/**
 * Hook for arrow-key navigation within lists and grids.
 * Supports vertical, horizontal, and grid navigation patterns.
 *
 * @param options - Navigation configuration
 * @returns Object with activeIndex, handleKeyDown, and setActiveIndex
 *
 * @example
 * ```tsx
 * const { activeIndex, handleKeyDown } = useKeyboardNavigation({
 *   itemCount: items.length,
 *   orientation: 'vertical',
 *   loop: true,
 *   onSelect: (index) => handleItemSelect(items[index]),
 * })
 *
 * return (
 *   <ul role="listbox" onKeyDown={handleKeyDown}>
 *     {items.map((item, index) => (
 *       <li
 *         key={item.id}
 *         role="option"
 *         aria-selected={index === activeIndex}
 *         tabIndex={index === activeIndex ? 0 : -1}
 *       >
 *         {item.label}
 *       </li>
 *     ))}
 *   </ul>
 * )
 * ```
 */
export function useKeyboardNavigation(
  options: UseKeyboardNavigationOptions
): UseKeyboardNavigationReturn {
  const {
    itemCount,
    orientation = 'vertical',
    columns = 1,
    loop = true,
    onSelect,
    initialIndex = 0,
  } = options

  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const moveUp = useCallback(() => {
    setActiveIndex((current) => {
      if (orientation === 'grid') {
        const newIndex = current - columns
        if (newIndex >= 0) return newIndex
        return loop ? current + Math.floor((itemCount - 1) / columns) * columns : current
      }
      if (current > 0) return current - 1
      return loop ? itemCount - 1 : current
    })
  }, [orientation, columns, itemCount, loop])

  const moveDown = useCallback(() => {
    setActiveIndex((current) => {
      if (orientation === 'grid') {
        const newIndex = current + columns
        if (newIndex < itemCount) return newIndex
        return loop ? current % columns : current
      }
      if (current < itemCount - 1) return current + 1
      return loop ? 0 : current
    })
  }, [orientation, columns, itemCount, loop])

  const moveLeft = useCallback(() => {
    setActiveIndex((current) => {
      if (current > 0) return current - 1
      return loop ? itemCount - 1 : current
    })
  }, [itemCount, loop])

  const moveRight = useCallback(() => {
    setActiveIndex((current) => {
      if (current < itemCount - 1) return current + 1
      return loop ? 0 : current
    })
  }, [itemCount, loop])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let handled = true

      switch (event.key) {
        case 'ArrowUp':
          if (orientation === 'vertical' || orientation === 'grid') {
            moveUp()
          }
          break
        case 'ArrowDown':
          if (orientation === 'vertical' || orientation === 'grid') {
            moveDown()
          }
          break
        case 'ArrowLeft':
          if (orientation === 'horizontal' || orientation === 'grid') {
            moveLeft()
          }
          break
        case 'ArrowRight':
          if (orientation === 'horizontal' || orientation === 'grid') {
            moveRight()
          }
          break
        case 'Home':
          setActiveIndex(0)
          break
        case 'End':
          setActiveIndex(itemCount - 1)
          break
        case 'Enter':
        case ' ':
          if (onSelect) {
            onSelect(activeIndex)
          }
          break
        default:
          handled = false
          break
      }

      if (handled) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    [orientation, activeIndex, itemCount, onSelect, moveUp, moveDown, moveLeft, moveRight]
  )

  const reset = useCallback(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  return {
    activeIndex,
    handleKeyDown,
    setActiveIndex,
    reset,
  }
}
