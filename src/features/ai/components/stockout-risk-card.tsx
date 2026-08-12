'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, ArrowUpDown, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STOCKOUT_RISKS, type StockoutRisk } from '@/lib/mock-data/ai-predictions'

interface StockoutRiskCardProps {
  limit?: number
}

type SortBy = 'risk' | 'days'

const riskConfig = {
  high: {
    label: 'Alto',
    color: 'text-red-400 bg-red-400/10 border-red-400/30',
    dotColor: 'bg-red-400',
    pulse: true,
  },
  medium: {
    label: 'Medio',
    color: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    dotColor: 'bg-amber-400',
    pulse: false,
  },
  low: {
    label: 'Bajo',
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    dotColor: 'bg-emerald-400',
    pulse: false,
  },
}

export function StockoutRiskCard({ limit }: StockoutRiskCardProps) {
  const [sortBy, setSortBy] = useState<SortBy>('risk')

  const sortedRisks = useMemo(() => {
    const riskOrder = { high: 0, medium: 1, low: 2 }
    let sorted = [...STOCKOUT_RISKS]

    if (sortBy === 'risk') {
      sorted.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel])
    } else {
      sorted.sort((a, b) => a.daysUntilStockout - b.daysUntilStockout)
    }

    if (limit) sorted = sorted.slice(0, limit)
    return sorted
  }, [sortBy, limit])

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            Riesgo de Stockout
          </CardTitle>
          <button
            onClick={() => setSortBy(sortBy === 'risk' ? 'days' : 'risk')}
            className="flex items-center gap-1 text-[10px] text-cbd-gray hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
          >
            <ArrowUpDown className="h-3 w-3" />
            {sortBy === 'risk' ? 'Por riesgo' : 'Por dias'}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
        {sortedRisks.map((item, i) => {
          const config = riskConfig[item.riskLevel]
          return (
            <motion.div
              key={item.productId + item.store}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                'p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors',
                item.riskLevel === 'high' && 'border-red-500/20'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Package className="h-3.5 w-3.5 text-cbd-gray flex-shrink-0" />
                    <p className="text-sm text-white font-medium truncate">{item.productName}</p>
                  </div>
                  <p className="text-[10px] text-cbd-gray mt-1 ml-5.5">{item.store}</p>
                </div>
                <div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium', config.color)}>
                  {config.pulse && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                    </span>
                  )}
                  {!config.pulse && <span className={cn('h-1.5 w-1.5 rounded-full', config.dotColor)} />}
                  {config.label}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 ml-5.5">
                <div>
                  <span className="text-[10px] text-cbd-gray">Stock: </span>
                  <span className={cn('text-[10px] font-medium', item.currentStock <= 3 ? 'text-red-400' : 'text-white')}>
                    {item.currentStock} uds
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cbd-gray">Dias restantes: </span>
                  <span className={cn('text-[10px] font-medium', item.daysUntilStockout <= 3 ? 'text-red-400' : 'text-white')}>
                    {item.daysUntilStockout}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-cbd-gray">Venta/dia: </span>
                  <span className="text-[10px] font-medium text-white">{item.dailyAvgSales}</span>
                </div>
              </div>

              <p className="text-[10px] text-cbd-gray/80 mt-2 ml-5.5 italic">{item.recommendedAction}</p>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}
