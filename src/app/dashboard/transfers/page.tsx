'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, ArrowRightLeft, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransferList } from '@/features/transfers/components/transfer-list'
import {
  TransferFiltersBar,
  defaultTransferFilters,
  type TransferFilters,
} from '@/features/transfers/components/transfer-filters'
import { mockTransfers } from '@/lib/mock-data/transfers'
import { TransferStatus } from '@/lib/constants'
import { cn } from '@/lib/utils'

type TabId = 'all' | 'pending' | 'in_process' | 'completed' | 'cancelled'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Todas', icon: ArrowRightLeft },
  { id: 'pending', label: 'Pendientes', icon: Clock },
  { id: 'in_process', label: 'En Proceso', icon: Truck },
  { id: 'completed', label: 'Completadas', icon: CheckCircle },
  { id: 'cancelled', label: 'Canceladas', icon: XCircle },
]

const tabStatusMap: Record<TabId, TransferStatus[]> = {
  all: [],
  pending: [TransferStatus.REQUESTED],
  in_process: [TransferStatus.APPROVED, TransferStatus.PREPARING, TransferStatus.IN_TRANSIT],
  completed: [TransferStatus.RECEIVED],
  cancelled: [TransferStatus.CANCELLED],
}

export default function TransfersPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [filters, setFilters] = useState<TransferFilters>(defaultTransferFilters)

  const filteredTransfers = useMemo(() => {
    let result = [...mockTransfers]

    // Tab filter
    const tabStatuses = tabStatusMap[activeTab]
    if (tabStatuses.length > 0) {
      result = result.filter((t) => tabStatuses.includes(t.status))
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter((t) =>
        t.transferNumber.toLowerCase().includes(search)
      )
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter((t) => t.status === filters.status)
    }

    // From store filter
    if (filters.fromStore !== 'all') {
      result = result.filter((t) => t.fromStoreId === filters.fromStore)
    }

    // To store filter
    if (filters.toStore !== 'all') {
      result = result.filter((t) => t.toStoreId === filters.toStore)
    }

    // Sort by most recent first
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return result
  }, [activeTab, filters])

  const getTabCount = (tabId: TabId): number => {
    const statuses = tabStatusMap[tabId]
    if (statuses.length === 0) return mockTransfers.length
    return mockTransfers.filter((t) => statuses.includes(t.status)).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transferencias</h1>
          <p className="text-sm text-muted-foreground">
            Gestion de transferencias de stock entre tiendas
          </p>
        </div>
        <Link href="/dashboard/transfers/new">
          <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
            <Plus className="h-4 w-4" />
            Nueva Transferencia
          </Button>
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const count = getTabCount(tab.id)
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              <span
                className={cn(
                  'text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center',
                  activeTab === tab.id
                    ? 'bg-black/20 text-black'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <TransferFiltersBar filters={filters} onFiltersChange={setFilters} />

      {/* Transfer List */}
      <TransferList transfers={filteredTransfers} />
    </div>
  )
}
