'use client'

import { DollarSign, ShoppingBag, TrendingUp, CreditCard, Banknote, Wallet, Clock, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { cn, formatCurrency } from '@/lib/utils'
import { mockDailySummary } from '@/lib/mock-data/sales'
import { motion } from 'framer-motion'

export function DailySummary() {
  const summary = mockDailySummary

  const paymentTotal = summary.paymentBreakdown.cash + summary.paymentBreakdown.card + summary.paymentBreakdown.mixed
  const cashPercentage = (summary.paymentBreakdown.cash / paymentTotal) * 100
  const cardPercentage = (summary.paymentBreakdown.card / paymentTotal) * 100
  const mixedPercentage = (summary.paymentBreakdown.mixed / paymentTotal) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Resumen del Dia</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(summary.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ventas Totales"
          value={formatCurrency(summary.totalSales)}
          icon={DollarSign}
          change={12.5}
          changeLabel="vs ayer"
        />
        <StatCard
          title="Transacciones"
          value={summary.totalTransactions.toString()}
          icon={ShoppingBag}
          change={8.3}
          changeLabel="vs ayer"
        />
        <StatCard
          title="Ticket Medio"
          value={formatCurrency(summary.averageTicket)}
          icon={TrendingUp}
          change={3.7}
          changeLabel="vs ayer"
        />
        <StatCard
          title="Descuentos"
          value={formatCurrency(summary.totalDiscount)}
          icon={Package}
          description="Total descuentos aplicados"
        />
      </div>

      {/* Payment Breakdown + Hourly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-cbd-green" />
                Desglose por Forma de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cash */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-green-500" />
                    <span className="text-foreground font-medium">Efectivo</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{formatCurrency(summary.paymentBreakdown.cash)}</span>
                    <span className="text-xs text-muted-foreground ml-2">({cashPercentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-card/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{ width: `${cashPercentage}%` }}
                  />
                </div>
              </div>

              {/* Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-blue-500" />
                    <span className="text-foreground font-medium">Tarjeta</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{formatCurrency(summary.paymentBreakdown.card)}</span>
                    <span className="text-xs text-muted-foreground ml-2">({cardPercentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-card/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${cardPercentage}%` }}
                  />
                </div>
              </div>

              {/* Mixed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-purple-500" />
                    <span className="text-foreground font-medium">Mixto</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{formatCurrency(summary.paymentBreakdown.mixed)}</span>
                    <span className="text-xs text-muted-foreground ml-2">({mixedPercentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-card/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-500 transition-all"
                    style={{ width: `${mixedPercentage}%` }}
                  />
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Total recaudado</span>
                  <span className="text-lg font-bold text-cbd-green">{formatCurrency(paymentTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hourly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-cbd-green" />
                Actividad por Hora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {summary.transactionsByHour.map((hourData) => {
                  const maxAmount = Math.max(...summary.transactionsByHour.map((h) => h.amount))
                  const percentage = maxAmount > 0 ? (hourData.amount / maxAmount) * 100 : 0
                  return (
                    <div key={hourData.hour} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-12 font-mono">
                        {hourData.hour}
                      </span>
                      <div className="flex-1 h-5 rounded bg-card/50 overflow-hidden relative">
                        <div
                          className={cn(
                            'h-full rounded transition-all',
                            hourData.count > 0 ? 'bg-cbd-green/60' : 'bg-transparent'
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                        {hourData.count > 0 && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-foreground">
                            {hourData.count} venta(s)
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-foreground w-20 text-right">
                        {formatCurrency(hourData.amount)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Package className="h-4 w-4 text-cbd-green" />
              Productos Mas Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.topProducts.map((product, index) => (
                <div key={product.productId} className="flex items-center gap-3">
                  <span className={cn(
                    'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                    index === 0 ? 'bg-cbd-green/20 text-cbd-green' :
                    index === 1 ? 'bg-blue-500/20 text-blue-400' :
                    index === 2 ? 'bg-purple-500/20 text-purple-400' :
                    'bg-card/50 text-muted-foreground'
                  )}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{product.productName}</p>
                    <p className="text-xs text-muted-foreground">{product.quantity} unidades vendidas</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(product.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tax Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Resumen Fiscal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-card/30">
                <p className="text-xs text-muted-foreground">Base Imponible</p>
                <p className="text-lg font-bold text-foreground mt-1">
                  {formatCurrency(summary.totalSales - summary.totalTax)}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/30">
                <p className="text-xs text-muted-foreground">IVA Recaudado (21%)</p>
                <p className="text-lg font-bold text-foreground mt-1">
                  {formatCurrency(summary.totalTax)}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-card/30">
                <p className="text-xs text-muted-foreground">Descuentos Totales</p>
                <p className="text-lg font-bold text-foreground mt-1">
                  {formatCurrency(summary.totalDiscount)}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-cbd-green/10">
                <p className="text-xs text-muted-foreground">Venta Neta</p>
                <p className="text-lg font-bold text-cbd-green mt-1">
                  {formatCurrency(summary.totalSales)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
