'use client'

import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { StockMovement } from '@/lib/mock-data/inventory'

interface StockMovementHistoryProps {
  movements: StockMovement[]
}

const movementTypeConfig = {
  restock: { label: 'Reposicion', variant: 'success' as const },
  sale: { label: 'Venta', variant: 'info' as const },
  adjustment: { label: 'Ajuste', variant: 'warning' as const },
  transfer: { label: 'Transferencia', variant: 'default' as const },
}

export function StockMovementHistory({ movements }: StockMovementHistoryProps) {
  if (movements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-16">
        <p className="text-sm text-muted-foreground">No hay movimientos registrados</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-card/80 border-b border-border/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Fecha/Hora</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Producto</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Tienda</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Tipo</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Cambio</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Realizado por</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {movements.map((movement) => {
              const config = movementTypeConfig[movement.type]
              return (
                <tr key={movement.id} className="hover:bg-card/50 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDateTime(movement.timestamp)}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {movement.productName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {movement.storeName}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </td>
                  <td className={cn(
                    'px-4 py-3 text-right font-bold',
                    movement.quantityChange > 0 ? 'text-cbd-green' : 'text-red-500'
                  )}>
                    {movement.quantityChange > 0 ? '+' : ''}{movement.quantityChange}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {movement.performedBy}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate">
                    {movement.notes || '-'}
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
