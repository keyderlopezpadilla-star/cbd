'use client'

import { useState, useMemo } from 'react'
import { Search, Calendar, Filter, Receipt, Eye, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatDateTime } from '@/lib/utils'
import { mockSales, PAYMENT_METHODS } from '@/lib/mock-data/sales'
import { Sale } from '@/types'
import { motion } from 'framer-motion'

interface SalesHistoryProps {
  onViewSale?: (sale: Sale) => void
}

export function SalesHistory({ onViewSale }: SalesHistoryProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('')

  const filteredSales = useMemo(() => {
    let sales = [...mockSales].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )

    if (search) {
      const query = search.toLowerCase()
      sales = sales.filter(
        (s) =>
          s.saleNumber.toLowerCase().includes(query) ||
          s.items.some((item) => item.productName.toLowerCase().includes(query))
      )
    }

    if (statusFilter !== 'all') {
      sales = sales.filter((s) => s.status === statusFilter)
    }

    if (paymentFilter !== 'all') {
      sales = sales.filter((s) => s.paymentMethod === paymentFilter)
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter).toDateString()
      sales = sales.filter((s) => s.createdAt.toDateString() === filterDate)
    }

    return sales
  }, [search, statusFilter, paymentFilter, dateFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-cbd-green/10 text-cbd-green border-cbd-green/20">Completada</Badge>
      case 'refunded':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Devuelta</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pendiente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentLabel = (method: string) => {
    const found = PAYMENT_METHODS.find((m) => m.value === method)
    return found?.label || method
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por numero de venta o producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 w-[170px]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-card/50 border border-border/50 text-sm text-foreground"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Completada</option>
            <option value="refunded">Devuelta</option>
            <option value="pending">Pendiente</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-card/50 border border-border/50 text-sm text-foreground"
          >
            <option value="all">Todos los pagos</option>
            <option value="cash">Efectivo</option>
            <option value="card">Tarjeta</option>
            <option value="mixed">Mixto</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="rounded-xl border border-border/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-card/30">
                <th className="text-left p-3 font-medium text-muted-foreground">Ticket</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Fecha</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Productos</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Pago</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Estado</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Total</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale, index) => (
                <motion.tr
                  key={sale.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-border/20 hover:bg-card/20 transition-colors"
                >
                  <td className="p-3">
                    <span className="font-mono text-xs font-medium text-foreground">
                      {sale.saleNumber}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {formatDateTime(sale.createdAt)}
                  </td>
                  <td className="p-3">
                    <div className="space-y-0.5">
                      {sale.items.slice(0, 2).map((item, i) => (
                        <p key={i} className="text-xs text-foreground truncate max-w-[200px]">
                          {item.quantity}x {item.productName}
                        </p>
                      ))}
                      {sale.items.length > 2 && (
                        <p className="text-[10px] text-muted-foreground">
                          +{sale.items.length - 2} mas
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-xs text-muted-foreground">{getPaymentLabel(sale.paymentMethod)}</span>
                  </td>
                  <td className="p-3">
                    {getStatusBadge(sale.status)}
                  </td>
                  <td className="p-3 text-right">
                    <span className="font-semibold text-foreground">{formatCurrency(sale.total)}</span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewSale?.(sale)}
                        className="h-7 w-7 p-0"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Receipt className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No se encontraron ventas</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span>{filteredSales.length} venta(s) encontrada(s)</span>
        <span>
          Total: <span className="font-semibold text-foreground">{formatCurrency(filteredSales.reduce((sum, s) => sum + s.total, 0))}</span>
        </span>
      </div>
    </div>
  )
}
