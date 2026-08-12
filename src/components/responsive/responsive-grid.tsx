'use client'

import { cn } from '@/lib/utils'

type GridVariant = 'cards' | 'products' | 'stats' | 'gallery' | 'auto'

interface ResponsiveGridProps {
  children: React.ReactNode
  variant?: GridVariant
  className?: string
  gap?: 'sm' | 'md' | 'lg'
  minChildWidth?: string
}

const VARIANT_CLASSES: Record<GridVariant, string> = {
  cards: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  products: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  stats: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  gallery: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}

const GAP_CLASSES: Record<string, string> = {
  sm: 'gap-2 sm:gap-3',
  md: 'gap-3 sm:gap-4 lg:gap-6',
  lg: 'gap-4 sm:gap-6 lg:gap-8',
}

export function ResponsiveGrid({
  children,
  variant = 'auto',
  className,
  gap = 'md',
  minChildWidth,
}: ResponsiveGridProps) {
  const gridStyle = minChildWidth
    ? { gridTemplateColumns: `repeat(auto-fill, minmax(${minChildWidth}, 1fr))` }
    : undefined

  return (
    <div
      className={cn(
        'grid w-full',
        !minChildWidth && VARIANT_CLASSES[variant],
        GAP_CLASSES[gap],
        className
      )}
      style={gridStyle}
    >
      {children}
    </div>
  )
}
