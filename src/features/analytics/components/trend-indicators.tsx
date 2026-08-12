'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { TREND_INDICATORS } from '@/lib/mock-data/analytics'

function InlineSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 64
  const height = 24

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  const color = positive ? '#00FF66' : '#ef4444'

  // Create area fill path
  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg width={width} height={height} className="inline-block">
      <defs>
        <linearGradient id={`grad-${positive ? 'pos' : 'neg'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#grad-${positive ? 'pos' : 'neg'})`}
        points={areaPoints}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export function TrendIndicators() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {TREND_INDICATORS.map((indicator, index) => {
        const isPositive = indicator.change >= 0

        return (
          <motion.div
            key={indicator.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass border-cbd-green/20 p-3 card-hover">
              <div className="space-y-2">
                <p className="text-[10px] text-cbd-gray-light font-medium uppercase tracking-wide">
                  {indicator.label}
                </p>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xl font-bold text-white">
                      {indicator.unit === 'EUR' && indicator.value >= 1000
                        ? `${(indicator.value / 1000).toFixed(1)}K`
                        : indicator.formattedValue}
                    </p>
                    {indicator.unit && indicator.unit !== '%' && (
                      <span className="text-[9px] text-cbd-gray-light">{indicator.unit}</span>
                    )}
                    {indicator.unit === '%' && (
                      <span className="text-[9px] text-cbd-gray-light">%</span>
                    )}
                  </div>
                  <InlineSparkline data={indicator.sparkline} positive={isPositive} />
                </div>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-cbd-green" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400" />
                  )}
                  <span
                    className={cn(
                      'text-[10px] font-medium',
                      isPositive ? 'text-cbd-green' : 'text-red-400'
                    )}
                  >
                    {isPositive ? '+' : ''}{indicator.change}%
                  </span>
                  <span className="text-[9px] text-cbd-gray ml-0.5">vs periodo anterior</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
