'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Customer } from '@/types'
import { LoyaltyTier, DEMO_STORES } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  MOCK_CUSTOMERS,
  CustomerSegment,
  getCustomerSegment,
  getSegmentLabel,
  getSegmentColor,
} from '@/lib/mock-data/customers'
import { CustomerCard } from './customer-card'
import Link from 'next/link'

type SortField = 'name' | 'totalSpent' | 'totalPurchases' | 'lastPurchase' | 'createdAt'
type ViewMode = 'grid' | 'table'

export function CustomerList() {
  const [search, setSearch] = useState('')
  const [segmentFilter, setSegmentFilter] = useState<string>('all')
  const [tierFilter, setTierFilter] = useState<string>('all')
  const [storeFilter, setStoreFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('totalSpent')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  const filteredCustomers = useMemo(() => {
    let result = [...MOCK_CUSTOMERS]

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.phone && c.phone.includes(q))
      )
    }

    // Segment filter
    if (segmentFilter !== 'all') {
      result = result.filter((c) => getCustomerSegment(c) === segmentFilter)
    }

    // Tier filter
    if (tierFilter !== 'all') {
      result = result.filter((c) => c.loyaltyTier === tierFilter)
    }

    // Store filter
    if (storeFilter !== 'all') {
      result = result.filter((c) => c.preferredStoreId === storeFilter)
    }

    // Sort
    result.sort((a, b) => {
      let valA: number | string | Date | null
      let valB: number | string | Date | null

      switch (sortField) {
        case 'name':
          valA = a.name
          valB = b.name
          break
        case 'totalSpent':
          valA = a.totalSpent
          valB = b.totalSpent
          break
        case 'totalPurchases':
          valA = a.totalPurchases
          valB = b.totalPurchases
          break
        case 'lastPurchase':
          valA = a.lastPurchase?.getTime() ?? 0
          valB = b.lastPurchase?.getTime() ?? 0
          break
        case 'createdAt':
          valA = a.createdAt.getTime()
          valB = b.createdAt.getTime()
          break
        default:
          return 0
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      const numA = valA as number
      const numB = valB as number
      return sortDir === 'asc' ? numA - numB : numB - numA
    })

    return result
  }, [search, segmentFilter, tierFilter, storeFilter, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function getTierBadgeColor(tier: LoyaltyTier): string {
    switch (tier) {
      case LoyaltyTier.BLACK: return 'bg-gray-900 text-white border-gray-600'
      case LoyaltyTier.VIP: return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case LoyaltyTier.PREMIUM: return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <CardTitle className="text-lg text-white">Lista de Clientes</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode('table')}
                className={viewMode === 'table' ? 'border-cbd-green/50 text-cbd-green' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'border-cbd-green/50 text-cbd-green' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o telefono..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                <SelectValue placeholder="Segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="NEW">Nuevos</SelectItem>
                <SelectItem value="RECURRING">Recurrentes</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="INACTIVE">Inactivos</SelectItem>
                <SelectItem value="HIGH_VALUE">Alto Valor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[150px] bg-background/50 border-white/10">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value={LoyaltyTier.STARTER}>Starter</SelectItem>
                <SelectItem value={LoyaltyTier.PREMIUM}>Premium</SelectItem>
                <SelectItem value={LoyaltyTier.VIP}>VIP</SelectItem>
                <SelectItem value={LoyaltyTier.BLACK}>Black</SelectItem>
              </SelectContent>
            </Select>
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-[180px] bg-background/50 border-white/10">
                <SelectValue placeholder="Tienda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {DEMO_STORES.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredCustomers.length} clientes encontrados
            </p>
            <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
              <SelectTrigger className="w-[180px] bg-background/50 border-white/10">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="totalSpent">Total Gastado</SelectItem>
                <SelectItem value="totalPurchases">Compras</SelectItem>
                <SelectItem value="lastPurchase">Ultima Compra</SelectItem>
                <SelectItem value="createdAt">Fecha Registro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCustomers.map((customer, idx) => (
                <CustomerCard key={customer.id} customer={customer} index={idx} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                      <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-white">
                        Cliente
                        {sortField === 'name' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Segmento</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Tier</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                      <button onClick={() => toggleSort('totalPurchases')} className="flex items-center gap-1 hover:text-white ml-auto">
                        Compras
                        {sortField === 'totalPurchases' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                      </button>
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                      <button onClick={() => toggleSort('totalSpent')} className="flex items-center gap-1 hover:text-white ml-auto">
                        Total Gastado
                        {sortField === 'totalSpent' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                      </button>
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                      <button onClick={() => toggleSort('lastPurchase')} className="flex items-center gap-1 hover:text-white ml-auto">
                        Ultima Compra
                        {sortField === 'lastPurchase' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => {
                    const segment = getCustomerSegment(customer)
                    return (
                      <tr key={customer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <Link href={`/dashboard/customers/${customer.id}`} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center">
                              <span className="text-xs font-medium text-cbd-green">
                                {customer.name.split(' ').map((n) => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{customer.name}</p>
                              <p className="text-xs text-muted-foreground">{customer.email}</p>
                            </div>
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getSegmentColor(segment)}>
                            {getSegmentLabel(segment)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getTierBadgeColor(customer.loyaltyTier)}>
                            {customer.loyaltyTier}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right text-sm text-white">
                          {customer.totalPurchases}
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-medium text-white">
                          {formatCurrency(customer.totalSpent)}
                        </td>
                        <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                          {customer.lastPurchase ? formatDate(customer.lastPurchase) : 'Nunca'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron clientes con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
