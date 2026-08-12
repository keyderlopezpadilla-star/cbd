'use client'

import React, { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Animation type for staggered children
 */
export type StaggerAnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'fade'

/**
 * Props for the StaggerChildren component
 */
export interface StaggerChildrenProps {
  /** Child elements to stagger animate */
  children: ReactNode
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number
  /** Type of animation to apply */
  animationType?: StaggerAnimationType
  /** Duration of each child animation (in seconds) */
  duration?: number
  /** Additional className for the container */
  className?: string
  /** Initial delay before the stagger starts */
  delay?: number
  /** HTML element to render as the container */
  as?: 'div' | 'ul' | 'ol' | 'section' | 'nav'
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delay,
    },
  }),
}

function getChildVariants(
  animationType: StaggerAnimationType,
  duration: number
): Variants {
  const base = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  }

  switch (animationType) {
    case 'fadeUp':
      return { hidden: { opacity: 0, y: 20 }, ...base }
    case 'fadeDown':
      return { hidden: { opacity: 0, y: -20 }, ...base }
    case 'fadeLeft':
      return { hidden: { opacity: 0, x: 20 }, ...base }
    case 'fadeRight':
      return { hidden: { opacity: 0, x: -20 }, ...base }
    case 'scale':
      return { hidden: { opacity: 0, scale: 0.8 }, ...base }
    case 'fade':
    default:
      return { hidden: { opacity: 0 }, ...base }
  }
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

/**
 * Container component that staggers child entrance animations.
 * Each direct child is wrapped in a motion.div with configurable animation.
 *
 * @example
 * ```tsx
 * <StaggerChildren staggerDelay={0.1} animationType="fadeUp">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </StaggerChildren>
 * ```
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  animationType = 'fadeUp',
  duration = 0.5,
  className,
  delay = 0,
  as: Component = 'div',
}: StaggerChildrenProps) {
  const { prefersReducedMotion } = useReducedMotion()

  const MotionComponent = motion[Component]
  const childVariants = prefersReducedMotion
    ? reducedMotionVariants
    : getChildVariants(animationType, duration)

  return (
    <MotionComponent
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={{ staggerDelay: prefersReducedMotion ? 0 : staggerDelay, delay }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </MotionComponent>
  )
}
