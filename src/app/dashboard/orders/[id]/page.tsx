'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderDetail } from '@/features/orders/components/order-detail'
import { OrderTimeline } from '@/features/orders/components/order-timeline'
import { OrderStatusFlow } from '@/features/orders/components/order-status-flow'
import { OrderTracking } from '@/features/orders/components/order-tracking'
import { OrderCancellation } from '@/features/orders/components/order-cancellation'
import { getOrderById, getOrderTimelineEvents } from '@/lib/mock-data/orders'
import { OrderStatus } from '@/lib/constants'
import Link from 'next/link'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState(() => getOrderById(orderId))
  const [showCancellation, setShowCancellation] = useState(false)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">Pedido no encontrado</p>
        <Link href="/dashboard/orders">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Pedidos
          </Button>
        </Link>
      </div>
    )
  }

  const timelineEvents = getOrderTimelineEvents(orderId)
  const canCancel =
    order.status === OrderStatus.PENDING ||
    order.status === OrderStatus.CONFIRMED ||
    order.status === OrderStatus.PREPARING

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder({ ...order, status: newStatus, updatedAt: new Date() })
  }

  const handleCancellation = (reason: string, refundOption: string, restoreStock: boolean) => {
    setOrder({ ...order, status: OrderStatus.CANCELLED, updatedAt: new Date() })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{order.orderNumber}</h1>
            <p className="text-sm text-muted-foreground">
              Detalle completo del pedido
            </p>
          </div>
        </div>
        {canCancel && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowCancellation(true)}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Cancelar Pedido
          </Button>
        )}
      </motion.div>

      {/* Status Flow */}
      <OrderStatusFlow
        currentStatus={order.status}
        onStatusChange={handleStatusChange}
      />

      {/* Order Detail */}
      <OrderDetail order={order} />

      {/* Timeline & Tracking Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OrderTimeline events={timelineEvents} />
        <OrderTracking order={order} />
      </div>

      {/* Cancellation Dialog */}
      <OrderCancellation
        order={order}
        isOpen={showCancellation}
        onClose={() => setShowCancellation(false)}
        onConfirm={handleCancellation}
      />
    </div>
  )
}
