'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Target, PackageCheck, PiggyBank, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STOCKOUT_RISKS, REORDER_RECOMMENDATIONS, PREDICTION_ACCURACY } from '@/lib/mock-data/ai-predictions'
import { StockoutRiskCard } from './stockout-risk-card'
import { DemandForecastChart } from './demand-forecast-chart'
import { ProductVelocity } from './product-velocity'
import { ReorderRecommendations } from './reorder-recommendations'

interface KPICardData {
  label: string
  value: string
  icon: typeof AlertTriangle
  color: string
  description: string
}

export function PredictiveDashboard() {
  const highRiskCount = STOCKOUT_RISKS.filter((r) => r.riskLevel === 'high').length
  const pendingReorders = REORDER_RECOMMENDATIONS.filter((r) => r.priority === 'urgent').length
  const potentialSavings = REORDER_RECOMMENDATIONS.reduce((sum, r) => sum + r.estimatedCost * 0.12, 0)

  const kpiCards: KPICardData[] = [
    {
      label: 'Productos en Riesgo',
      value: `${highRiskCount}`,
      icon: AlertTriangle,
      color: 'text-red-400',
      description: 'Stockout inminente',
    },
    {
      label: 'Precision Modelo',
      value: `${PREDICTION_ACCURACY.overall}%`,
      icon: Target,
      color: 'text-cbd-green',
      description: 'Ultima semana',
    },
    {
      label: 'Reordenes Pendientes',
      value: `${pendingReorders}`,
      icon: PackageCheck,
      color: 'text-amber-400',
      description: 'Accion urgente',
    },
    {
      label: 'Ahorro Potencial',
      value: `${Math.round(potentialSavings).toLocaleString()} EUR`,
      icon: PiggyBank,
      color: 'text-emerald-400',
      description: 'Optimizacion stock',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5"
      >
        <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
        <p className="text-xs text-amber-400/80">
          Las predicciones son estimaciones basadas en datos historicos. Los resultados reales pueden variar.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="glass border-cbd-green/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-cbd-gray uppercase tracking-wider">{kpi.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                      <p className="text-[10px] text-cbd-gray mt-0.5">{kpi.description}</p>
                    </div>
                    <div className={cn('h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center', kpi.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stockout Risk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <StockoutRiskCard limit={6} />
        </motion.div>

        {/* Demand Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <DemandForecastChart />
        </motion.div>
      </div>

      {/* Product Velocity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <ProductVelocity />
      </motion.div>

      {/* Reorder Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <ReorderRecommendations />
      </motion.div>
    </div>
  )
}
