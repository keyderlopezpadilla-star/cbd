'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TouchCarouselProps {
  children: React.ReactNode[]
  className?: string
  itemWidth?: number
  gap?: number
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function TouchCarousel({
  children,
  className,
  itemWidth = 300,
  gap = 16,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: TouchCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)
  const controls = useAnimation()

  const totalItems = children.length
  const maxIndex = Math.max(0, totalItems - Math.floor(containerWidth / (itemWidth + gap)))

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, maxIndex))
      setCurrentIndex(clampedIndex)
      controls.start({
        x: -(clampedIndex * (itemWidth + gap)),
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      })
    },
    [maxIndex, itemWidth, gap, controls]
  )

  const goNext = useCallback(() => {
    goTo(currentIndex + 1)
  }, [currentIndex, goTo])

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  // Auto-play
  useEffect(() => {
    if (!autoPlay || totalItems <= 1) return
    const interval = setInterval(() => {
      const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
      goTo(nextIndex)
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, currentIndex, maxIndex, totalItems, goTo])

  // Handle drag end
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = itemWidth / 4
    const velocity = info.velocity.x

    if (info.offset.x < -threshold || velocity < -500) {
      goNext()
    } else if (info.offset.x > threshold || velocity > 500) {
      goPrev()
    } else {
      goTo(currentIndex)
    }
  }

  return (
    <div className={cn('relative w-full', className)}>
      {/* Carousel Container */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x, gap: `${gap}px` }}
          animate={controls}
          drag="x"
          dragConstraints={{
            left: -(totalItems * (itemWidth + gap) - containerWidth),
            right: 0,
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ width: itemWidth }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Arrow Navigation */}
      {showArrows && totalItems > 1 && (
        <>
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full flex items-center justify-center',
              'bg-cbd-dark/80 border border-white/10 backdrop-blur-sm',
              'text-white hover:bg-cbd-dark hover:border-cbd-green/30 transition-colors',
              'disabled:opacity-30 disabled:cursor-not-allowed',
              'hidden sm:flex'
            )}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full flex items-center justify-center',
              'bg-cbd-dark/80 border border-white/10 backdrop-blur-sm',
              'text-white hover:bg-cbd-dark hover:border-cbd-green/30 transition-colors',
              'disabled:opacity-30 disabled:cursor-not-allowed',
              'hidden sm:flex'
            )}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && totalItems > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: Math.min(maxIndex + 1, totalItems) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300 min-w-[8px] min-h-[8px]',
                index === currentIndex
                  ? 'bg-cbd-green w-6'
                  : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
