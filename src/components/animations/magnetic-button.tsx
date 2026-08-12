'use client'

import React, { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Props for the MagneticButton component
 */
export interface MagneticButtonProps {
  /** Child elements (button content) */
  children: ReactNode
  /** Strength of the magnetic pull (0-1) */
  strength?: number
  /** Radius of the magnetic field (in pixels) */
  radius?: number
  /** Additional className */
  className?: string
  /** Whether the button is disabled */
  disabled?: boolean
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
  /** ARIA label */
  'aria-label'?: string
}

/**
 * Button component with magnetic cursor-follow effect.
 * The button subtly moves toward the cursor when hovering nearby,
 * creating an engaging microinteraction.
 *
 * @example
 * ```tsx
 * <MagneticButton strength={0.4} radius={150}>
 *   <span>Hover me</span>
 * </MagneticButton>
 *
 * <MagneticButton
 *   className="bg-cbd-green px-6 py-3 rounded-lg"
 *   onClick={() => handleAction()}
 * >
 *   Get Started
 * </MagneticButton>
 * ```
 */
export function MagneticButton({
  children,
  strength = 0.3,
  radius = 100,
  className,
  disabled = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { prefersReducedMotion } = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion || disabled) return

      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = event.clientX - centerX
      const deltaY = event.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength
        x.set(deltaX * pull)
        y.set(deltaY * pull)
      }
    },
    [prefersReducedMotion, disabled, radius, strength, x, y]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  if (prefersReducedMotion) {
    return (
      <button
        ref={buttonRef}
        type={type}
        className={className}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={cn('relative inline-flex items-center justify-center', className)}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
      data-hovered={isHovered}
    >
      {children}
    </motion.button>
  )
}
