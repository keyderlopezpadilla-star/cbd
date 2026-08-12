import { Badge } from './badge'
import { StockStatus } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface StockStatusBadgeProps {
  status: StockStatus
  className?: string
}

export function StockStatusBadge({ status, className }: StockStatusBadgeProps) {
  const config = {
    [StockStatus.NORMAL]: {
      label: 'Normal',
      variant: 'success' as const,
      icon: '🟢',
    },
    [StockStatus.LOW]: {
      label: 'Stock Bajo',
      variant: 'warning' as const,
      icon: '🟡',
    },
    [StockStatus.CRITICAL]: {
      label: 'Stock Crítico',
      variant: 'destructive' as const,
      icon: '🔴',
    },
    [StockStatus.OUT_OF_STOCK]: {
      label: 'Agotado',
      variant: 'outline' as const,
      icon: '⚫',
    },
  }

  const { label, variant, icon } = config[status]

  return (
    <Badge variant={variant} className={cn('gap-1', className)}>
      <span>{icon}</span>
      {label}
    </Badge>
  )
}
