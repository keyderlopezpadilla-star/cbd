'use client'

import { useMemo } from 'react'
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  XCircle,
  Clock,
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { StockStatus } from '@/lib/constants'
import { InventoryItem } from '@/types'

interface InventoryOverviewProps {
  items: InventoryItem[]
}

export function InventoryOverview({ items }: InventoryOverviewProps) {
  const stats = useMemo(() => {
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const totalSKUs = items.length
    const normal = items.filter((i) => i.status === StockStatus.NORMAL).length
    const low = items.filter((i) => i.status === StockStatus.LOW).length
    const critical = items.filter((i) => i.status === StockStatus.CRITICAL).length
    const outOfStock = items.filter((i) => i.status === StockStatus.OUT_OF_STOCK).length
    const expiringSoon = items.filter(
      (i) => i.expiryDate && new Date(i.expiryDate) <= thirtyDaysFromNow && new Date(i.expiryDate) > now
    ).length

    return { totalSKUs, normal, low, critical, outOfStock, expiringSoon }
  }, [items])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total SKUs"
        value={stats.totalSKUs}
        icon={Package}
        description="Productos en sistema"
      />
      <StatCard
        title="Stock Normal"
        value={stats.normal}
        icon={CheckCircle2}
        description="Niveles correctos"
        className="border-green-500/20"
      />
      <StatCard
        title="Stock Bajo"
        value={stats.low}
        icon={AlertTriangle}
        description="Requieren atencion"
        className="border-yellow-500/20"
      />
      <StatCard
        title="Stock Critico"
        value={stats.critical}
        icon={AlertOctagon}
        description="Accion urgente"
        className="border-red-500/20"
      />
      <StatCard
        title="Sin Stock"
        value={stats.outOfStock}
        icon={XCircle}
        description="Agotados"
        className="border-gray-500/20"
      />
      <StatCard
        title="Caducidad Proxima"
        value={stats.expiringSoon}
        icon={Clock}
        description="Proximos 30 dias"
        className="border-orange-500/20"
      />
    </div>
  )
}
