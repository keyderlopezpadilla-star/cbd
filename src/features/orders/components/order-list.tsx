'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowUpDown, Eye, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OrderStatusBadge } from '@/components/ui/order-status-badge'
import { cn, formatCurrency, formatDateTime } from '@/lib/utils'
import { OrderStatus } from '@/lib/constants'
import { MOCK_ORDERS, getCustomerById } from '@/lib/mock-data/orders'
import { MOCK_STORES } from '@/lib/mock-data/stores'
import Link from 'next/link'

type SortField = 'orderNumber' | 'date' | 'total' | 'status'
type SortDirection = 'asc' | 'desc'

export function OrderList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [storeFilter, setStoreFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const filteredOrders = useMemo(() => {
    let result = [...MOCK_ORDERS]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((order) => {
        const customer = getCustomerById(order.customerId)
        return (
          order.orderNumber.toLowerCase().includes(query) ||
          customer?.name.toLowerCase().includes(query) ||
          order.items.some((item) => item.productName.toLowerCase().includes(query))
        )
      })
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Store filter
    if (storeFilter !== 'all') {
      result = result.filter((order) => order.storeId === storeFilter)
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'orderNumber':
          comparison = a.orderNumber.localeCompare(b.orderNumber)
          break
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'total':
          comparison = a.total - b.total
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [searchQuery, statusFilter, storeFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: OrderStatus.PENDING, label: 'Pendiente' },
    { value: OrderStatus.CONFIRMED, label: 'Confirmado' },
    { value: OrderStatus.PREPARING, label: 'Preparando' },
    { value: OrderStatus.SHIPPED, label: 'Enviado' },
    { value: OrderStatus.DELIVERED, label: 'Entregado' },
    { value: OrderStatus.CANCELLED, label: 'Cancelado' },
    { value: OrderStatus.REFUNDED, label: 'Reembolsado' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Pedidos ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por numero, cliente o producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={storeFilter}
                onChange={(e) => setStoreFilter(e.target.value)}
                className="rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground"
              >
                <option value="all">Todas las tiendas</option>
                {MOCK_STORES.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-muted/20">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    <button
                      onClick={() => handleSort('orderNumber')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Pedido
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Tienda
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Estado
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    <button
                      onClick={() => handleSort('total')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Total
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Fecha
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const customer = getCustomerById(order.customerId)
                  const store = MOCK_STORES.find((s) => s.id === order.storeId)
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="font-medium text-cbd-green hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {customer?.name || 'Cliente desconocido'}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {store?.name || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No se encontraron pedidos con los filtros aplicados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
