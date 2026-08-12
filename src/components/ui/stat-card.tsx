'use client'

import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  description?: string
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs yesterday',
  icon: Icon,
  description,
  className,
}: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn('glass border-cbd-green/20 card-hover', className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cbd-gray-light">{title}</CardTitle>
          {Icon && (
            <div className="p-2 rounded-lg bg-cbd-green/10">
              <Icon className="h-4 w-4 text-cbd-green" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          {description && (
            <p className="text-xs text-cbd-gray-light mb-2">{description}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {isPositive && (
                <>
                  <TrendingUp className="h-3 w-3 text-cbd-green" />
                  <span className="text-cbd-green font-medium">+{Math.abs(change)}%</span>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500 font-medium">-{Math.abs(change)}%</span>
                </>
              )}
              {change === 0 && <span className="text-cbd-gray">No change</span>}
              <span className="text-cbd-gray ml-1">{changeLabel}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
