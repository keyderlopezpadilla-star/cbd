'use client'

import { LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'
import { Store } from '@/types'
import { StoreCard } from './store-card'
import { getStoreManager, getStoreKPIs } from '@/lib/mock-data/stores'
import { useRouter } from 'next/navigation'

interface StoreListProps {
  stores: Store[]
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

export function StoreList({ stores, viewMode, onViewModeChange }: StoreListProps) {
  const router = useRouter()

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-cbd-gray-light">
          {stores.length} tienda{stores.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-cbd-black/50 border border-cbd-green/10">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8',
              viewMode === 'grid' && 'bg-cbd-green/20 text-cbd-green'
            )}
            onClick={() => onViewModeChange('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8',
              viewMode === 'list' && 'bg-cbd-green/20 text-cbd-green'
            )}
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {stores.map((store, index) => (
            <StoreCard key={store.id} store={store} index={index} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="glass border border-cbd-green/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cbd-green/10">
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider px-4 py-3">
                    Tienda
                  </th>
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider px-4 py-3">
                    Ciudad
                  </th>
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider px-4 py-3">
                    Manager
                  </th>
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider px-4 py-3">
                    Ventas Hoy
                  </th>
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider px-4 py-3">
                    Pedidos
                  </th>
                  <th className="text-left text-xs font-medium text-cbd-gray-light uppercase tracking-wider px-4 py-3">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cbd-green/5">
                {stores.map((store) => {
                  const manager = getStoreManager(store.managerId)
                  const kpis = getStoreKPIs(store.id)
                  return (
                    <tr
                      key={store.id}
                      className="hover:bg-cbd-green/5 cursor-pointer transition-colors"
                      onClick={() => router.push(`/dashboard/stores/${store.id}`)}
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-white">{store.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-cbd-gray-light">{store.city}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-cbd-gray-light">
                          {manager?.name || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-white font-medium">
                          {kpis ? formatCurrency(kpis.dailySales) : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-white">
                          {kpis ? kpis.dailyOrders : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={store.isActive ? 'success' : 'destructive'} className="text-xs">
                          {store.isActive ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {stores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-cbd-gray-light text-sm">No se encontraron tiendas con los filtros aplicados.</p>
        </div>
      )}
    </div>
  )
}
