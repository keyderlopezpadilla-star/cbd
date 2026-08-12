'use client'

import { Search, MapPin, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { StoreLocation } from '@/lib/mock-data/store-locator'

interface StoreLocatorFiltersProps {
  stores: StoreLocation[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCity: string | null
  onCityChange: (city: string | null) => void
  showOnlyOpen: boolean
  onToggleOpen: () => void
  selectedFeatures: string[]
  onToggleFeature: (feature: string) => void
}

export function StoreLocatorFilters({
  stores,
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  showOnlyOpen,
  onToggleOpen,
  selectedFeatures,
  onToggleFeature,
}: StoreLocatorFiltersProps) {
  // Extract unique cities and features
  const cities = Array.from(new Set(stores.map((s) => s.city)))
  const allFeatures = Array.from(new Set(stores.flatMap((s) => s.features)))

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar tienda por nombre o direccion..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Filtrar por ciudad
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCityChange(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              !selectedCity
                ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
                : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30'
            )}
          >
            Todas
          </button>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => onCityChange(selectedCity === city ? null : city)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                selectedCity === city
                  ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
                  : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30'
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Open Now Filter */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleOpen}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5',
            showOnlyOpen
              ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
              : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30'
          )}
        >
          <div className={cn('h-2 w-2 rounded-full', showOnlyOpen ? 'bg-cbd-green' : 'bg-white/30')} />
          Solo abiertas ahora
        </button>
      </div>

      {/* Feature Filters */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Filter className="h-3 w-3" />
          Filtrar por servicios
        </p>
        <div className="flex flex-wrap gap-1.5">
          {allFeatures.slice(0, 10).map((feature) => (
            <Badge
              key={feature}
              className={cn(
                'cursor-pointer text-[10px] transition-colors',
                selectedFeatures.includes(feature)
                  ? 'bg-cbd-green/20 text-cbd-green border-cbd-green/50'
                  : 'bg-black/20 text-muted-foreground border-white/10 hover:border-white/30'
              )}
              onClick={() => onToggleFeature(feature)}
            >
              {feature}
              {selectedFeatures.includes(feature) && <X className="h-2.5 w-2.5 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedCity || showOnlyOpen || selectedFeatures.length > 0) && (
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <span className="text-xs text-muted-foreground">Filtros activos:</span>
          <button
            onClick={() => {
              onCityChange(null)
              onSearchChange('')
              if (showOnlyOpen) onToggleOpen()
              selectedFeatures.forEach((f) => onToggleFeature(f))
            }}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Limpiar todos
          </button>
        </div>
      )}
    </div>
  )
}
