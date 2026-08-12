'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, LayoutGrid, AlertTriangle, PackageCheck, CalendarDays, Target, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PredictiveDashboard } from '@/features/ai/components/predictive-dashboard'
import { StockoutRiskCard } from '@/features/ai/components/stockout-risk-card'
import { ReorderRecommendations } from '@/features/ai/components/reorder-recommendations'
import { SeasonalTrends } from '@/features/ai/components/seasonal-trends'
import { PredictionAccuracy } from '@/features/ai/components/prediction-accuracy'
import { PREDICTION_ACCURACY } from '@/lib/mock-data/ai-predictions'

type TabId = 'overview' | 'stockout' | 'reorder' | 'trends'

interface Tab {
  id: TabId
  label: string
  icon: typeof LayoutGrid
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Vision General', icon: LayoutGrid },
  { id: 'stockout', label: 'Riesgo Stockout', icon: AlertTriangle },
  { id: 'reorder', label: 'Recomendaciones Reorden', icon: PackageCheck },
  { id: 'trends', label: 'Tendencias', icon: CalendarDays },
]

export default function AIPredictionsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.15)]">
            <BrainCircuit className="h-5 w-5 text-cbd-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Inventario Predictivo IA</h1>
            <p className="text-sm text-cbd-gray">Predicciones de demanda y optimizacion de stock</p>
          </div>
        </div>

        {/* Accuracy Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cbd-green/30 bg-cbd-green/5">
          <Target className="h-3.5 w-3.5 text-cbd-green" />
          <span className="text-[11px] text-cbd-green font-medium">
            Precision: {PREDICTION_ACCURACY.overall}%
          </span>
        </div>
      </motion.div>

      {/* Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5"
      >
        <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
        <p className="text-xs text-amber-400/80">
          Las predicciones son estimaciones basadas en datos historicos y modelos estadisticos. Los resultados reales pueden variar. Use el juicio profesional para decisiones finales.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-fit"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-cbd-green/10 text-cbd-green border border-cbd-green/20'
                  : 'text-cbd-gray hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && <PredictiveDashboard />}
        {activeTab === 'stockout' && (
          <div className="space-y-6">
            <StockoutRiskCard />
            <PredictionAccuracy />
          </div>
        )}
        {activeTab === 'reorder' && <ReorderRecommendations />}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <SeasonalTrends />
            <PredictionAccuracy />
          </div>
        )}
      </motion.div>
    </div>
  )
}
