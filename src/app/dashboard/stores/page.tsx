'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Store as StoreIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StoreList } from '@/features/stores/components/store-list'
import { StoreFilters } from '@/features/stores/components/store-filters'
import { StoreMap } from '@/features/stores/components/store-map'
import { MOCK_STORES, getStoreKPIs } from '@/lib/mock-data/stores'

export default function StoresPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name-asc')

  const filteredStores = useMemo(() => {
    let stores = [...MOCK_STORES]

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      stores = stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchLower) ||
          store.city.toLowerCase().includes(searchLower)
      )
    }

    // Filter by status
    if (statusFilter === 'active') {
      stores = stores.filter((store) => store.isActive)
    } else if (statusFilter === 'inactive') {
      stores = stores.filter((store) => !store.isActive)
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        stores.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        stores.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'sales-high':
        stores.sort((a, b) => {
          const kpiA = getStoreKPIs(a.id)
          const kpiB = getStoreKPIs(b.id)
          return (kpiB?.dailySales || 0) - (kpiA?.dailySales || 0)
        })
        break
      case 'sales-low':
        stores.sort((a, b) => {
          const kpiA = getStoreKPIs(a.id)
          const kpiB = getStoreKPIs(b.id)
          return (kpiA?.dailySales || 0) - (kpiB?.dailySales || 0)
        })
        break
    }

    return stores
  }, [search, statusFilter, sortBy])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <StoreIcon className="h-6 w-6 text-cbd-green" />
            Tiendas
          </h1>
          <p className="text-cbd-gray-light mt-1">
            Gestiona tus tiendas CBD y monitoriza su rendimiento
          </p>
        </div>
        <Link href="/dashboard/stores/new">
          <Button className="bg-cbd-green text-cbd-black hover:bg-cbd-green-light font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tienda
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <StoreFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {/* Store Map */}
      <StoreMap stores={filteredStores} />

      {/* Store List */}
      <StoreList
        stores={filteredStores}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  )
}
