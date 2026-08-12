'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import { PieChart as PieIcon, TrendingUp } from 'lucide-react'
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
import { MARGIN_BY_CATEGORY_DATA } from '@/lib/mock-data/analytics'

const CATEGORY_COLORS: Record<string, string> = {
  oils: '#00FF66',
  cosmetics: '#10b981',
  flowers: '#6366f1',
  capsules: '#f59e0b',
  creams: '#ec4899',
  wellness: '#8b5cf6',
  accessories: '#64748b',
}

export function MarginAnalysis() {
  const chartData = MARGIN_BY_CATEGORY_DATA.map((item) => ({
    name: item.categoryLabel,
    revenue: item.revenue,
    cost: item.cost,
    margin: item.margin,
    marginPercent: item.marginPercent,
  }))

  const totalMargin = MARGIN_BY_CATEGORY_DATA.reduce((acc, item) => acc + item.margin, 0)
  const totalRevenue = MARGIN_BY_CATEGORY_DATA.reduce((acc, item) => acc + item.revenue, 0)
  const overallMarginPercent = ((totalMargin / totalRevenue) * 100).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="h-5 w-5 text-cbd-green" />
              <div>
                <CardTitle className="text-lg font-semibold text-white">
                  Analisis de Margenes
                </CardTitle>
                <p className="text-xs text-cbd-gray-light mt-0.5">
                  Margen bruto por categoria de producto
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-cbd-green">{overallMarginPercent}%</p>
              <p className="text-[10px] text-cbd-gray-light">Margen Global</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stacked Bar Chart */}
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 10 }} />
                <YAxis tick={{ fill: '#888', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name === 'cost' ? 'Coste' : 'Margen',
                  ]}
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-cbd-gray-light">
                      {value === 'cost' ? 'Coste' : 'Margen'}
                    </span>
                  )}
                />
                <Bar dataKey="cost" stackId="a" fill="#ef4444" opacity={0.6} radius={[0, 0, 0, 0]} name="cost" />
                <Bar dataKey="margin" stackId="a" fill="#00FF66" opacity={0.8} radius={[4, 4, 0, 0]} name="margin" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Treemap-style Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {MARGIN_BY_CATEGORY_DATA.sort((a, b) => b.margin - a.margin).map((item) => {
              const color = CATEGORY_COLORS[item.category] || '#64748b'
              const sharePercent = ((item.margin / totalMargin) * 100).toFixed(1)

              return (
                <div
                  key={item.category}
                  className="relative overflow-hidden rounded-lg border border-white/10 p-3 bg-black/20 hover:border-white/20 transition-colors"
                >
                  {/* Background accent */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundColor: color }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] text-cbd-gray-light font-medium">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">{item.marginPercent}%</p>
                    <p className="text-[10px] text-cbd-gray-light">
                      {formatCurrency(item.margin)} beneficio
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-2.5 w-2.5 text-cbd-green" />
                      <span className="text-[10px] text-cbd-green">{sharePercent}% del total</span>
                    </div>
                    {/* Mini progress bar */}
                    <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.marginPercent}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
