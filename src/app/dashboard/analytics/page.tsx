'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Store,
  Package,
  PieChart,
  Users,
  DollarSign,
  Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AnalyticsFiltersBar,
  defaultAnalyticsFilters,
  type AnalyticsFilters,
} from '@/features/analytics/components/analytics-filters'
import { TrendIndicators } from '@/features/analytics/components/trend-indicators'
import { SalesChart } from '@/features/analytics/components/sales-chart'
import { StoreComparison } from '@/features/analytics/components/store-comparison'
import { ProductPerformance } from '@/features/analytics/components/product-performance'
import { MarginAnalysis } from '@/features/analytics/components/margin-analysis'
import { EmployeePerformance } from '@/features/analytics/components/employee-performance'
import { RevenueBreakdown } from '@/features/analytics/components/revenue-breakdown'
import { AnalyticsExport } from '@/features/analytics/components/analytics-export'

type TabId = 'overview' | 'stores' | 'products' | 'margins' | 'employees' | 'revenue' | 'export'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'General', icon: BarChart3 },
  { id: 'stores', label: 'Tiendas', icon: Store },
  { id: 'products', label: 'Productos', icon: Package },
  { id: 'margins', label: 'Margenes', icon: PieChart },
  { id: 'employees', label: 'Empleados', icon: Users },
  { id: 'revenue', label: 'Ingresos', icon: DollarSign },
  { id: 'export', label: 'Exportar', icon: Download },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [filters, setFilters] = useState<AnalyticsFilters>(defaultAnalyticsFilters)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <TrendIndicators />
            <SalesChart filters={filters} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StoreComparison filters={{ stores: filters.stores }} />
              <RevenueBreakdown />
            </div>
          </div>
        )
      case 'stores':
        return <StoreComparison filters={{ stores: filters.stores }} />
      case 'products':
        return <ProductPerformance filters={{ categories: filters.categories }} />
      case 'margins':
        return <MarginAnalysis />
      case 'employees':
        return <EmployeePerformance filters={{ stores: filters.stores }} />
      case 'revenue':
        return <RevenueBreakdown />
      case 'export':
        return <AnalyticsExport />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Analiticas Avanzadas</h1>
            <p className="text-sm text-cbd-gray-light mt-1">
              Analisis detallado del rendimiento de ventas, tiendas y productos
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-cbd-gray-light">
            <div className="w-2 h-2 rounded-full bg-cbd-green animate-pulse" />
            Datos actualizados en tiempo real
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <AnalyticsFiltersBar filters={filters} onFiltersChange={setFilters} />

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-cbd-green/10 text-cbd-green border border-cbd-green/30'
                  : 'text-cbd-gray-light hover:text-white hover:bg-white/5 border border-transparent'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  )
}
