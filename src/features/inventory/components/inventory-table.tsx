'use client'

import { useMemo, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { StockStatusBadge } from '@/components/ui/stock-status-badge'
import { InventoryItem } from '@/types'
import { formatDate, cn } from '@/lib/utils'
import { getProductName, getStoreName } from '@/lib/mock-data/inventory'

interface InventoryTableProps {
  data: InventoryItem[]
}

type SortField = 'product' | 'store' | 'quantity' | 'status' | 'expiry' | 'lastRestocked'
type SortDir = 'asc' | 'desc'

export function InventoryTable({ data }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('quantity')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'product':
          cmp = getProductName(a.productId).localeCompare(getProductName(b.productId))
          break
        case 'store':
          cmp = getStoreName(a.storeId).localeCompare(getStoreName(b.storeId))
          break
        case 'quantity':
          cmp = a.quantity - b.quantity
          break
        case 'status': {
          const order = { OUT_OF_STOCK: 0, CRITICAL: 1, LOW: 2, NORMAL: 3 }
          cmp = (order[a.status] ?? 4) - (order[b.status] ?? 4)
          break
        }
        case 'expiry': {
          const aDate = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity
          const bDate = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity
          cmp = aDate - bDate
          break
        }
        case 'lastRestocked': {
          const aDate = a.lastRestocked ? new Date(a.lastRestocked).getTime() : 0
          const bDate = b.lastRestocked ? new Date(b.lastRestocked).getTime() : 0
          cmp = aDate - bDate
          break
        }
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [data, sortField, sortDir])

  const getQuantityColor = (item: InventoryItem) => {
    switch (item.status) {
      case 'NORMAL': return 'text-cbd-green'
      case 'LOW': return 'text-yellow-500'
      case 'CRITICAL': return 'text-red-500'
      case 'OUT_OF_STOCK': return 'text-gray-500'
      default: return 'text-foreground'
    }
  }

  const getExpiryColor = (expiryDate: Date | null) => {
    if (!expiryDate) return ''
    const now = new Date()
    const date = new Date(expiryDate)
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    if (daysUntil < 7) return 'text-red-500'
    if (daysUntil < 30) return 'text-orange-500'
    return 'text-muted-foreground'
  }

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  )

  if (sortedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-16">
        <p className="text-sm text-muted-foreground">No se encontraron items de inventario</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-card/80 border-b border-border/50">
            <tr>
              <th className="px-4 py-3 text-left"><SortButton field="product">Producto</SortButton></th>
              <th className="px-4 py-3 text-left"><SortButton field="store">Tienda</SortButton></th>
              <th className="px-4 py-3 text-right"><SortButton field="quantity">Cantidad</SortButton></th>
              <th className="px-4 py-3 text-right">Min</th>
              <th className="px-4 py-3 text-right">Max</th>
              <th className="px-4 py-3 text-center"><SortButton field="status">Estado</SortButton></th>
              <th className="px-4 py-3 text-left"><SortButton field="expiry">Caducidad</SortButton></th>
              <th className="px-4 py-3 text-left">Ubicacion</th>
              <th className="px-4 py-3 text-left"><SortButton field="lastRestocked">Ult. Reposicion</SortButton></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">
                  {getProductName(item.productId)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {getStoreName(item.storeId)}
                </td>
                <td className={cn('px-4 py-3 text-right font-bold', getQuantityColor(item))}>
                  {item.quantity}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{item.minStock}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{item.maxStock}</td>
                <td className="px-4 py-3 text-center">
                  <StockStatusBadge status={item.status} />
                </td>
                <td className={cn('px-4 py-3', getExpiryColor(item.expiryDate))}>
                  {item.expiryDate ? formatDate(item.expiryDate) : '-'}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{item.location || '-'}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.lastRestocked ? formatDate(item.lastRestocked) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
