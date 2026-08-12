'use client'

import React, { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePageTransition, type TransitionPreset } from '@/hooks/use-page-transition'
import { cn } from '@/lib/utils'

/**
 * Props for the PageTransition component
 */
export interface PageTransitionProps {
  /** Child elements to animate */
  children: ReactNode
  /** Unique key for the current route/page (triggers animation on change) */
  pageKey: string
  /** Transition preset to use */
  preset?: TransitionPreset
  /** Duration of the transition (in seconds) */
  duration?: number
  /** Additional className for the wrapper */
  className?: string
  /** Whether to wait for exit animation before entering */
  mode?: 'wait' | 'sync' | 'popLayout'
}

/**
 * Layout-level page transition component using Framer Motion AnimatePresence.
 * Wraps children with a motion.div that animates on route changes.
 *
 * @example
 * ```tsx
 * // In a layout component:
 * export default function Layout({ children }) {
 *   const pathname = usePathname()
 *
 *   return (
 *     <PageTransition pageKey={pathname} preset="fade">
 *       {children}
 *     </PageTransition>
 *   )
 * }
 * ```
 */
export function PageTransition({
  children,
  pageKey,
  preset = 'fade',
  duration = 0.4,
  className,
  mode = 'wait',
}: PageTransitionProps) {
  const { variants, initial, animate, exit } = usePageTransition({
    preset,
    duration,
  })

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={pageKey}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}
        className={cn('w-full', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
