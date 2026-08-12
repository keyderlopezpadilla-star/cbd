'use client'

import { useRef, useEffect, useCallback, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface PrefetchLinkProps {
  /** URL to navigate to */
  href: string
  /** Link content */
  children: ReactNode
  /** Custom className */
  className?: string
  /** Prefetch strategy: hover (default), viewport, or immediate */
  strategy?: 'hover' | 'viewport' | 'immediate'
  /** Delay before prefetch on hover (ms) */
  hoverDelay?: number
}

/**
 * Link component that prefetches page data on hover or viewport entry.
 * Improves perceived navigation performance.
 */
export function PrefetchLink({
  href,
  children,
  className,
  strategy = 'hover',
  hoverDelay = 100,
}: PrefetchLinkProps) {
  const router = useRouter()
  const linkRef = useRef<HTMLAnchorElement>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefetched = useRef(false)

  const prefetch = useCallback(() => {
    if (!prefetched.current) {
      router.prefetch(href)
      prefetched.current = true
    }
  }, [href, router])

  // Viewport-based prefetching
  useEffect(() => {
    if (strategy !== 'viewport') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          prefetch()
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (linkRef.current) {
      observer.observe(linkRef.current)
    }

    return () => observer.disconnect()
  }, [strategy, prefetch])

  // Immediate prefetching
  useEffect(() => {
    if (strategy === 'immediate') {
      prefetch()
    }
  }, [strategy, prefetch])

  const handleMouseEnter = () => {
    if (strategy !== 'hover') return

    hoverTimeout.current = setTimeout(() => {
      prefetch()
    }, hoverDelay)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
  }

  return (
    <Link
      ref={linkRef}
      href={href}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
    </Link>
  )
}
