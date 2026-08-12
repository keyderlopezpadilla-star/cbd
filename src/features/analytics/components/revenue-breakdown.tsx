'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import { DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import {
  REVENUE_BY_CATEGORY_DATA,
  REVENUE_BY_PAYMENT_DATA,
  REVENUE_BY_CHANNEL_DATA,
} from '@/lib/mock-data/analytics'

const CATEGORY_COLORS = ['#00FF66', '#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b']
const PAYMENT_COLORS = ['#00FF66', '#10b981', '#6366f1', '#f59e0b', '#ef4444']
const CHANNEL_COLORS = ['#00FF66', '#6366f1', '#f59e0b', '#ef4444']

interface DonutChartProps {
  data: { name: string; value: number; percentage: number }[]
  colors: string[]
  title: string
  centerLabel: string
  centerValue: string
}

function DonutChart({ data, colors, title, centerLabel, centerValue }: DonutChartProps) {
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-medium text-white mb-3">{title}</h4>
      <div className="relative h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  opacity={0.85}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
              formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-lg font-bold text-white">{centerValue}</p>
          <p className="text-[10px] text-cbd-gray-light">{centerLabel}</p>
        </div>
      </div>
      {/* Legend */}
      <div className="w-full mt-3 space-y-1.5">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-cbd-gray-light">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RevenueBreakdown() {
  const categoryData = REVENUE_BY_CATEGORY_DATA.map((item) => ({
    name: item.categoryLabel,
    value: item.revenue,
    percentage: item.percentage,
  }))

  const paymentData = REVENUE_BY_PAYMENT_DATA.map((item) => ({
    name: item.method,
    value: item.revenue,
    percentage: item.percentage,
  }))

  const channelData = REVENUE_BY_CHANNEL_DATA.map((item) => ({
    name: item.channel,
    value: item.revenue,
    percentage: item.percentage,
  }))

  const totalRevenue = REVENUE_BY_CATEGORY_DATA.reduce((acc, item) => acc + item.revenue, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-cbd-green" />
            <div>
              <CardTitle className="text-lg font-semibold text-white">
                Desglose de Ingresos
              </CardTitle>
              <p className="text-xs text-cbd-gray-light mt-0.5">
                Composicion de ingresos por categoria, canal y metodo de pago
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DonutChart
              data={categoryData}
              colors={CATEGORY_COLORS}
              title="Por Categoria"
              centerLabel="Total"
              centerValue={`${(totalRevenue / 1000).toFixed(0)}K`}
            />
            <DonutChart
              data={paymentData}
              colors={PAYMENT_COLORS}
              title="Por Metodo de Pago"
              centerLabel="Metodos"
              centerValue={`${paymentData.length}`}
            />
            <DonutChart
              data={channelData}
              colors={CHANNEL_COLORS}
              title="Por Canal"
              centerLabel="Canales"
              centerValue={`${channelData.length}`}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
