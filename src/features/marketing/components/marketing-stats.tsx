'use client'

import { Megaphone, Users, Target, DollarSign, Ticket } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { MOCK_CAMPAIGNS, MOCK_COUPONS } from '@/lib/mock-data/marketing'
import { formatCurrency } from '@/lib/utils'

export function MarketingStats() {
  const activeCampaigns = MOCK_CAMPAIGNS.filter((c) => c.status === 'ACTIVE').length
  const totalReach = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.metrics.reach, 0)
  const avgConversionRate =
    MOCK_CAMPAIGNS.filter((c) => c.metrics.reach > 0).reduce(
      (sum, c) => sum + (c.metrics.conversions / c.metrics.reach) * 100,
      0
    ) / MOCK_CAMPAIGNS.filter((c) => c.metrics.reach > 0).length
  const totalRevenue = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.metrics.revenue, 0)
  const totalRedemptions = MOCK_COUPONS.reduce((sum, c) => sum + c.currentUses, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Campanas Activas"
        value={activeCampaigns}
        change={12.5}
        changeLabel="vs mes anterior"
        icon={Megaphone}
        description="Campanas en ejecucion"
      />
      <StatCard
        title="Alcance Total"
        value={totalReach.toLocaleString('es-ES')}
        change={8.3}
        changeLabel="vs mes anterior"
        icon={Users}
        description="Personas alcanzadas"
      />
      <StatCard
        title="Tasa Conversion"
        value={`${avgConversionRate.toFixed(1)}%`}
        change={3.2}
        changeLabel="vs mes anterior"
        icon={Target}
        description="Conversion media"
      />
      <StatCard
        title="Revenue Atribuido"
        value={formatCurrency(totalRevenue)}
        change={15.7}
        changeLabel="vs mes anterior"
        icon={DollarSign}
        description="Ingresos de campanas"
      />
      <StatCard
        title="Cupones Usados"
        value={totalRedemptions.toLocaleString('es-ES')}
        change={22.1}
        changeLabel="vs mes anterior"
        icon={Ticket}
        description="Redenciones totales"
      />
    </div>
  )
}
