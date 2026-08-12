'use client'

import { ShoppingCart, Clock, Truck, CheckCircle, XCircle, DollarSign } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { formatCurrency } from '@/lib/utils'
import { getOrderStats } from '@/lib/mock-data/orders'

export function OrderStats() {
  const stats = getOrderStats()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total Pedidos"
        value={stats.totalOrders}
        change={12.5}
        changeLabel="vs mes anterior"
        icon={ShoppingCart}
        description="Pedidos totales del periodo"
      />
      <StatCard
        title="Ingresos"
        value={formatCurrency(stats.totalRevenue)}
        change={8.3}
        changeLabel="vs mes anterior"
        icon={DollarSign}
        description="Ingresos netos (sin cancelados)"
      />
      <StatCard
        title="Pendientes"
        value={stats.pendingOrders}
        change={-5.2}
        changeLabel="vs ayer"
        icon={Clock}
        description="Pedidos sin confirmar"
      />
      <StatCard
        title="En Envio"
        value={stats.shippedOrders}
        change={15.0}
        changeLabel="vs ayer"
        icon={Truck}
        description="Pedidos en transito"
      />
      <StatCard
        title="Entregados"
        value={stats.deliveredOrders}
        change={22.0}
        changeLabel="vs mes anterior"
        icon={CheckCircle}
        description="Entregas completadas"
      />
      <StatCard
        title="Tiempo Medio"
        value={`${stats.avgProcessingHours}h`}
        change={-8.0}
        changeLabel="vs mes anterior"
        icon={XCircle}
        description="Procesamiento promedio"
      />
    </div>
  )
}
