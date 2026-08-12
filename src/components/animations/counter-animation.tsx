'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'

/**
 * Props for the CounterAnimation component
 */
export interface CounterAnimationProps {
  /** Starting value */
  from?: number
  /** Target value */
  to: number
  /** Duration of the animation (in milliseconds) */
  duration?: number
  /** Format function for displaying the number */
  format?: (value: number) => string
  /** Additional className for the wrapper */
  className?: string
  /** Whether to start animation when element enters viewport */
  animateOnView?: boolean
  /** Easing function: 'linear' | 'easeOut' | 'easeInOut' */
  easing?: 'linear' | 'easeOut' | 'easeInOut'
  /** Decimal places to show during animation */
  decimals?: number
}

/**
 * Easing functions for the counter animation
 */
function getEasingFunction(easing: string): (t: number) => number {
  switch (easing) {
    case 'easeOut':
      return (t: number) => 1 - Math.pow(1 - t, 3)
    case 'easeInOut':
      return (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    case 'linear':
    default:
      return (t: number) => t
  }
}

/**
 * Animated number counter component using requestAnimationFrame.
 * Counts up (or down) from one number to another with smooth animation.
 *
 * @example
 * ```tsx
 * // Basic counter
 * <CounterAnimation to={1500} duration={2000} />
 *
 * // With format function for currency
 * <CounterAnimation
 *   from={0}
 *   to={45000}
 *   duration={2500}
 *   format={(value) => `$${value.toLocaleString()}`}
 * />
 *
 * // Percentage counter
 * <CounterAnimation
 *   to={98.5}
 *   decimals={1}
 *   format={(value) => `${value}%`}
 * />
 * ```
 */
export function CounterAnimation({
  from = 0,
  to,
  duration = 2000,
  format,
  className,
  animateOnView = true,
  easing = 'easeOut',
  decimals = 0,
}: CounterAnimationProps) {
  const [displayValue, setDisplayValue] = useState(from)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasAnimated = useRef(false)
  const { prefersReducedMotion } = useReducedMotion()

  const [observerRef, isIntersecting] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.1,
    triggerOnce: true,
  })

  const shouldAnimate = animateOnView ? isIntersecting : true

  useEffect(() => {
    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setDisplayValue(to)
      return
    }

    if (!shouldAnimate || hasAnimated.current) return

    hasAnimated.current = true
    const easingFn = getEasingFunction(easing)
    const range = to - from

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easingFn(progress)
      const currentValue = from + range * easedProgress

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(to)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [from, to, duration, easing, shouldAnimate, prefersReducedMotion])

  const formattedValue = format
    ? format(Number(displayValue.toFixed(decimals)))
    : Number(displayValue.toFixed(decimals)).toLocaleString()

  return (
    <span ref={observerRef} className={cn('tabular-nums', className)} aria-live="polite">
      {formattedValue}
    </span>
  )
}
