'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Sparkles } from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { SEASONAL_TRENDS } from '@/lib/mock-data/ai-predictions'

export function SeasonalTrends() {
  const chartData = SEASONAL_TRENDS.map((t) => ({
    mes: t.month.slice(0, 3),
    historico: t.historicalDemand,
    prediccion: t.predictedDemand,
  }))

  // Get current month index (0-based)
  const currentMonthIdx = new Date().getMonth()

  // Upcoming events (next 3 months)
  const upcomingEvents = SEASONAL_TRENDS
    .slice(currentMonthIdx, currentMonthIdx + 3)
    .filter((t) => t.events.length > 0)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    const trend = SEASONAL_TRENDS.find((t) => t.month.startsWith(label))
    return (
      <div className="glass border border-cbd-green/20 rounded-lg p-3 text-xs">
        <p className="text-white font-medium mb-1.5">{trend?.month || label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {entry.value?.toLocaleString()} EUR
          </p>
        ))}
        {trend?.events && trend.events.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-white/10">
            <p className="text-[10px] text-cbd-gray">Eventos:</p>
            {trend.events.map((e, i) => (
              <p key={i} className="text-[10px] text-amber-400">{e}</p>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-cbd-green" />
          Tendencias Estacionales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="mes"
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area
                type="monotone"
                dataKey="historico"
                stroke="#9CA3AF"
                fill="#9CA3AF"
                fillOpacity={0.1}
                strokeWidth={1.5}
                name="Historico"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="prediccion"
                stroke="#00FF66"
                fill="#00FF66"
                fillOpacity={0.1}
                strokeWidth={2}
                name="Prediccion"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-medium text-white mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Proximos Eventos de Demanda
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {upcomingEvents.map((trend, i) => (
                <motion.div
                  key={trend.month}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5"
                >
                  <p className="text-xs font-medium text-white">{trend.month}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {trend.events.map((event, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-cbd-gray mt-1.5">
                    Prevision: {trend.predictedDemand.toLocaleString()} EUR
                    <span className="text-cbd-green ml-1">
                      (+{Math.round(((trend.predictedDemand - trend.historicalDemand) / trend.historicalDemand) * 100)}%)
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
