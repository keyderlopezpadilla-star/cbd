'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { topProductsData } from '@/lib/mock-data/dashboard'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="glass border-cbd-green/20 h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-cbd-green" />
            Top Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topProductsData.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cbd-green/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-cbd-green">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-cbd-gray-light">
                    {product.unitsSold} units &middot; {product.category}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-white">
                    {formatCurrency(product.revenue)}
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    {product.trend >= 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-cbd-green" />
                        <span className="text-xs text-cbd-green">+{product.trend}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-500">{product.trend}%</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
