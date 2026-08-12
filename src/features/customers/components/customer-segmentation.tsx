'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, UserPlus, Crown, UserX, TrendingUp } from 'lucide-react'
import { getSegmentDistribution, getSegmentLabel, CustomerSegment } from '@/lib/mock-data/customers'

const SEGMENT_COLORS: Record<CustomerSegment, string> = {
  NEW: '#3b82f6',
  RECURRING: '#22c55e',
  VIP: '#a855f7',
  INACTIVE: '#ef4444',
  HIGH_VALUE: '#f59e0b',
}

const SEGMENT_ICONS: Record<CustomerSegment, React.ElementType> = {
  NEW: UserPlus,
  RECURRING: Users,
  VIP: Crown,
  INACTIVE: UserX,
  HIGH_VALUE: TrendingUp,
}

export function CustomerSegmentation() {
  const distribution = getSegmentDistribution()
  const total = Object.values(distribution).reduce((a, b) => a + b, 0)

  const chartData = (Object.entries(distribution) as [CustomerSegment, number][]).map(
    ([segment, count]) => ({
      name: getSegmentLabel(segment),
      value: count,
      segment,
      percentage: Math.round((count / total) * 100),
    })
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Segmentacion de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.segment}
                        fill={SEGMENT_COLORS[entry.segment]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid rgba(0, 255, 102, 0.2)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => [`${value} clientes`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-sm text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Segment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {chartData.map((item) => {
                const Icon = SEGMENT_ICONS[item.segment]
                return (
                  <div
                    key={item.segment}
                    className="p-3 rounded-lg bg-background/50 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${SEGMENT_COLORS[item.segment]}20` }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: SEGMENT_COLORS[item.segment] }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-white">{item.value}</span>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: `${SEGMENT_COLORS[item.segment]}50`,
                          color: SEGMENT_COLORS[item.segment],
                        }}
                      >
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
