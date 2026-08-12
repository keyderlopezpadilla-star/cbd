'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  CheckCircle,
  Package,
  Truck,
  Home,
  XCircle,
  RotateCcw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatDateTime } from '@/lib/utils'
import { OrderStatus } from '@/lib/constants'
import { OrderTimelineEvent } from '@/lib/mock-data/orders'

interface OrderTimelineProps {
  events: OrderTimelineEvent[]
}

const statusIconMap: Record<OrderStatus, React.ElementType> = {
  [OrderStatus.PENDING]: Clock,
  [OrderStatus.CONFIRMED]: CheckCircle,
  [OrderStatus.PREPARING]: Package,
  [OrderStatus.SHIPPED]: Truck,
  [OrderStatus.DELIVERED]: Home,
  [OrderStatus.CANCELLED]: XCircle,
  [OrderStatus.REFUNDED]: RotateCcw,
}

const statusColorMap: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  [OrderStatus.CONFIRMED]: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  [OrderStatus.PREPARING]: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  [OrderStatus.SHIPPED]: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  [OrderStatus.DELIVERED]: 'text-cbd-green bg-cbd-green/10 border-cbd-green/30',
  [OrderStatus.CANCELLED]: 'text-red-400 bg-red-400/10 border-red-400/30',
  [OrderStatus.REFUNDED]: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
}

const statusLineColor: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-400/50',
  [OrderStatus.CONFIRMED]: 'bg-blue-400/50',
  [OrderStatus.PREPARING]: 'bg-orange-400/50',
  [OrderStatus.SHIPPED]: 'bg-purple-400/50',
  [OrderStatus.DELIVERED]: 'bg-cbd-green/50',
  [OrderStatus.CANCELLED]: 'bg-red-400/50',
  [OrderStatus.REFUNDED]: 'bg-gray-400/50',
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  if (events.length === 0) {
    return (
      <Card className="glass border-cbd-green/20">
        <CardContent className="py-8 text-center text-muted-foreground">
          No hay eventos en la linea de tiempo
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Linea de Tiempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative ml-4">
          {events.map((event, index) => {
            const Icon = statusIconMap[event.status]
            const colorClass = statusColorMap[event.status]
            const lineColor = statusLineColor[event.status]
            const isLast = index === events.length - 1

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative pb-8 last:pb-0"
              >
                {/* Vertical line */}
                {!isLast && (
                  <div
                    className={cn(
                      'absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-36px)]',
                      lineColor
                    )}
                  />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
                      colorClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatDateTime(event.timestamp)}</span>
                      <span className="text-cbd-green/60">por {event.user}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
