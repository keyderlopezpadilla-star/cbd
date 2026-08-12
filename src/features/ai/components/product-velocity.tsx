'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Snail, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { PRODUCT_VELOCITY } from '@/lib/mock-data/ai-predictions'

export function ProductVelocity() {
  const fastMovers = PRODUCT_VELOCITY.filter((p) => p.velocity === 'fast')
  const slowMovers = PRODUCT_VELOCITY.filter((p) => p.velocity === 'slow')

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-cbd-green" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-400" />
      default:
        return <Minus className="h-3 w-3 text-cbd-gray" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fast Movers */}
      <Card className="glass border-cbd-green/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-cbd-green" />
            Productos Rapidos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {fastMovers.map((product, i) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg border border-cbd-green/10 bg-cbd-green/[0.02] hover:bg-cbd-green/[0.05] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white font-medium truncate">{product.productName}</p>
                  <TrendIcon trend={product.trend} />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-cbd-gray">{product.category}</span>
                  <span className="text-[10px] text-cbd-green font-medium">{product.avgDailySales} uds/dia</span>
                  <span className="text-[10px] text-cbd-gray">{product.daysOfStock}d stock</span>
                </div>
              </div>
              <div className="text-right ml-3">
                <p className="text-xs font-semibold text-cbd-green">{formatCurrency(product.revenueImpact)}</p>
                <p className="text-[10px] text-cbd-gray">impacto/dia</p>
              </div>
            </motion.div>
          ))}
          <p className="text-[10px] text-cbd-gray/70 italic pt-2">
            Alta demanda. Mantener niveles de stock optimos para maximizar ingresos.
          </p>
        </CardContent>
      </Card>

      {/* Slow Movers */}
      <Card className="glass border-cbd-green/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Snail className="h-4 w-4 text-amber-400" />
            Productos Lentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {slowMovers.map((product, i) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg border border-amber-500/10 bg-amber-500/[0.02] hover:bg-amber-500/[0.05] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white font-medium truncate">{product.productName}</p>
                  <TrendIcon trend={product.trend} />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-cbd-gray">{product.category}</span>
                  <span className="text-[10px] text-amber-400 font-medium">{product.avgDailySales} uds/dia</span>
                  <span className="text-[10px] text-cbd-gray">{product.daysOfStock}d stock</span>
                </div>
              </div>
              <div className="text-right ml-3">
                <p className="text-xs font-semibold text-amber-400">{formatCurrency(product.revenueImpact)}</p>
                <p className="text-[10px] text-cbd-gray">impacto/dia</p>
              </div>
            </motion.div>
          ))}
          <p className="text-[10px] text-cbd-gray/70 italic pt-2">
            Baja rotacion. Considerar promociones, bundles o reducir frecuencia de pedido.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
