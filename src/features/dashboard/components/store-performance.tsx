'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { storePerformanceData } from '@/lib/mock-data/dashboard'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, Store } from 'lucide-react'
import { motion } from 'framer-motion'

export function StorePerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Store className="h-5 w-5 text-cbd-green" />
            Store Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider py-3 px-2">
                    Store
                  </th>
                  <th className="text-right text-xs font-medium text-cbd-gray-light uppercase tracking-wider py-3 px-2">
                    Sales
                  </th>
                  <th className="text-right text-xs font-medium text-cbd-gray-light uppercase tracking-wider py-3 px-2">
                    Orders
                  </th>
                  <th className="text-right text-xs font-medium text-cbd-gray-light uppercase tracking-wider py-3 px-2">
                    Avg. Ticket
                  </th>
                  <th className="text-right text-xs font-medium text-cbd-gray-light uppercase tracking-wider py-3 px-2">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {storePerformanceData.map((store, index) => (
                  <motion.tr
                    key={store.storeId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cbd-green" />
                        <span className="text-sm font-medium text-white">
                          {store.storeName}
                        </span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2">
                      <span className="text-sm text-white font-medium">
                        {formatCurrency(store.sales)}
                      </span>
                    </td>
                    <td className="text-right py-3 px-2">
                      <span className="text-sm text-cbd-gray-light">
                        {store.orders}
                      </span>
                    </td>
                    <td className="text-right py-3 px-2">
                      <span className="text-sm text-cbd-gray-light">
                        {formatCurrency(store.averageTicket)}
                      </span>
                    </td>
                    <td className="text-right py-3 px-2">
                      <div className="flex items-center justify-end gap-1">
                        {store.growth >= 0 ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-cbd-green" />
                            <span className="text-sm font-medium text-cbd-green">
                              +{store.growth}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-red-500" />
                            <span className="text-sm font-medium text-red-500">
                              {store.growth}%
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
