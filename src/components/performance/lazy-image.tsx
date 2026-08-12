'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  priority?: boolean
  sizes?: string
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

/**
 * Optimized image component with blur placeholder, lazy loading, and srcset.
 * Uses IntersectionObserver for viewport-based loading.
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder,
  priority = false,
  sizes = '100vw',
  quality = 80,
  onLoad,
  onError,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [inView, setInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    onError?.()
  }

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string): string => {
    const widths = [320, 640, 768, 1024, 1280, 1536]
    return widths
      .map((w) => `${baseSrc}?w=${w}&q=${quality} ${w}w`)
      .join(', ')
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-gray-800/50',
        className
      )}
      style={{ width: width || '100%', height: height || 'auto' }}
    >
      {/* Blur placeholder */}
      {!loaded && !error && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
          style={{
            backgroundImage: placeholder ? `url(${placeholder})` : undefined,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Actual image */}
      {inView && !error && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          srcSet={generateSrcSet(src)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <span className="text-sm">Image not available</span>
        </div>
      )}
    </div>
  )
}
