'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './use-reduced-motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Configuration for scroll trigger behavior
 */
export interface ScrollTriggerConfig {
  /** Element or selector that triggers the animation */
  trigger?: string | Element
  /** Start position (e.g., 'top bottom', 'top 80%') */
  start?: string
  /** End position (e.g., 'bottom top') */
  end?: string
  /** Scrub the animation to scroll position */
  scrub?: boolean | number
  /** Pin the element during the animation */
  pin?: boolean
  /** Show markers for debugging */
  markers?: boolean
  /** Toggle actions: onEnter onLeave onEnterBack onLeaveBack */
  toggleActions?: string
}

/**
 * Configuration for scroll-based GSAP animation
 */
export interface ScrollAnimationConfig {
  /** GSAP 'from' properties (initial state) */
  from?: gsap.TweenVars
  /** GSAP 'to' properties (target state) */
  to?: gsap.TweenVars
  /** ScrollTrigger configuration */
  trigger?: ScrollTriggerConfig
  /** Animation duration in seconds */
  duration?: number
  /** Easing function */
  ease?: string
  /** Delay before animation starts */
  delay?: number
}

/**
 * Custom hook that applies GSAP ScrollTrigger animations to a referenced element.
 *
 * @param config - Animation configuration including from/to states and scroll trigger options
 * @returns A ref to attach to the target element
 *
 * @example
 * ```tsx
 * const ref = useScrollAnimation({
 *   from: { opacity: 0, y: 50 },
 *   to: { opacity: 1, y: 0 },
 *   trigger: { start: 'top 80%', end: 'bottom 20%' },
 *   duration: 0.8,
 *   ease: 'power2.out',
 * })
 *
 * return <div ref={ref}>Animated content</div>
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  config: ScrollAnimationConfig
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      if (config.to) {
        gsap.set(element, config.to)
      }
      return
    }

    const triggerConfig: ScrollTrigger.Vars = {
      trigger: config.trigger?.trigger || element,
      start: config.trigger?.start || 'top 80%',
      end: config.trigger?.end || 'bottom 20%',
      scrub: config.trigger?.scrub || false,
      pin: config.trigger?.pin || false,
      markers: config.trigger?.markers || false,
      toggleActions: config.trigger?.toggleActions || 'play none none reverse',
    }

    let animation: gsap.core.Tween

    if (config.from && config.to) {
      animation = gsap.fromTo(element, config.from, {
        ...config.to,
        duration: config.duration || 1,
        ease: config.ease || 'power2.out',
        delay: config.delay || 0,
        scrollTrigger: triggerConfig,
      })
    } else if (config.from) {
      animation = gsap.from(element, {
        ...config.from,
        duration: config.duration || 1,
        ease: config.ease || 'power2.out',
        delay: config.delay || 0,
        scrollTrigger: triggerConfig,
      })
    } else if (config.to) {
      animation = gsap.to(element, {
        ...config.to,
        duration: config.duration || 1,
        ease: config.ease || 'power2.out',
        delay: config.delay || 0,
        scrollTrigger: triggerConfig,
      })
    }

    return () => {
      animation?.scrollTrigger?.kill()
      animation?.kill()
    }
  }, [config, prefersReducedMotion])

  return elementRef
}
