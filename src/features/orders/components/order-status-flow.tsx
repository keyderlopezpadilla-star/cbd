'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  CheckCircle,
  Package,
  Truck,
  Home,
  XCircle,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@/lib/constants'
import { getValidNextStatuses, canTransitionTo } from '@/lib/mock-data/orders'

interface OrderStatusFlowProps {
  currentStatus: OrderStatus
  onStatusChange?: (newStatus: OrderStatus) => void
}

const allStatuses: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: OrderStatus.PENDING, label: 'Pendiente', icon: Clock },
  { status: OrderStatus.CONFIRMED, label: 'Confirmado', icon: CheckCircle },
  { status: OrderStatus.PREPARING, label: 'Preparando', icon: Package },
  { status: OrderStatus.SHIPPED, label: 'Enviado', icon: Truck },
  { status: OrderStatus.DELIVERED, label: 'Entregado', icon: Home },
]

const statusColors: Record<OrderStatus, { active: string; inactive: string }> = {
  [OrderStatus.PENDING]: {
    active: 'bg-yellow-400/20 border-yellow-400 text-yellow-400',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
  [OrderStatus.CONFIRMED]: {
    active: 'bg-blue-400/20 border-blue-400 text-blue-400',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
  [OrderStatus.PREPARING]: {
    active: 'bg-orange-400/20 border-orange-400 text-orange-400',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
  [OrderStatus.SHIPPED]: {
    active: 'bg-purple-400/20 border-purple-400 text-purple-400',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
  [OrderStatus.DELIVERED]: {
    active: 'bg-cbd-green/20 border-cbd-green text-cbd-green',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
  [OrderStatus.CANCELLED]: {
    active: 'bg-red-400/20 border-red-400 text-red-400',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
  [OrderStatus.REFUNDED]: {
    active: 'bg-gray-400/20 border-gray-400 text-gray-400',
    inactive: 'bg-muted/10 border-border/30 text-muted-foreground',
  },
}

function getStatusIndex(status: OrderStatus): number {
  const order = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PREPARING,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ]
  return order.indexOf(status)
}

export function OrderStatusFlow({ currentStatus, onStatusChange }: OrderStatusFlowProps) {
  const [confirmingStatus, setConfirmingStatus] = useState<OrderStatus | null>(null)
  const validNext = getValidNextStatuses(currentStatus)
  const currentIndex = getStatusIndex(currentStatus)
  const isCancelled = currentStatus === OrderStatus.CANCELLED
  const isRefunded = currentStatus === OrderStatus.REFUNDED

  const handleStatusClick = (targetStatus: OrderStatus) => {
    if (!canTransitionTo(currentStatus, targetStatus)) return
    setConfirmingStatus(targetStatus)
  }

  const confirmTransition = () => {
    if (confirmingStatus && onStatusChange) {
      onStatusChange(confirmingStatus)
    }
    setConfirmingStatus(null)
  }

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Flujo de Estado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Flow Progress */}
        {!isCancelled && !isRefunded && (
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {allStatuses.map((item, index) => {
              const Icon = item.icon
              const isActive = index <= currentIndex
              const isCurrent = item.status === currentStatus
              const colors = statusColors[item.status]

              return (
                <div key={item.status} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                        isActive ? colors.active : colors.inactive,
                        isCurrent && 'ring-2 ring-offset-2 ring-offset-background ring-current'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium whitespace-nowrap',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < allStatuses.length - 1 && (
                    <ArrowRight
                      className={cn(
                        'h-4 w-4 shrink-0 mb-5',
                        index < currentIndex ? 'text-cbd-green' : 'text-border/50'
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Cancelled/Refunded State */}
        {(isCancelled || isRefunded) && (
          <div className="flex items-center justify-center gap-3 rounded-lg border border-red-400/30 bg-red-400/10 p-4">
            {isCancelled ? (
              <XCircle className="h-6 w-6 text-red-400" />
            ) : (
              <RotateCcw className="h-6 w-6 text-gray-400" />
            )}
            <span className="text-sm font-medium text-foreground">
              {isCancelled ? 'Este pedido ha sido cancelado' : 'Este pedido ha sido reembolsado'}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        {validNext.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Acciones disponibles:</p>
            <div className="flex flex-wrap gap-2">
              {validNext.map((nextStatus) => {
                const isCancel = nextStatus === OrderStatus.CANCELLED
                const isRefund = nextStatus === OrderStatus.REFUNDED
                return (
                  <Button
                    key={nextStatus}
                    variant={isCancel || isRefund ? 'destructive' : 'default'}
                    size="sm"
                    onClick={() => handleStatusClick(nextStatus)}
                    className={cn(
                      !isCancel && !isRefund && 'bg-cbd-green text-black hover:bg-cbd-green-light'
                    )}
                  >
                    {nextStatus === OrderStatus.CONFIRMED && 'Confirmar Pedido'}
                    {nextStatus === OrderStatus.PREPARING && 'Iniciar Preparacion'}
                    {nextStatus === OrderStatus.SHIPPED && 'Marcar como Enviado'}
                    {nextStatus === OrderStatus.DELIVERED && 'Confirmar Entrega'}
                    {nextStatus === OrderStatus.CANCELLED && 'Cancelar Pedido'}
                    {nextStatus === OrderStatus.REFUNDED && 'Procesar Reembolso'}
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {confirmingStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Confirmar cambio de estado
                </p>
                <p className="text-xs text-muted-foreground">
                  Vas a cambiar el estado del pedido de{' '}
                  <span className="font-medium text-foreground">{currentStatus}</span> a{' '}
                  <span className="font-medium text-foreground">{confirmingStatus}</span>.
                  Esta accion no se puede deshacer.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={confirmTransition}
                    className="bg-cbd-green text-black hover:bg-cbd-green-light"
                  >
                    Confirmar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirmingStatus(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
