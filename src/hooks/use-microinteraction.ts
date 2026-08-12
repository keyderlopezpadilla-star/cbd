'use client'

import { type Transition, type TargetAndTransition } from 'framer-motion'
import { useReducedMotion } from './use-reduced-motion'

/**
 * Spring animation preset configuration
 */
export interface SpringPreset {
  type: 'spring'
  stiffness: number
  damping: number
  mass: number
}

/**
 * Microinteraction animation preset with hover, tap, and focus states
 */
export interface MicrointeractionPreset {
  /** Animation applied on hover */
  whileHover: TargetAndTransition
  /** Animation applied on tap/press */
  whileTap: TargetAndTransition
  /** Animation applied on focus */
  whileFocus?: TargetAndTransition
  /** Transition configuration */
  transition: Transition
}

/**
 * All available microinteraction presets
 */
export interface MicrointeractionPresets {
  /** Gentle spring animation for buttons and cards */
  spring: MicrointeractionPreset
  /** Bouncy animation for playful interactions */
  bounce: MicrointeractionPreset
  /** Pulsing animation for attention-grabbing elements */
  pulse: MicrointeractionPreset
  /** Subtle scale animation for list items */
  lift: MicrointeractionPreset
  /** Quick snap animation for toggles and switches */
  snap: MicrointeractionPreset
  /** Elastic wobble for error states or fun interactions */
  wobble: MicrointeractionPreset
}

/** No-animation presets for reduced motion */
function createReducedPresets(): MicrointeractionPresets {
  const noMotion: MicrointeractionPreset = {
    whileHover: {},
    whileTap: {},
    whileFocus: {},
    transition: { duration: 0 },
  }
  return {
    spring: noMotion,
    bounce: noMotion,
    pulse: noMotion,
    lift: noMotion,
    snap: noMotion,
    wobble: noMotion,
  }
}

/**
 * Hook providing spring/bounce/pulse animation preset objects for Framer Motion.
 *
 * @returns Object containing named microinteraction presets
 *
 * @example
 * ```tsx
 * const { spring, bounce, pulse } = useMicrointeraction()
 *
 * return (
 *   <motion.button
 *     whileHover={spring.whileHover}
 *     whileTap={spring.whileTap}
 *     transition={spring.transition}
 *   >
 *     Click me
 *   </motion.button>
 * )
 * ```
 */
export function useMicrointeraction(): MicrointeractionPresets {
  const { prefersReducedMotion } = useReducedMotion()

  if (prefersReducedMotion) {
    return createReducedPresets()
  }

  return {
    spring: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      whileFocus: { scale: 1.02 },
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
        mass: 1,
      },
    },
    bounce: {
      whileHover: { scale: 1.1, y: -2 },
      whileTap: { scale: 0.9 },
      whileFocus: { scale: 1.05 },
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 10,
        mass: 0.8,
      },
    },
    pulse: {
      whileHover: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
      whileTap: { scale: 0.95 },
      whileFocus: { scale: 1.02 },
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    lift: {
      whileHover: { y: -4, scale: 1.02 },
      whileTap: { y: 0, scale: 0.98 },
      whileFocus: { y: -2 },
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
        mass: 0.8,
      },
    },
    snap: {
      whileHover: { scale: 1.03 },
      whileTap: { scale: 0.97 },
      whileFocus: { scale: 1.01 },
      transition: {
        type: 'spring',
        stiffness: 800,
        damping: 30,
        mass: 0.5,
      },
    },
    wobble: {
      whileHover: { rotate: [-1, 1, -1, 0] },
      whileTap: { scale: 0.9, rotate: 0 },
      whileFocus: { scale: 1.02 },
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 8,
        mass: 0.6,
      },
    },
  }
}
