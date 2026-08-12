'use client'

import { useState, useMemo } from 'react'
import { Package, AlertTriangle, ArrowRightLeft, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InventoryOverview } from '@/features/inventory/components/inventory-overview'
import { InventoryTable } from '@/features/inventory/components/inventory-table'
import { StockAlerts } from '@/features/inventory/components/stock-alerts'
import { StockMovementHistory } from '@/features/inventory/components/stock-movement-history'
import { ExpiryTracker } from '@/features/inventory/components/expiry-tracker'
import {
  InventoryFiltersBar,
  defaultInventoryFilters,
  type InventoryFilters,
} from '@/features/inventory/components/inventory-filters'
import {
  mockInventoryItems,
  mockStockMovements,
  getProductName,
} from '@/lib/mock-data/inventory'
import { mockProducts } from '@/lib/mock-data/products'

type TabId = 'overview' | 'alerts' | 'movements' | 'expiry'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Vista General', icon: Package },
  { id: 'alerts', label: 'Alertas', icon: AlertTriangle },
  { id: 'movements', label: 'Movimientos', icon: ArrowRightLeft },
  { id: 'expiry', label: 'Caducidad', icon: Clock },
]

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [filters, setFilters] = useState<InventoryFilters>(defaultInventoryFilters)

  const filteredItems = useMemo(() => {
    let result = [...mockInventoryItems]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter((item) =>
        getProductName(item.productId).toLowerCase().includes(search)
      )
    }

    if (filters.store !== 'all') {
      result = result.filter((item) => item.storeId === filters.store)
    }

    if (filters.status !== 'all') {
      result = result.filter((item) => item.status === filters.status)
    }

    if (filters.category !== 'all') {
      const productIdsInCategory = mockProducts
        .filter((p) => p.category === filters.category)
        .map((p) => p.id)
      result = result.filter((item) => productIdsInCategory.includes(item.productId))
    }

    return result
  }, [filters])

  const sortedMovements = useMemo(() => {
    return [...mockStockMovements].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Inventario</h1>
        <p className="text-sm text-muted-foreground">
          Control de stock, alertas y movimientos de inventario
        </p>
      </div>

      {/* Overview Cards */}
      <InventoryOverview items={mockInventoryItems} />

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <InventoryFiltersBar filters={filters} onFiltersChange={setFilters} />
          <InventoryTable data={filteredItems} />
        </div>
      )}

      {activeTab === 'alerts' && (
        <StockAlerts items={mockInventoryItems} />
      )}

      {activeTab === 'movements' && (
        <StockMovementHistory movements={sortedMovements} />
      )}

      {activeTab === 'expiry' && (
        <ExpiryTracker items={mockInventoryItems} />
      )}
    </div>
  )
}
