'use client'

import { type Variants } from 'framer-motion'
import { useReducedMotion } from './use-reduced-motion'

/**
 * Available page transition preset types
 */
export type TransitionPreset = 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown'

/**
 * Configuration for page transitions
 */
export interface PageTransitionConfig {
  /** Transition preset to use */
  preset?: TransitionPreset
  /** Duration in seconds */
  duration?: number
  /** Delay before animation starts */
  delay?: number
  /** Easing function */
  ease?: number[]
}

/**
 * Return value of the usePageTransition hook
 */
export interface PageTransitionReturn {
  /** Framer Motion variants for the transition */
  variants: Variants
  /** Initial animation state key */
  initial: string
  /** Animate state key */
  animate: string
  /** Exit animation state key */
  exit: string
  /** Transition configuration */
  transition: {
    duration: number
    ease: number[]
    delay: number
  }
}

const defaultEase = [0.25, 0.1, 0.25, 1.0]

/**
 * Creates Framer Motion variants for page transitions.
 */
function createFadeVariants(duration: number, delay: number, ease: number[]): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration, ease, delay },
    },
    exit: {
      opacity: 0,
      transition: { duration: duration * 0.8, ease },
    },
  }
}

function createSlideVariants(duration: number, delay: number, ease: number[]): Variants {
  return {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration, ease, delay },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: duration * 0.8, ease },
    },
  }
}

function createSlideUpVariants(duration: number, delay: number, ease: number[]): Variants {
  return {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration, ease, delay },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: duration * 0.8, ease },
    },
  }
}

function createSlideDownVariants(duration: number, delay: number, ease: number[]): Variants {
  return {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration, ease, delay },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: duration * 0.8, ease },
    },
  }
}

function createScaleVariants(duration: number, delay: number, ease: number[]): Variants {
  return {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration, ease, delay },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: duration * 0.8, ease },
    },
  }
}

/** Reduced motion variants with instant transitions */
function createReducedMotionVariants(): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0 },
    },
  }
}

/**
 * Hook providing Framer Motion variants for page enter/exit transitions.
 *
 * @param config - Transition configuration (preset, duration, delay, ease)
 * @returns Object with variants, initial, animate, exit keys for AnimatePresence
 *
 * @example
 * ```tsx
 * const { variants, initial, animate, exit } = usePageTransition({ preset: 'fade' })
 *
 * return (
 *   <motion.div
 *     variants={variants}
 *     initial={initial}
 *     animate={animate}
 *     exit={exit}
 *   >
 *     {children}
 *   </motion.div>
 * )
 * ```
 */
export function usePageTransition(config: PageTransitionConfig = {}): PageTransitionReturn {
  const { prefersReducedMotion } = useReducedMotion()
  const {
    preset = 'fade',
    duration = 0.4,
    delay = 0,
    ease = defaultEase,
  } = config

  if (prefersReducedMotion) {
    return {
      variants: createReducedMotionVariants(),
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      transition: { duration: 0, ease, delay: 0 },
    }
  }

  const variantMap: Record<TransitionPreset, () => Variants> = {
    fade: () => createFadeVariants(duration, delay, ease),
    slide: () => createSlideVariants(duration, delay, ease),
    slideUp: () => createSlideUpVariants(duration, delay, ease),
    slideDown: () => createSlideDownVariants(duration, delay, ease),
    scale: () => createScaleVariants(duration, delay, ease),
  }

  const variants = variantMap[preset]()

  return {
    variants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    transition: { duration, ease, delay },
  }
}
