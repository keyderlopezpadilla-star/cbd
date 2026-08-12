'use client'

import { useState, useMemo } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StockMovementHistory } from '@/features/inventory/components/stock-movement-history'
import { mockStockMovements } from '@/lib/mock-data/inventory'
import { DEMO_STORES } from '@/lib/constants'

export default function MovementsPage() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [storeFilter, setStoreFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredMovements = useMemo(() => {
    let result = [...mockStockMovements].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    if (typeFilter !== 'all') {
      result = result.filter((m) => m.type === typeFilter)
    }

    if (storeFilter !== 'all') {
      result = result.filter((m) => m.storeId === storeFilter)
    }

    if (search) {
      const s = search.toLowerCase()
      result = result.filter(
        (m) =>
          m.productName.toLowerCase().includes(s) ||
          m.performedBy.toLowerCase().includes(s)
      )
    }

    return result
  }, [typeFilter, storeFilter, search])

  const handleReset = () => {
    setTypeFilter('all')
    setStoreFilter('all')
    setSearch('')
  }

  const hasFilters = typeFilter !== 'all' || storeFilter !== 'all' || search !== ''

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/inventory">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Historial de Movimientos</h1>
          <p className="text-sm text-muted-foreground">
            Registro de todos los movimientos de stock ({filteredMovements.length} registros)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por producto o persona..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="restock">Reposicion</SelectItem>
            <SelectItem value="sale">Venta</SelectItem>
            <SelectItem value="adjustment">Ajuste</SelectItem>
            <SelectItem value="transfer">Transferencia</SelectItem>
          </SelectContent>
        </Select>
        <Select value={storeFilter} onValueChange={setStoreFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tienda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las tiendas</SelectItem>
            {DEMO_STORES.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-muted-foreground">
            <X className="h-3.5 w-3.5" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Movement History */}
      <StockMovementHistory movements={filteredMovements} />
    </div>
  )
}
