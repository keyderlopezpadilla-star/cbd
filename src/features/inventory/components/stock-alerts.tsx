'use client'

import { useMemo } from 'react'
import { AlertOctagon, AlertTriangle, Clock, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryItem } from '@/types'
import { StockStatus } from '@/lib/constants'
import { getProductName, getStoreName } from '@/lib/mock-data/inventory'
import { cn } from '@/lib/utils'

interface StockAlertsProps {
  items: InventoryItem[]
  compact?: boolean
}

export function StockAlerts({ items, compact = false }: StockAlertsProps) {
  const alerts = useMemo(() => {
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const critical = items.filter((i) => i.status === StockStatus.CRITICAL)
    const low = items.filter((i) => i.status === StockStatus.LOW)
    const expiring = items.filter(
      (i) => i.expiryDate && new Date(i.expiryDate) <= thirtyDaysFromNow && new Date(i.expiryDate) > now
    )

    return { critical, low, expiring }
  }, [items])

  const AlertItem = ({ item, urgency }: { item: InventoryItem; urgency: 'critical' | 'low' | 'expiring' }) => (
    <div className={cn(
      'flex items-center justify-between rounded-md px-3 py-2 text-sm',
      urgency === 'critical' && 'bg-red-500/10',
      urgency === 'low' && 'bg-yellow-500/10',
      urgency === 'expiring' && 'bg-orange-500/10',
    )}>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{getProductName(item.productId)}</p>
        <p className="text-xs text-muted-foreground">
          {getStoreName(item.storeId)} - Qty: {item.quantity} / Min: {item.minStock}
        </p>
      </div>
      <Button variant="outline" size="sm" className="ml-2 shrink-0 gap-1 text-xs">
        <ShoppingCart className="h-3 w-3" />
        Reponer
      </Button>
    </div>
  )

  const displayCritical = compact ? alerts.critical.slice(0, 3) : alerts.critical
  const displayLow = compact ? alerts.low.slice(0, 3) : alerts.low
  const displayExpiring = compact ? alerts.expiring.slice(0, 3) : alerts.expiring

  if (alerts.critical.length === 0 && alerts.low.length === 0 && alerts.expiring.length === 0) {
    return (
      <Card className="glass border-cbd-green/20">
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground">No hay alertas activas</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.critical.length > 0 && (
        <Card className="glass border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-red-500">
              <AlertOctagon className="h-4 w-4" />
              Stock Critico ({alerts.critical.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {displayCritical.map((item) => (
              <AlertItem key={item.id} item={item} urgency="critical" />
            ))}
            {compact && alerts.critical.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-1">
                +{alerts.critical.length - 3} mas...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {alerts.low.length > 0 && (
        <Card className="glass border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-yellow-500">
              <AlertTriangle className="h-4 w-4" />
              Stock Bajo ({alerts.low.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {displayLow.map((item) => (
              <AlertItem key={item.id} item={item} urgency="low" />
            ))}
            {compact && alerts.low.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-1">
                +{alerts.low.length - 3} mas...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {alerts.expiring.length > 0 && (
        <Card className="glass border-orange-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-orange-500">
              <Clock className="h-4 w-4" />
              Caducidad Proxima ({alerts.expiring.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {displayExpiring.map((item) => (
              <AlertItem key={item.id} item={item} urgency="expiring" />
            ))}
            {compact && alerts.expiring.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-1">
                +{alerts.expiring.length - 3} mas...
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
