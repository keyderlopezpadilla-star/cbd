'use client'

import { motion } from 'framer-motion'
import { Truck, MapPin, Clock, Package, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, formatDateTime } from '@/lib/utils'
import { Order } from '@/types'
import { OrderStatus } from '@/lib/constants'

interface OrderTrackingProps {
  order: Order
}

interface TrackingStep {
  location: string
  timestamp: Date
  description: string
  isCompleted: boolean
}

function getTrackingSteps(order: Order): TrackingStep[] {
  if (!order.trackingNumber) return []

  const baseDate = new Date(order.createdAt)
  const steps: TrackingStep[] = []

  // Generate realistic tracking steps based on order status
  steps.push({
    location: 'Almacen Central',
    timestamp: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000),
    description: 'Paquete recogido por el transportista',
    isCompleted: true,
  })

  steps.push({
    location: 'Centro de Distribucion Madrid',
    timestamp: new Date(baseDate.getTime() + 36 * 60 * 60 * 1000),
    description: 'En transito al centro de distribucion',
    isCompleted: true,
  })

  if (
    order.status === OrderStatus.SHIPPED ||
    order.status === OrderStatus.DELIVERED
  ) {
    steps.push({
      location: `Centro Local - ${order.shippingAddress.city}`,
      timestamp: new Date(baseDate.getTime() + 60 * 60 * 60 * 1000),
      description: 'Paquete en reparto local',
      isCompleted: order.status === OrderStatus.DELIVERED,
    })
  }

  if (order.status === OrderStatus.DELIVERED) {
    steps.push({
      location: order.shippingAddress.city,
      timestamp: new Date(order.updatedAt),
      description: 'Entregado al destinatario',
      isCompleted: true,
    })
  }

  return steps
}

function getCarrierInfo(trackingNumber: string) {
  // Simulated carrier info based on tracking prefix
  return {
    name: 'SEUR Express',
    service: 'Envio Standard (2-4 dias)',
    estimatedDelivery: 'Entrega estimada: 2-4 dias laborables',
    website: 'https://www.seur.com/seguimiento',
  }
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const trackingSteps = getTrackingSteps(order)
  const carrier = order.trackingNumber ? getCarrierInfo(order.trackingNumber) : null

  if (!order.trackingNumber) {
    return (
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Truck className="h-5 w-5 text-cbd-green" />
            Seguimiento de Envio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              El seguimiento estara disponible una vez que el pedido sea enviado
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <Truck className="h-5 w-5 text-cbd-green" />
          Seguimiento de Envio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Carrier Info */}
        {carrier && (
          <div className="rounded-lg border border-border/30 bg-muted/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{carrier.name}</p>
                <p className="text-xs text-muted-foreground">{carrier.service}</p>
              </div>
              <Badge variant="info">En seguimiento</Badge>
            </div>
            <Separator className="bg-border/30" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Numero de seguimiento</p>
                <p className="text-sm font-mono text-cbd-green">{order.trackingNumber}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-3 w-3" />
                Ver en web
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{carrier.estimatedDelivery}</span>
            </div>
          </div>
        )}

        {/* Tracking Steps */}
        {trackingSteps.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Historial de envio</p>
            <div className="relative ml-3">
              {trackingSteps.map((step, index) => {
                const isLast = index === trackingSteps.length - 1
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative pb-6 last:pb-0"
                  >
                    {!isLast && (
                      <div
                        className={cn(
                          'absolute left-[7px] top-[24px] w-0.5 h-[calc(100%-16px)]',
                          step.isCompleted ? 'bg-cbd-green/50' : 'bg-border/30'
                        )}
                      />
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'mt-1 h-4 w-4 rounded-full border-2 shrink-0',
                          step.isCompleted
                            ? 'bg-cbd-green border-cbd-green'
                            : 'bg-transparent border-muted-foreground'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {step.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {step.location}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(step.timestamp)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Map Placeholder */}
        <div className="rounded-lg border border-border/30 bg-muted/5 p-6 text-center">
          <MapPin className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Mapa de seguimiento en tiempo real
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Proximamente - Integracion con API de transportistas
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
