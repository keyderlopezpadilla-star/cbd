'use client'

import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { InventoryItem } from '@/types'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { getProductName, getStoreName } from '@/lib/mock-data/inventory'

interface ExpiryTrackerProps {
  items: InventoryItem[]
}

function getDaysRemaining(expiryDate: Date): number {
  const now = new Date()
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function getUrgencyConfig(days: number) {
  if (days < 0) return { label: 'Expirado', color: 'text-red-600', bg: 'bg-red-500/10', variant: 'destructive' as const }
  if (days < 7) return { label: 'Urgente', color: 'text-red-500', bg: 'bg-red-500/5', variant: 'destructive' as const }
  if (days < 30) return { label: 'Proximo', color: 'text-orange-500', bg: 'bg-orange-500/5', variant: 'warning' as const }
  return { label: 'OK', color: 'text-cbd-green', bg: 'bg-transparent', variant: 'success' as const }
}

export function ExpiryTracker({ items }: ExpiryTrackerProps) {
  const itemsWithExpiry = useMemo(() => {
    return items
      .filter((item) => item.expiryDate !== null)
      .map((item) => ({
        ...item,
        daysRemaining: getDaysRemaining(item.expiryDate!),
      }))
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
  }, [items])

  if (itemsWithExpiry.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-16">
        <p className="text-sm text-muted-foreground">No hay productos con fecha de caducidad</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-card/80 border-b border-border/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Producto</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Tienda</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Fecha Caducidad</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Dias Restantes</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Urgencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {itemsWithExpiry.map((item) => {
              const urgency = getUrgencyConfig(item.daysRemaining)
              return (
                <tr key={item.id} className={cn('transition-colors hover:bg-card/50', urgency.bg)}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {getProductName(item.productId)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {getStoreName(item.storeId)}
                  </td>
                  <td className={cn('px-4 py-3', urgency.color)}>
                    {formatDate(item.expiryDate!)}
                  </td>
                  <td className={cn('px-4 py-3 text-right font-bold', urgency.color)}>
                    {item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)}d atras` : `${item.daysRemaining}d`}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={urgency.variant}>{urgency.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
