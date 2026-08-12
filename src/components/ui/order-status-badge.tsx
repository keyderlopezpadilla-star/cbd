import { Badge } from './badge'
import { OrderStatus } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = {
    [OrderStatus.PENDING]: {
      label: 'Pendiente',
      variant: 'outline' as const,
    },
    [OrderStatus.CONFIRMED]: {
      label: 'Confirmado',
      variant: 'info' as const,
    },
    [OrderStatus.PREPARING]: {
      label: 'Preparando',
      variant: 'warning' as const,
    },
    [OrderStatus.SHIPPED]: {
      label: 'Enviado',
      variant: 'info' as const,
    },
    [OrderStatus.DELIVERED]: {
      label: 'Entregado',
      variant: 'success' as const,
    },
    [OrderStatus.CANCELLED]: {
      label: 'Cancelado',
      variant: 'destructive' as const,
    },
    [OrderStatus.REFUNDED]: {
      label: 'Reembolsado',
      variant: 'secondary' as const,
    },
  }

  const { label, variant } = config[status]

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}
