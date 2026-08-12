'use client'

import { useState } from 'react'
import { Tag, Package, Truck, Sparkles, Coins } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LoyaltyTier } from '@/lib/constants'
import {
  MOCK_REDEMPTION_CATALOG,
  RedemptionCategory,
  RedemptionItem,
} from '@/lib/mock-data/loyalty'

const categoryConfig: Record<
  RedemptionCategory,
  { label: string; icon: typeof Tag; color: string }
> = {
  discount: { label: 'Descuentos', icon: Tag, color: 'text-cbd-green' },
  product: { label: 'Productos', icon: Package, color: 'text-blue-400' },
  shipping: { label: 'Envio', icon: Truck, color: 'text-purple-400' },
  experience: { label: 'Experiencias', icon: Sparkles, color: 'text-amber-400' },
}

const tierLabels: Record<LoyaltyTier, string> = {
  [LoyaltyTier.STARTER]: 'Starter+',
  [LoyaltyTier.PREMIUM]: 'Premium+',
  [LoyaltyTier.VIP]: 'VIP+',
  [LoyaltyTier.BLACK]: 'Black',
}

const availabilityConfig: Record<string, { label: string; color: string }> = {
  available: { label: 'Disponible', color: 'text-cbd-green bg-cbd-green/10 border-cbd-green/30' },
  limited: { label: 'Limitado', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  out_of_stock: { label: 'Agotado', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
}

export function RedemptionCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<RedemptionCategory | 'all'>('all')

  const filteredItems = MOCK_REDEMPTION_CATALOG.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Catalogo de Recompensas
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Coins className="h-4 w-4 text-cbd-green" />
              <span>{MOCK_REDEMPTION_CATALOG.length} recompensas disponibles</span>
            </div>
          </div>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'text-xs',
                selectedCategory === 'all'
                  ? 'bg-cbd-green text-black hover:bg-cbd-green-light'
                  : 'border-border/50'
              )}
            >
              Todos
            </Button>
            {(Object.entries(categoryConfig) as [RedemptionCategory, typeof categoryConfig.discount][]).map(
              ([category, config]) => {
                const Icon = config.icon
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'text-xs',
                      selectedCategory === category
                        ? 'bg-foreground/10 border-transparent'
                        : 'border-border/50'
                    )}
                  >
                    <Icon className={cn('h-3 w-3 mr-1', config.color)} />
                    {config.label}
                  </Button>
                )
              }
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <RedemptionCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function RedemptionCard({ item, index }: { item: RedemptionItem; index: number }) {
  const category = categoryConfig[item.category]
  const availability = availabilityConfig[item.availability]
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div
        className={cn(
          'p-4 rounded-lg border bg-background/30 hover:bg-background/50 transition-all',
          'border-border/50 hover:border-cbd-green/30',
          item.availability === 'out_of_stock' && 'opacity-60'
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={cn('p-2 rounded-lg bg-background/50')}>
            <Icon className={cn('h-4 w-4', category.color)} />
          </div>
          <Badge variant="outline" className={cn('text-[10px]', availability.color)}>
            {availability.label}
          </Badge>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-1">{item.name}</h4>
        <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Coins className="h-3.5 w-3.5 text-cbd-green" />
            <span className="text-sm font-bold text-cbd-green">
              {item.pointsCost.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">pts</span>
          </div>
          <Badge variant="outline" className="text-[10px] border-border/50 text-muted-foreground">
            {tierLabels[item.minTier]}
          </Badge>
        </div>
        {item.stock !== undefined && item.availability === 'limited' && (
          <p className="text-[10px] text-amber-400 mt-2">
            Solo quedan {item.stock} unidades
          </p>
        )}
      </div>
    </motion.div>
  )
}
