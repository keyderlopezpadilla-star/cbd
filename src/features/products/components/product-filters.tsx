'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

export interface ProductFilters {
  search: string
  category: string
  stockStatus: string
  activeFilter: string
  priceMin: string
  priceMax: string
}

interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
}

const defaultFilters: ProductFilters = {
  search: '',
  category: 'all',
  stockStatus: 'all',
  activeFilter: 'all',
  priceMin: '',
  priceMax: '',
}

export function ProductFiltersBar({ filters, onFiltersChange }: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (key: keyof ProductFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const handleReset = () => {
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.stockStatus !== 'all' ||
    filters.activeFilter !== 'all' ||
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.search !== ''

  return (
    <div className="space-y-4">
      {/* Search and toggle row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o SKU..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant={isExpanded ? 'secondary' : 'outline'}
          size="default"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cbd-green text-[10px] font-bold text-black">
              !
            </span>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-muted-foreground">
            <X className="h-3.5 w-3.5" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-border/50 bg-card/50 p-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Categoria</label>
            <Select value={filters.category} onValueChange={(v) => handleChange('category', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorias</SelectItem>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stock Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Estado Stock</label>
            <Select value={filters.stockStatus} onValueChange={(v) => handleChange('stockStatus', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Bajo</SelectItem>
                <SelectItem value="critical">Critico</SelectItem>
                <SelectItem value="out">Sin stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Estado</label>
            <Select value={filters.activeFilter} onValueChange={(v) => handleChange('activeFilter', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Min */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Precio min.</label>
            <Input
              type="number"
              placeholder="0"
              value={filters.priceMin}
              onChange={(e) => handleChange('priceMin', e.target.value)}
              min={0}
            />
          </div>

          {/* Price Max */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Precio max.</label>
            <Input
              type="number"
              placeholder="999"
              value={filters.priceMax}
              onChange={(e) => handleChange('priceMax', e.target.value)}
              min={0}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { defaultFilters }
