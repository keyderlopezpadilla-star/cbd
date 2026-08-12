'use client'

import { Users, UserPlus, UserCheck, TrendingUp, UserX } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { MOCK_CUSTOMERS } from '@/lib/mock-data/customers'

export function CustomerStats() {
  const totalCustomers = MOCK_CUSTOMERS.length
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

  const newThisMonth = MOCK_CUSTOMERS.filter(
    (c) => c.createdAt >= thirtyDaysAgo
  ).length

  const activeCustomers = MOCK_CUSTOMERS.filter(
    (c) => c.lastPurchase && c.lastPurchase >= ninetyDaysAgo
  ).length

  const retentionRate = Math.round((activeCustomers / totalCustomers) * 100)

  const totalSpent = MOCK_CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgCLV = totalSpent / totalCustomers

  const inactiveCustomers = MOCK_CUSTOMERS.filter(
    (c) => !c.lastPurchase || c.lastPurchase < ninetyDaysAgo
  ).length
  const churnRate = Math.round((inactiveCustomers / totalCustomers) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Clientes"
        value={totalCustomers}
        change={12}
        changeLabel="vs mes anterior"
        icon={Users}
        description="Clientes registrados"
      />
      <StatCard
        title="Nuevos este Mes"
        value={newThisMonth}
        change={8}
        changeLabel="vs mes anterior"
        icon={UserPlus}
        description="Registros en 30 dias"
      />
      <StatCard
        title="Tasa Retencion"
        value={`${retentionRate}%`}
        change={3.2}
        changeLabel="vs mes anterior"
        icon={UserCheck}
        description="Clientes activos en 90 dias"
      />
      <StatCard
        title="CLV Promedio"
        value={`${avgCLV.toFixed(0)}€`}
        change={5.8}
        changeLabel="vs mes anterior"
        icon={TrendingUp}
        description="Valor vida del cliente"
      />
      <StatCard
        title="Tasa de Abandono"
        value={`${churnRate}%`}
        change={-2.1}
        changeLabel="vs mes anterior"
        icon={UserX}
        description="Sin compra en 90+ dias"
      />
    </div>
  )
}
