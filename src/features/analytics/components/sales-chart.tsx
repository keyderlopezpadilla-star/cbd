'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, BarChart2, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  DAILY_SALES_DATA,
  aggregateByDate,
  aggregateByWeek,
  aggregateByMonth,
} from '@/lib/mock-data/analytics'

type TimeGranularity = 'daily' | 'weekly' | 'monthly'
type ChartType = 'area' | 'line' | 'bar'

interface SalesChartProps {
  filters: {
    dateRange: '7d' | '30d' | '60d' | '90d' | 'custom'
    stores: string[]
    categories: string[]
    comparisonMode: boolean
  }
}

const CHART_COLORS = ['#00FF66', '#10b981', '#6366f1', '#f59e0b', '#ef4444']

export function SalesChart({ filters }: SalesChartProps) {
  const [granularity, setGranularity] = useState<TimeGranularity>('daily')
  const [chartType, setChartType] = useState<ChartType>('area')
  const [metric, setMetric] = useState<'revenue' | 'orders' | 'avgTicket'>('revenue')

  const daysMap: Record<string, number> = {
    '7d': 7,
    '30d': 30,
    '60d': 60,
    '90d': 90,
    'custom': 30,
  }

  const chartData = useMemo(() => {
    const days = daysMap[filters.dateRange]
    let filteredData = DAILY_SALES_DATA.slice(-(days * 5))

    if (filters.stores.length > 0) {
      filteredData = filteredData.filter((d) => filters.stores.includes(d.storeId))
    }

    if (filters.comparisonMode && filters.stores.length >= 2) {
      // Group by date and store for comparison
      const dateMap = new Map<string, Record<string, number>>()
      for (const item of filteredData) {
        const existing = dateMap.get(item.date) || {}
        existing[item.storeId] = item[metric]
        dateMap.set(item.date, existing)
      }

      const result = Array.from(dateMap.entries())
        .map(([date, stores]) => ({
          date: date.substring(5), // MM-DD
          ...stores,
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

      // Aggregate based on granularity (simplified for comparison mode)
      if (granularity === 'weekly') {
        const weekly: typeof result = []
        for (let i = 0; i < result.length; i += 7) {
          const chunk = result.slice(i, i + 7)
          if (chunk.length === 0) continue
          const aggregated: Record<string, unknown> = { date: chunk[0].date }
          for (const storeId of filters.stores) {
            const sum = chunk.reduce((acc, item) => acc + ((item as Record<string, number>)[storeId] || 0), 0)
            ;(aggregated as Record<string, number>)[storeId] = Math.round(sum * 100) / 100
          }
          weekly.push(aggregated as typeof result[0])
        }
        return weekly
      }

      return result
    }

    // Standard aggregated view
    switch (granularity) {
      case 'daily':
        return aggregateByDate(filteredData).map((d) => ({
          ...d,
          date: d.date.substring(5),
        }))
      case 'weekly':
        return aggregateByWeek(filteredData).map((d) => ({
          ...d,
          date: d.date.substring(5),
        }))
      case 'monthly':
        return aggregateByMonth(filteredData).map((d) => ({
          ...d,
          date: d.date,
        }))
      default:
        return aggregateByDate(filteredData).map((d) => ({
          ...d,
          date: d.date.substring(5),
        }))
    }
  }, [filters, granularity, metric])

  const storeNames: Record<string, string> = {
    '1': 'Madrid',
    '2': 'Valencia',
    '3': 'Barcelona',
    '4': 'Alicante',
    '5': 'Sevilla',
  }

  const metricLabel: Record<string, string> = {
    revenue: 'Ingresos',
    orders: 'Pedidos',
    avgTicket: 'Ticket Medio',
  }

  const formatValue = (value: number) => {
    if (metric === 'revenue') return `${value.toLocaleString('es-ES')} EUR`
    if (metric === 'avgTicket') return `${value.toFixed(2)} EUR`
    return value.toString()
  }

  const renderChart = () => {
    const isComparison = filters.comparisonMode && filters.stores.length >= 2

    if (isComparison) {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 11 }} />
            <YAxis tick={{ fill: '#888', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            {filters.stores.map((storeId, index) => (
              <Line
                key={storeId}
                type="monotone"
                dataKey={storeId}
                name={storeNames[storeId] || storeId}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF66" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FF66" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 11 }} />
            <YAxis tick={{ fill: '#888', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number) => [formatValue(value), metricLabel[metric]]}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke="#00FF66"
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 11 }} />
            <YAxis tick={{ fill: '#888', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number) => [formatValue(value), metricLabel[metric]]}
            />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#00FF66"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#00FF66' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 11 }} />
          <YAxis tick={{ fill: '#888', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [formatValue(value), metricLabel[metric]]}
          />
          <Bar dataKey={metric} fill="#00FF66" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Ventas por Periodo
            </CardTitle>
            <p className="text-xs text-cbd-gray-light mt-1">
              {metricLabel[metric]} - Vista {granularity === 'daily' ? 'diaria' : granularity === 'weekly' ? 'semanal' : 'mensual'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Metric Toggle */}
            <div className="flex rounded-lg bg-black/30 border border-white/10 p-0.5">
              {(['revenue', 'orders', 'avgTicket'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-medium rounded-md transition-all',
                    metric === m
                      ? 'bg-cbd-green text-black'
                      : 'text-cbd-gray-light hover:text-white'
                  )}
                >
                  {metricLabel[m]}
                </button>
              ))}
            </div>

            {/* Granularity Toggle */}
            <div className="flex rounded-lg bg-black/30 border border-white/10 p-0.5">
              {([
                { value: 'daily' as const, label: 'D' },
                { value: 'weekly' as const, label: 'S' },
                { value: 'monthly' as const, label: 'M' },
              ]).map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGranularity(g.value)}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-medium rounded-md transition-all',
                    granularity === g.value
                      ? 'bg-white/20 text-white'
                      : 'text-cbd-gray-light hover:text-white'
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Chart Type Toggle */}
            <div className="flex rounded-lg bg-black/30 border border-white/10 p-0.5">
              <button
                onClick={() => setChartType('area')}
                className={cn(
                  'p-1.5 rounded-md transition-all',
                  chartType === 'area' ? 'bg-white/20 text-white' : 'text-cbd-gray-light hover:text-white'
                )}
              >
                <Activity className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setChartType('line')}
                className={cn(
                  'p-1.5 rounded-md transition-all',
                  chartType === 'line' ? 'bg-white/20 text-white' : 'text-cbd-gray-light hover:text-white'
                )}
              >
                <TrendingUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={cn(
                  'p-1.5 rounded-md transition-all',
                  chartType === 'bar' ? 'bg-white/20 text-white' : 'text-cbd-gray-light hover:text-white'
                )}
              >
                <BarChart2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>
    </motion.div>
  )
}
