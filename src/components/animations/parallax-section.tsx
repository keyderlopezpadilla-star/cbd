'use client'

import React, { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Props for the ParallaxSection component
 */
export interface ParallaxSectionProps {
  /** Child elements */
  children: ReactNode
  /** Parallax speed multiplier (negative for reverse direction) */
  speed?: number
  /** Direction of parallax movement */
  direction?: 'vertical' | 'horizontal'
  /** Additional className for the wrapper */
  className?: string
  /** Additional className for the inner content */
  innerClassName?: string
  /** Whether to clip overflow */
  overflow?: 'hidden' | 'visible'
  /** Custom start position for ScrollTrigger */
  start?: string
  /** Custom end position for ScrollTrigger */
  end?: string
}

/**
 * Parallax scrolling effect wrapper using GSAP ScrollTrigger.
 * Creates a depth effect by moving children at a different rate than scroll.
 *
 * @example
 * ```tsx
 * <ParallaxSection speed={0.5}>
 *   <img src="/hero-bg.jpg" alt="Background" />
 * </ParallaxSection>
 *
 * <ParallaxSection speed={-0.3} direction="horizontal">
 *   <div className="flex gap-4">
 *     {items.map(item => <Card key={item.id} {...item} />)}
 *   </div>
 * </ParallaxSection>
 * ```
 */
export function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'vertical',
  className,
  innerClassName,
  overflow = 'hidden',
  start = 'top bottom',
  end = 'bottom top',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const inner = innerRef.current
    if (!section || !inner) return

    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion) {
      gsap.set(inner, { x: 0, y: 0 })
      return
    }

    // Calculate the parallax distance based on speed
    const distance = 100 * speed

    const toVars: gsap.TweenVars =
      direction === 'vertical'
        ? { y: -distance, ease: 'none' }
        : { x: -distance, ease: 'none' }

    const fromVars: gsap.TweenVars =
      direction === 'vertical'
        ? { y: distance }
        : { x: distance }

    const animation = gsap.fromTo(inner, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: section,
        start,
        end,
        scrub: true,
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [speed, direction, start, end, prefersReducedMotion])

  return (
    <div
      ref={sectionRef}
      className={cn(
        'relative',
        overflow === 'hidden' && 'overflow-hidden',
        className
      )}
    >
      <div ref={innerRef} className={cn('will-change-transform', innerClassName)}>
        {children}
      </div>
    </div>
  )
}
