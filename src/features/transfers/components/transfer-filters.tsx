'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TransferStatus, DEMO_STORES } from '@/lib/constants'

export interface TransferFilters {
  search: string
  status: string
  fromStore: string
  toStore: string
}

export const defaultTransferFilters: TransferFilters = {
  search: '',
  status: 'all',
  fromStore: 'all',
  toStore: 'all',
}

interface TransferFiltersBarProps {
  filters: TransferFilters
  onFiltersChange: (filters: TransferFilters) => void
}

export function TransferFiltersBar({ filters, onFiltersChange }: TransferFiltersBarProps) {
  const updateFilter = (key: keyof TransferFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por numero de transferencia..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status}
        onValueChange={(value) => updateFilter('status', value)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value={TransferStatus.REQUESTED}>Solicitada</SelectItem>
          <SelectItem value={TransferStatus.APPROVED}>Aprobada</SelectItem>
          <SelectItem value={TransferStatus.PREPARING}>Preparando</SelectItem>
          <SelectItem value={TransferStatus.IN_TRANSIT}>En Transito</SelectItem>
          <SelectItem value={TransferStatus.RECEIVED}>Recibida</SelectItem>
          <SelectItem value={TransferStatus.CANCELLED}>Cancelada</SelectItem>
        </SelectContent>
      </Select>

      {/* Source Store Filter */}
      <Select
        value={filters.fromStore}
        onValueChange={(value) => updateFilter('fromStore', value)}
      >
        <SelectTrigger className="w-full sm:w-[170px]">
          <SelectValue placeholder="Tienda origen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas (origen)</SelectItem>
          {DEMO_STORES.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Destination Store Filter */}
      <Select
        value={filters.toStore}
        onValueChange={(value) => updateFilter('toStore', value)}
      >
        <SelectTrigger className="w-full sm:w-[170px]">
          <SelectValue placeholder="Tienda destino" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas (destino)</SelectItem>
          {DEMO_STORES.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
