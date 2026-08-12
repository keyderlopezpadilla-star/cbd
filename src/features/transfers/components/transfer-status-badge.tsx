'use client'

import { Clock, Check, Package, Truck, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TransferStatus } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface TransferStatusBadgeProps {
  status: TransferStatus
  className?: string
}

const statusConfig: Record<
  TransferStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  [TransferStatus.REQUESTED]: {
    label: 'Solicitada',
    icon: Clock,
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  [TransferStatus.APPROVED]: {
    label: 'Aprobada',
    icon: Check,
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  [TransferStatus.PREPARING]: {
    label: 'Preparando',
    icon: Package,
    className: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  [TransferStatus.IN_TRANSIT]: {
    label: 'En Transito',
    icon: Truck,
    className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  [TransferStatus.RECEIVED]: {
    label: 'Recibida',
    icon: CheckCircle,
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  [TransferStatus.CANCELLED]: {
    label: 'Cancelada',
    icon: XCircle,
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export function TransferStatusBadge({ status, className }: TransferStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn(
        'gap-1.5 font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}
