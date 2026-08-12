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

interface StoreFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  sortBy: string
  onSortByChange: (value: string) => void
}

export function StoreFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: StoreFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cbd-gray" />
        <Input
          placeholder="Buscar por nombre o ciudad..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-cbd-black/50 border-cbd-green/20 text-white placeholder:text-cbd-gray"
        />
      </div>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[160px] bg-cbd-black/50 border-cbd-green/20 text-white">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent className="bg-cbd-black border-cbd-green/20">
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="active">Activas</SelectItem>
          <SelectItem value="inactive">Inactivas</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger className="w-full sm:w-[180px] bg-cbd-black/50 border-cbd-green/20 text-white">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent className="bg-cbd-black border-cbd-green/20">
          <SelectItem value="name-asc">Nombre A-Z</SelectItem>
          <SelectItem value="name-desc">Nombre Z-A</SelectItem>
          <SelectItem value="sales-high">Ventas (Mayor)</SelectItem>
          <SelectItem value="sales-low">Ventas (Menor)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
