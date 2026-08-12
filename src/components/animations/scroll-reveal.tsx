'use client'

import React, { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Direction for the scroll reveal animation
 */
export type RevealDirection = 'up' | 'down' | 'left' | 'right'

/**
 * Props for the ScrollReveal component
 */
export interface ScrollRevealProps {
  /** Child elements to animate */
  children: ReactNode
  /** Direction from which the element enters */
  direction?: RevealDirection
  /** Delay before animation starts (in seconds) */
  delay?: number
  /** Duration of the animation (in seconds) */
  duration?: number
  /** Distance of the animation movement (in pixels) */
  distance?: number
  /** Additional className for the wrapper */
  className?: string
  /** Whether to only animate once */
  once?: boolean
  /** Custom start trigger position */
  start?: string
}

/**
 * Wrapper component that animates children on scroll using GSAP ScrollTrigger.
 * Supports directional reveals with configurable distance, delay, and duration.
 *
 * @example
 * ```tsx
 * <ScrollReveal direction="up" delay={0.2} duration={0.8}>
 *   <h2>This heading reveals from below</h2>
 * </ScrollReveal>
 *
 * <ScrollReveal direction="left" distance={100}>
 *   <Card>Slides in from the left</Card>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  className,
  once = true,
  start = 'top 85%',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, x: 0, y: 0 })
      return
    }

    // Calculate initial position based on direction
    const fromVars: gsap.TweenVars = { opacity: 0 }

    switch (direction) {
      case 'up':
        fromVars.y = distance
        break
      case 'down':
        fromVars.y = -distance
        break
      case 'left':
        fromVars.x = distance
        break
      case 'right':
        fromVars.x = -distance
        break
    }

    const animation = gsap.fromTo(
      element,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: once
            ? 'play none none none'
            : 'play reverse play reverse',
        },
      }
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [direction, delay, duration, distance, once, start, prefersReducedMotion])

  return (
    <div
      ref={elementRef}
      className={cn('will-change-transform', className)}
      style={{ opacity: prefersReducedMotion ? 1 : 0 }}
    >
      {children}
    </div>
  )
}
