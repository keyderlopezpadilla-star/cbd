'use client'

import { motion } from 'framer-motion'
import { MapPin, User, Phone, Mail, CreditCard, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { OrderStatusBadge } from '@/components/ui/order-status-badge'
import { cn, formatCurrency, formatDateTime } from '@/lib/utils'
import { Order } from '@/types'
import { getCustomerById } from '@/lib/mock-data/orders'
import { MOCK_STORES } from '@/lib/mock-data/stores'

interface OrderDetailProps {
  order: Order
}

export function OrderDetail({ order }: OrderDetailProps) {
  const customer = getCustomerById(order.customerId)
  const store = MOCK_STORES.find((s) => s.id === order.storeId)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-2"
      >
        <Card className="glass border-cbd-green/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-cbd-green" />
              Productos del Pedido
            </CardTitle>
            <OrderStatusBadge status={order.status} />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 bg-muted/20">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Producto
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                      Cantidad
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      Precio
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/20 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">
                          {item.productName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {item.productId}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-foreground">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-right text-foreground">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2 rounded-lg bg-muted/10 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA (21%)</span>
                <span className="text-foreground">{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envio</span>
                <span className="text-foreground">
                  {order.shipping === 0 ? 'Gratis' : formatCurrency(order.shipping)}
                </span>
              </div>
              <Separator className="bg-border/30" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-white">Total</span>
                <span className="text-cbd-green">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sidebar Info */}
      <div className="space-y-6">
        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <User className="h-4 w-4 text-cbd-green" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-foreground">{customer?.name || 'Desconocido'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{customer?.email || '-'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{customer?.phone || '-'}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cbd-green" />
                Direccion de Envio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="text-foreground">{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.postalCode} {order.shippingAddress.city}
                </p>
                {order.shippingAddress.state && <p>{order.shippingAddress.state}</p>}
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-cbd-green" />
                Informacion del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Numero</span>
                <span className="text-foreground font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tienda</span>
                <span className="text-foreground">{store?.name || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Creado</span>
                <span className="text-foreground">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Actualizado</span>
                <span className="text-foreground">{formatDateTime(order.updatedAt)}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tracking</span>
                  <span className="text-cbd-green font-mono text-xs">{order.trackingNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
