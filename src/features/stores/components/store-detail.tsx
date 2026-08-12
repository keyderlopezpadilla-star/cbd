'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Users,
  Edit,
  Package,
  TrendingUp,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/ui/stat-card'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Store } from '@/types'
import {
  getStoreManager,
  getStoreKPIs,
  getStoreRecentOrders,
  getStoreInventorySummary,
  type StoreRecentOrder,
} from '@/lib/mock-data/stores'

interface StoreDetailProps {
  store: Store
}

const orderStatusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'default' | 'destructive' }> = {
  pending: { label: 'Pendiente', variant: 'warning' },
  confirmed: { label: 'Confirmado', variant: 'info' },
  preparing: { label: 'Preparando', variant: 'default' },
  shipped: { label: 'Enviado', variant: 'info' },
  delivered: { label: 'Entregado', variant: 'success' },
}

export function StoreDetail({ store }: StoreDetailProps) {
  const router = useRouter()
  const manager = getStoreManager(store.managerId)
  const kpis = getStoreKPIs(store.id)
  const recentOrders = getStoreRecentOrders(store.id)
  const inventory = getStoreInventorySummary(store.id)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{store.name}</h1>
            <Badge variant={store.isActive ? 'success' : 'destructive'}>
              {store.isActive ? 'Activa' : 'Inactiva'}
            </Badge>
          </div>
          <p className="text-cbd-gray-light">
            {store.address}, {store.city}, {store.postalCode} - {store.country}
          </p>
          {manager && (
            <p className="text-sm text-cbd-gray">
              Manager: <span className="text-white">{manager.name}</span>
            </p>
          )}
        </div>
        <Button
          onClick={() => router.push(`/dashboard/stores/${store.id}/edit`)}
          className="bg-cbd-green text-cbd-black hover:bg-cbd-green-light font-semibold"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar Tienda
        </Button>
      </motion.div>

      {/* KPI Row */}
      {kpis && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Ventas Hoy"
            value={formatCurrency(kpis.dailySales)}
            icon={DollarSign}
            change={8.5}
            changeLabel="vs ayer"
          />
          <StatCard
            title="Pedidos Hoy"
            value={kpis.dailyOrders}
            icon={ShoppingBag}
            change={12}
            changeLabel="vs ayer"
          />
          <StatCard
            title="Alertas Stock"
            value={kpis.stockAlerts}
            icon={AlertTriangle}
            description="Productos bajo minimo"
          />
          <StatCard
            title="Empleados"
            value={kpis.employeeCount}
            icon={Users}
            description="Personal activo"
          />
        </div>
      )}

      {/* Bottom Grid: Orders + Inventory + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="glass border-cbd-green/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-cbd-green" />
                Pedidos Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cbd-green/10">
                      <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider pb-3">
                        Pedido
                      </th>
                      <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider pb-3">
                        Cliente
                      </th>
                      <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider pb-3">
                        Total
                      </th>
                      <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider pb-3">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cbd-green/5">
                    {recentOrders.map((order: StoreRecentOrder) => {
                      const statusConfig = orderStatusConfig[order.status]
                      return (
                        <tr key={order.id} className="hover:bg-cbd-green/5 transition-colors">
                          <td className="py-3 pr-4">
                            <span className="text-sm font-medium text-white">{order.orderNumber}</span>
                            <p className="text-xs text-cbd-gray">{order.date}</p>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="text-sm text-cbd-gray-light">{order.customerName}</span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="text-sm font-medium text-white">
                              {formatCurrency(order.total)}
                            </span>
                          </td>
                          <td className="py-3">
                            <Badge variant={statusConfig?.variant || 'default'} className="text-xs">
                              {statusConfig?.label || order.status}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Inventory + Quick Actions */}
        <div className="space-y-6">
          {/* Inventory Summary */}
          {inventory && (
            <Card className="glass border-cbd-green/10">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-cbd-green" />
                  Inventario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-cbd-black/50">
                  <span className="text-sm text-cbd-gray-light">Total Productos</span>
                  <span className="text-sm font-semibold text-white">{inventory.totalProducts}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-cbd-green/5">
                  <span className="text-sm text-cbd-gray-light">Stock Normal</span>
                  <span className="text-sm font-semibold text-cbd-green">{inventory.normalStock}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-500/5">
                  <span className="text-sm text-cbd-gray-light">Stock Bajo</span>
                  <span className="text-sm font-semibold text-yellow-500">{inventory.lowStock}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/5">
                  <span className="text-sm text-cbd-gray-light">Stock Critico</span>
                  <span className="text-sm font-semibold text-red-500">{inventory.criticalStock}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex h-2 rounded-full overflow-hidden bg-cbd-black/50">
                    <div
                      className="bg-cbd-green"
                      style={{ width: `${(inventory.normalStock / inventory.totalProducts) * 100}%` }}
                    />
                    <div
                      className="bg-yellow-500"
                      style={{ width: `${(inventory.lowStock / inventory.totalProducts) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(inventory.criticalStock / inventory.totalProducts) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="glass border-cbd-green/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cbd-green" />
                Acciones Rapidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-cbd-green/20 text-cbd-gray-light hover:text-white hover:bg-cbd-green/10"
              >
                <Package className="h-4 w-4 mr-2" />
                Ver Inventario Completo
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-cbd-green/20 text-cbd-gray-light hover:text-white hover:bg-cbd-green/10"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Todos los Pedidos
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-cbd-green/20 text-cbd-gray-light hover:text-white hover:bg-cbd-green/10"
              >
                <Users className="h-4 w-4 mr-2" />
                Gestionar Empleados
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-cbd-green/20 text-cbd-gray-light hover:text-white hover:bg-cbd-green/10"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Analiticas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
