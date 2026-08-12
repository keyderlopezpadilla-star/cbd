'use client'

import { motion } from 'framer-motion'
import { KPIGrid } from '@/features/dashboard/components/kpi-grid'
import { SalesChart } from '@/features/dashboard/components/sales-chart'
import { RevenueBarChart } from '@/features/dashboard/components/revenue-bar-chart'
import { StorePerformance } from '@/features/dashboard/components/store-performance'
import { RecentActivity } from '@/features/dashboard/components/recent-activity'
import { TopProducts } from '@/features/dashboard/components/top-products'
import { QuickActions } from '@/features/dashboard/components/quick-actions'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-cbd-gray-light mt-1">
          Overview of your franchise performance
        </p>
      </motion.div>

      {/* KPI Grid - 4 columns on large screens */}
      <KPIGrid />

      {/* Charts Row - Sales chart (2/3) + Revenue bar chart (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <RevenueBarChart />
        </div>
      </div>

      {/* Store Performance - Full width */}
      <StorePerformance />

      {/* Bottom Row - Recent Activity (1/2) + Top Products (1/2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <TopProducts />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}
