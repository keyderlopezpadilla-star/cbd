'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import { Store, TrendingUp, TrendingDown, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { STORE_COMPARISON_DATA, type StoreComparisonData } from '@/lib/mock-data/analytics'

interface StoreComparisonProps {
  filters: {
    stores: string[]
  }
}

const COLORS = ['#00FF66', '#10b981', '#6366f1', '#f59e0b', '#ef4444']

export function StoreComparison({ filters }: StoreComparisonProps) {
  const filteredStores = useMemo(() => {
    if (filters.stores.length === 0) return STORE_COMPARISON_DATA
    return STORE_COMPARISON_DATA.filter((s) => filters.stores.includes(s.storeId))
  }, [filters.stores])

  const sortedByRevenue = useMemo(
    () => [...filteredStores].sort((a, b) => b.revenue - a.revenue),
    [filteredStores]
  )

  const chartData = useMemo(
    () =>
      filteredStores.map((store) => ({
        name: store.storeName.split(' ')[0],
        revenue: store.revenue,
        orders: store.orders,
        avgTicket: store.avgTicket,
      })),
    [filteredStores]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-cbd-green" />
            <CardTitle className="text-lg font-semibold text-white">
              Comparacion por Tienda
            </CardTitle>
          </div>
          <p className="text-xs text-cbd-gray-light">
            Rendimiento de ventas por ubicacion
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bar Chart */}
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 11 }} />
                <YAxis tick={{ fill: '#888', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return [formatCurrency(value), 'Ingresos']
                    if (name === 'orders') return [value, 'Pedidos']
                    return [`${value.toFixed(2)} EUR`, 'Ticket Medio']
                  }}
                />
                <Legend
                  formatter={(value) => {
                    const labels: Record<string, string> = {
                      revenue: 'Ingresos',
                      orders: 'Pedidos',
                      avgTicket: 'Ticket Medio',
                    }
                    return <span className="text-xs text-cbd-gray-light">{labels[value] || value}</span>
                  }}
                />
                <Bar dataKey="revenue" fill="#00FF66" radius={[4, 4, 0, 0]} name="revenue" />
                <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} name="orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ranking Table */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              Ranking
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-cbd-gray-light font-medium">#</th>
                    <th className="text-left py-2 px-3 text-cbd-gray-light font-medium">Tienda</th>
                    <th className="text-right py-2 px-3 text-cbd-gray-light font-medium">Ingresos</th>
                    <th className="text-right py-2 px-3 text-cbd-gray-light font-medium">Pedidos</th>
                    <th className="text-right py-2 px-3 text-cbd-gray-light font-medium">Ticket Medio</th>
                    <th className="text-right py-2 px-3 text-cbd-gray-light font-medium">Crecimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedByRevenue.map((store, index) => (
                    <tr key={store.storeId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3">
                        <span
                          className={cn(
                            'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold',
                            index === 0 && 'bg-amber-400/20 text-amber-400',
                            index === 1 && 'bg-gray-400/20 text-gray-300',
                            index === 2 && 'bg-orange-400/20 text-orange-400',
                            index > 2 && 'bg-white/10 text-cbd-gray-light'
                          )}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-white font-medium">{store.storeName}</td>
                      <td className="py-2.5 px-3 text-right text-white">{formatCurrency(store.revenue)}</td>
                      <td className="py-2.5 px-3 text-right text-cbd-gray-light">{store.orders}</td>
                      <td className="py-2.5 px-3 text-right text-cbd-gray-light">{formatCurrency(store.avgTicket)}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 font-medium',
                            store.growth >= 0 ? 'text-cbd-green' : 'text-red-400'
                          )}
                        >
                          {store.growth >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {store.growth >= 0 ? '+' : ''}{store.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
