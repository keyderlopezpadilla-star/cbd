'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PREDICTION_ACCURACY } from '@/lib/mock-data/ai-predictions'

export function PredictionAccuracy() {
  const accuracy = PREDICTION_ACCURACY

  // Circular progress SVG
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (accuracy.overall / 100) * circumference

  const metrics = [
    {
      label: 'MAE (Error Absoluto Medio)',
      value: `${accuracy.mae} uds`,
      description: 'Desviacion media entre prediccion y valor real en unidades.',
      color: accuracy.mae < 3 ? 'text-cbd-green' : 'text-amber-400',
    },
    {
      label: 'MAPE (Error Porcentual Medio)',
      value: `${accuracy.mape}%`,
      description: 'Porcentaje medio de error respecto al valor real.',
      color: accuracy.mape < 15 ? 'text-cbd-green' : 'text-amber-400',
    },
    {
      label: 'R-Cuadrado',
      value: `${accuracy.rSquared}`,
      description: 'Proporcion de variabilidad explicada por el modelo (0-1). Valores mas cercanos a 1 indican mejor ajuste.',
      color: accuracy.rSquared > 0.85 ? 'text-cbd-green' : 'text-amber-400',
    },
  ]

  const lastUpdated = new Date(accuracy.lastUpdated)
  const formattedDate = lastUpdated.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base flex items-center gap-2">
          <Target className="h-4 w-4 text-cbd-green" />
          Precision del Modelo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circular Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <svg width="120" height="120" className="-rotate-90">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#00FF66"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">{accuracy.overall}%</span>
              <span className="text-[10px] text-cbd-gray">Precision</span>
            </div>
          </motion.div>

          {/* Metrics List */}
          <div className="flex-1 space-y-3 w-full">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="p-3 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cbd-gray">{metric.label}</span>
                  <span className={cn('text-sm font-semibold', metric.color)}>{metric.value}</span>
                </div>
                <p className="text-[10px] text-cbd-gray/60 mt-1">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
          <Clock className="h-3 w-3 text-cbd-gray" />
          <span className="text-[10px] text-cbd-gray">Ultima actualizacion: {formattedDate}</span>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
          <AlertCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-400/80 leading-relaxed">
            Estos modelos son estimaciones estadisticas. Use el juicio profesional para decisiones finales.
            La precision puede variar segun la categoria de producto, estacionalidad y eventos externos no contemplados en el modelo.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
