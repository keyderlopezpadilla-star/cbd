'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { MOCK_TIER_DISTRIBUTION, MOCK_LOYALTY_STATS } from '@/lib/mock-data/loyalty'

export function LoyaltyOverview() {
  const stats = MOCK_LOYALTY_STATS
  const tierData = MOCK_TIER_DISTRIBUTION

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Distribucion por Tier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Donut Chart */}
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tierData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="count"
                    nameKey="tier"
                  >
                    {tierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid rgba(0, 255, 102, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value: number, name: string) => [`${value} miembros`, name]}
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

            {/* Summary Stats */}
            <div className="space-y-4 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-cbd-green/5 border border-cbd-green/20">
                  <p className="text-xs text-muted-foreground">Total Emitidos</p>
                  <p className="text-xl font-bold text-foreground">
                    {stats.totalPointsIssued.toLocaleString()}
                  </p>
                  <p className="text-xs text-cbd-green">puntos</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <p className="text-xs text-muted-foreground">Total Canjeados</p>
                  <p className="text-xl font-bold text-foreground">
                    {stats.totalPointsRedeemed.toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-400">puntos</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs text-muted-foreground">Tasa Canje</p>
                  <p className="text-xl font-bold text-foreground">{stats.redemptionRate}%</p>
                  <p className="text-xs text-blue-400">conversion</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <p className="text-xs text-muted-foreground">Miembros Activos</p>
                  <p className="text-xl font-bold text-foreground">{stats.activeMembers}</p>
                  <p className="text-xs text-amber-400">de {stats.totalMembers} totales</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
