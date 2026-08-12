'use client'

import { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { formatCurrency, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
}

const categoryColors: Record<string, string> = {
  oils: 'bg-emerald-500',
  cosmetics: 'bg-pink-500',
  flowers: 'bg-green-500',
  capsules: 'bg-blue-500',
  creams: 'bg-purple-500',
  wellness: 'bg-amber-500',
  accessories: 'bg-slate-500',
}

function getCategoryLabel(value: string): string {
  const cat = PRODUCT_CATEGORIES.find((c) => c.value === value)
  return cat?.label || value
}

function getMarginColor(margin: number): string {
  if (margin >= 40) return 'text-green-400'
  if (margin >= 20) return 'text-yellow-400'
  return 'text-red-400'
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const stripeColor = categoryColors[product.category] || 'bg-gray-500'

  return (
    <div
      onClick={() => onClick?.(product)}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-cbd-green/30 hover:shadow-lg hover:shadow-cbd-green/5',
        !product.isActive && 'opacity-60'
      )}
    >
      {/* Category color stripe */}
      <div className={cn('h-1 w-full', stripeColor)} />

      {/* Image placeholder */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-cbd-green/10 via-transparent to-cbd-green/5 p-4">
        <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border/50">
          <span className="text-3xl opacity-30">
            {product.category === 'oils' && '🫒'}
            {product.category === 'cosmetics' && '✨'}
            {product.category === 'flowers' && '🌿'}
            {product.category === 'capsules' && '💊'}
            {product.category === 'creams' && '🧴'}
            {product.category === 'wellness' && '🍵'}
            {product.category === 'accessories' && '🔧'}
          </span>
        </div>

        {/* Inactive overlay */}
        {!product.isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="rounded-full bg-red-500/80 px-3 py-1 text-xs font-medium text-white">
              Inactivo
            </span>
          </div>
        )}

        {/* Active indicator */}
        {product.isActive && (
          <div className="absolute right-3 top-3">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category badge */}
        <Badge variant="secondary" className="w-fit text-[10px]">
          {getCategoryLabel(product.category)}
        </Badge>

        {/* Name */}
        <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-cbd-green transition-colors">
          {product.name}
        </h3>

        {/* SKU */}
        <p className="text-xs text-muted-foreground">{product.sku}</p>

        {/* Price and margin */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <span className="text-lg font-bold text-foreground">
            {formatCurrency(product.price)}
          </span>
          <span className={cn('text-xs font-medium', getMarginColor(product.margin))}>
            {product.margin.toFixed(1)}% margen
          </span>
        </div>
      </div>
    </div>
  )
}
