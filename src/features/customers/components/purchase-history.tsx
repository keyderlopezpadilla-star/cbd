'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, ArrowDownLeft, CreditCard, Banknote } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { PurchaseRecord, getCustomerPurchases } from '@/lib/mock-data/customers'

interface PurchaseHistoryProps {
  customerId: string
}

export function PurchaseHistory({ customerId }: PurchaseHistoryProps) {
  const purchases = getCustomerPurchases(customerId)

  // Create monthly spending chart data
  const monthlySpending = purchases.reduce<Record<string, number>>((acc, p) => {
    const month = `${p.date.getFullYear()}-${String(p.date.getMonth() + 1).padStart(2, '0')}`
    acc[month] = (acc[month] || 0) + (p.isReturn ? -p.total : p.total)
    return acc
  }, {})

  const chartData = Object.entries(monthlySpending)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, total]) => ({
      month: new Date(month + '-01').toLocaleDateString('es-ES', { month: 'short' }),
      total,
    }))

  return (
    <div className="space-y-6">
      {/* Spending Chart */}
      {chartData.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-sm text-white">Gasto Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a2e',
                        border: '1px solid rgba(0, 255, 102, 0.2)',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Gasto']}
                    />
                    <Bar dataKey="total" fill="#00FF66" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Purchase Timeline */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-sm text-white">Historial de Compras</CardTitle>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Este cliente aun no tiene compras registradas
            </p>
          ) : (
            <div className="space-y-4">
              {purchases
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((purchase, idx) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="relative pl-6 pb-4 border-l border-white/10 last:border-l-0 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-[6.5px] ${
                      purchase.isReturn ? 'bg-red-500' : 'bg-cbd-green'
                    }`} />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {purchase.isReturn ? (
                            <ArrowDownLeft className="h-4 w-4 text-red-400" />
                          ) : (
                            <ShoppingBag className="h-4 w-4 text-cbd-green" />
                          )}
                          <span className="text-sm font-medium text-white">
                            {purchase.isReturn ? 'Devolucion' : 'Compra'} #{purchase.orderId}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {purchase.paymentMethod === 'card' ? (
                              <><CreditCard className="h-3 w-3 mr-1" />Tarjeta</>
                            ) : (
                              <><Banknote className="h-3 w-3 mr-1" />Efectivo</>
                            )}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatDate(purchase.date)}
                        </p>
                        <div className="space-y-1">
                          {purchase.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {item.quantity}x {item.productName}
                              </span>
                              <span className="text-white">
                                {formatCurrency(item.quantity * item.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          purchase.isReturn ? 'text-red-400' : 'text-white'
                        }`}>
                          {purchase.isReturn ? '-' : ''}{formatCurrency(purchase.total)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
