'use client'

import { StatCard } from '@/components/ui/stat-card'
import { formatCurrency } from '@/lib/utils'
import { kpiMetrics, previousDayMetrics } from '@/lib/mock-data/dashboard'
import { calculatePercentageChange } from '@/lib/utils'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Receipt,
  Package,
  TrendingUp,
  Clock,
  AlertTriangle,
} from 'lucide-react'

export function KPIGrid() {
  const revenueChange = calculatePercentageChange(
    kpiMetrics.dailySales,
    previousDayMetrics.dailySales
  )
  const ordersChange = calculatePercentageChange(
    kpiMetrics.productsSold / 4.3,
    previousDayMetrics.productsSold / 4.3
  )
  const customersChange = calculatePercentageChange(
    kpiMetrics.newCustomers,
    previousDayMetrics.newCustomers
  )
  const ticketChange = calculatePercentageChange(
    kpiMetrics.averageTicket,
    previousDayMetrics.averageTicket
  )
  const productsSoldChange = calculatePercentageChange(
    kpiMetrics.productsSold,
    previousDayMetrics.productsSold
  )
  const profitChange = calculatePercentageChange(
    kpiMetrics.profit,
    previousDayMetrics.profit
  )

  const kpis = [
    {
      title: "Today's Revenue",
      value: formatCurrency(kpiMetrics.dailySales),
      change: Number(revenueChange.toFixed(1)),
      changeLabel: 'vs yesterday',
      icon: DollarSign,
    },
    {
      title: 'Orders Today',
      value: '72',
      change: Number(ordersChange.toFixed(1)),
      changeLabel: 'vs yesterday',
      icon: ShoppingCart,
    },
    {
      title: 'New Customers',
      value: kpiMetrics.newCustomers.toString(),
      change: Number(customersChange.toFixed(1)),
      changeLabel: 'vs yesterday',
      icon: Users,
    },
    {
      title: 'Average Ticket',
      value: formatCurrency(kpiMetrics.averageTicket),
      change: Number(ticketChange.toFixed(1)),
      changeLabel: 'vs yesterday',
      icon: Receipt,
    },
    {
      title: 'Products Sold',
      value: kpiMetrics.productsSold.toString(),
      change: Number(productsSoldChange.toFixed(1)),
      changeLabel: 'vs yesterday',
      icon: Package,
    },
    {
      title: 'Profit Margin',
      value: '27.0%',
      change: Number(profitChange.toFixed(1)),
      changeLabel: 'vs last month',
      icon: TrendingUp,
    },
    {
      title: 'Pending Orders',
      value: kpiMetrics.pendingOrders.toString(),
      change: -22.2,
      changeLabel: 'vs yesterday',
      icon: Clock,
      description: '14 orders awaiting processing',
    },
    {
      title: 'Low Stock Alerts',
      value: kpiMetrics.lowStock.toString(),
      change: 40.0,
      changeLabel: 'vs yesterday',
      icon: AlertTriangle,
      description: `${kpiMetrics.criticalStock} critical items`,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <StatCard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          changeLabel={kpi.changeLabel}
          icon={kpi.icon}
          description={kpi.description}
        />
      ))}
    </div>
  )
}
