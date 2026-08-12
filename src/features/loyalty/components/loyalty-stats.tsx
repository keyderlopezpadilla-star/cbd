'use client'

import { Users, Coins, ArrowUpCircle, TrendingUp, Gift } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { MOCK_LOYALTY_STATS } from '@/lib/mock-data/loyalty'

export function LoyaltyStats() {
  const stats = MOCK_LOYALTY_STATS

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Miembros Activos"
        value={stats.activeMembers}
        change={8.5}
        changeLabel="vs mes anterior"
        icon={Users}
        description={`${stats.totalMembers} totales registrados`}
      />
      <StatCard
        title="Puntos Emitidos Hoy"
        value={stats.pointsIssuedToday.toLocaleString()}
        change={12.3}
        changeLabel="vs ayer"
        icon={Coins}
        description="Puntos ganados por clientes"
      />
      <StatCard
        title="Tasa de Canje"
        value={`${stats.redemptionRate}%`}
        change={3.1}
        changeLabel="vs mes anterior"
        icon={Gift}
        description="Puntos canjeados vs emitidos"
      />
      <StatCard
        title="Promedio por Miembro"
        value={stats.avgPointsPerMember.toLocaleString()}
        change={5.7}
        changeLabel="vs mes anterior"
        icon={TrendingUp}
        description="Puntos promedio acumulados"
      />
      <StatCard
        title="Upgrades este Mes"
        value={stats.tierUpgradesThisMonth}
        change={50}
        changeLabel="vs mes anterior"
        icon={ArrowUpCircle}
        description="Miembros subieron de tier"
      />
    </div>
  )
}
