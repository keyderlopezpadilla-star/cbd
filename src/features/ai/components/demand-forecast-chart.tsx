'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { DEMAND_FORECASTS } from '@/lib/mock-data/ai-predictions'

export function DemandForecastChart() {
  const productIds = Object.keys(DEMAND_FORECASTS)
  const [selectedProduct, setSelectedProduct] = useState(productIds[0])

  const forecast = DEMAND_FORECASTS[selectedProduct]
  if (!forecast) return null

  const chartData = forecast.data.map((d) => ({
    fecha: d.date.slice(5), // MM-DD format
    actual: d.actual,
    prediccion: d.predicted,
    inferior: d.lower,
    superior: d.upper,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="glass border border-cbd-green/20 rounded-lg p-3 text-xs">
        <p className="text-white font-medium mb-1.5">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {entry.value != null ? `${entry.value} uds` : 'N/A'}
          </p>
        ))}
      </div>
    )
  }

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cbd-green" />
            Prevision de Demanda
          </CardTitle>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cbd-green/40 appearance-none cursor-pointer"
          >
            {productIds.map((id) => (
              <option key={id} value={id} className="bg-cbd-black text-white">
                {DEMAND_FORECASTS[id].productName}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="fecha"
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                interval={4}
              />
              <YAxis
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px' }}
                iconType="line"
              />
              {/* Confidence interval area */}
              <Area
                type="monotone"
                dataKey="superior"
                stroke="none"
                fill="#00FF66"
                fillOpacity={0.05}
                name="Limite superior"
              />
              <Area
                type="monotone"
                dataKey="inferior"
                stroke="none"
                fill="#00FF66"
                fillOpacity={0.05}
                name="Limite inferior"
              />
              {/* Predicted line */}
              <Line
                type="monotone"
                dataKey="prediccion"
                stroke="#00FF66"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Prediccion"
              />
              {/* Actual line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#22D3EE"
                strokeWidth={2}
                dot={{ fill: '#22D3EE', r: 2 }}
                connectNulls={false}
                name="Real"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 px-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-cyan-400" />
            <span className="text-[10px] text-cbd-gray">Ventas reales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-cbd-green border-dashed border-t border-cbd-green" />
            <span className="text-[10px] text-cbd-gray">Prediccion</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 bg-cbd-green/10 rounded-sm" />
            <span className="text-[10px] text-cbd-gray">Intervalo confianza</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
