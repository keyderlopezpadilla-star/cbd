'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Calendar,
  Filter,
  Store,
  BarChart3,
  X,
  ChevronDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface AnalyticsFilters {
  dateRange: '7d' | '30d' | '60d' | '90d' | 'custom'
  stores: string[]
  categories: string[]
  comparisonMode: boolean
}

export const defaultAnalyticsFilters: AnalyticsFilters = {
  dateRange: '30d',
  stores: [],
  categories: [],
  comparisonMode: false,
}

const DATE_RANGE_OPTIONS = [
  { value: '7d' as const, label: '7 dias' },
  { value: '30d' as const, label: '30 dias' },
  { value: '60d' as const, label: '60 dias' },
  { value: '90d' as const, label: '90 dias' },
]

const STORE_OPTIONS = [
  { id: '1', name: 'Madrid Centro' },
  { id: '2', name: 'Valencia Puerto' },
  { id: '3', name: 'Barcelona Gotico' },
  { id: '4', name: 'Alicante Marina' },
  { id: '5', name: 'Sevilla Triana' },
]

const CATEGORY_OPTIONS = [
  { value: 'oils', label: 'Aceites CBD' },
  { value: 'cosmetics', label: 'Cosmetica' },
  { value: 'flowers', label: 'Flores' },
  { value: 'capsules', label: 'Capsulas' },
  { value: 'creams', label: 'Cremas' },
  { value: 'wellness', label: 'Bienestar' },
  { value: 'accessories', label: 'Accesorios' },
]

interface AnalyticsFiltersBarProps {
  filters: AnalyticsFilters
  onFiltersChange: (filters: AnalyticsFilters) => void
}

export function AnalyticsFiltersBar({ filters, onFiltersChange }: AnalyticsFiltersBarProps) {
  const [showStoreDropdown, setShowStoreDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const handleDateRangeChange = (range: AnalyticsFilters['dateRange']) => {
    onFiltersChange({ ...filters, dateRange: range })
  }

  const toggleStore = (storeId: string) => {
    const newStores = filters.stores.includes(storeId)
      ? filters.stores.filter((s) => s !== storeId)
      : [...filters.stores, storeId]
    onFiltersChange({ ...filters, stores: newStores })
  }

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const toggleComparisonMode = () => {
    onFiltersChange({ ...filters, comparisonMode: !filters.comparisonMode })
  }

  const clearFilters = () => {
    onFiltersChange(defaultAnalyticsFilters)
  }

  const hasActiveFilters = filters.stores.length > 0 || filters.categories.length > 0

  return (
    <Card className="glass border-cbd-green/20 p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-cbd-green" />
          <div className="flex rounded-lg bg-black/30 border border-white/10 p-0.5">
            {DATE_RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDateRangeChange(option.value)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                  filters.dateRange === option.value
                    ? 'bg-cbd-green text-black'
                    : 'text-cbd-gray-light hover:text-white'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Store Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowStoreDropdown(!showStoreDropdown)
              setShowCategoryDropdown(false)
            }}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all',
              filters.stores.length > 0
                ? 'border-cbd-green/50 bg-cbd-green/10 text-cbd-green'
                : 'border-white/10 bg-black/30 text-cbd-gray-light hover:text-white'
            )}
          >
            <Store className="h-3.5 w-3.5" />
            <span>
              {filters.stores.length > 0
                ? `${filters.stores.length} tiendas`
                : 'Todas las tiendas'}
            </span>
            <ChevronDown className="h-3 w-3" />
          </button>

          <AnimatePresence>
            {showStoreDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 mt-1 z-50 w-52 rounded-lg border border-white/10 bg-[#1a1a2e] shadow-xl p-2"
              >
                {STORE_OPTIONS.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => toggleStore(store.id)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all',
                      filters.stores.includes(store.id)
                        ? 'bg-cbd-green/20 text-cbd-green'
                        : 'text-cbd-gray-light hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <div
                      className={cn(
                        'w-3.5 h-3.5 rounded border-2 flex items-center justify-center',
                        filters.stores.includes(store.id)
                          ? 'border-cbd-green bg-cbd-green'
                          : 'border-white/30'
                      )}
                    >
                      {filters.stores.includes(store.id) && (
                        <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                    {store.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown)
              setShowStoreDropdown(false)
            }}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all',
              filters.categories.length > 0
                ? 'border-cbd-green/50 bg-cbd-green/10 text-cbd-green'
                : 'border-white/10 bg-black/30 text-cbd-gray-light hover:text-white'
            )}
          >
            <Filter className="h-3.5 w-3.5" />
            <span>
              {filters.categories.length > 0
                ? `${filters.categories.length} categorias`
                : 'Categorias'}
            </span>
            <ChevronDown className="h-3 w-3" />
          </button>

          <AnimatePresence>
            {showCategoryDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 mt-1 z-50 w-48 rounded-lg border border-white/10 bg-[#1a1a2e] shadow-xl p-2"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => toggleCategory(cat.value)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all',
                      filters.categories.includes(cat.value)
                        ? 'bg-cbd-green/20 text-cbd-green'
                        : 'text-cbd-gray-light hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <div
                      className={cn(
                        'w-3.5 h-3.5 rounded border-2 flex items-center justify-center',
                        filters.categories.includes(cat.value)
                          ? 'border-cbd-green bg-cbd-green'
                          : 'border-white/30'
                      )}
                    >
                      {filters.categories.includes(cat.value) && (
                        <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Comparison Mode Toggle */}
        <button
          onClick={toggleComparisonMode}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all',
            filters.comparisonMode
              ? 'border-cbd-green/50 bg-cbd-green/10 text-cbd-green'
              : 'border-white/10 bg-black/30 text-cbd-gray-light hover:text-white'
          )}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Comparar</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-cbd-gray-light hover:text-white"
          >
            <X className="h-3 w-3 mr-1" />
            Limpiar
          </Button>
        )}

        {/* Active Filter Badges */}
        {filters.stores.length > 0 && (
          <div className="flex items-center gap-1 ml-2">
            {filters.stores.map((storeId) => {
              const store = STORE_OPTIONS.find((s) => s.id === storeId)
              return (
                <Badge
                  key={storeId}
                  variant="secondary"
                  className="bg-cbd-green/10 text-cbd-green border-cbd-green/30 text-[10px] px-2 py-0.5"
                >
                  {store?.name}
                  <button onClick={() => toggleStore(storeId)} className="ml-1">
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
