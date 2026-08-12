'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download, FileText, FileSpreadsheet, File, Check, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type ExportFormat = 'pdf' | 'csv' | 'excel'

interface ExportMetric {
  id: string
  label: string
  checked: boolean
}

const EXPORT_FORMATS: { value: ExportFormat; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'pdf', label: 'PDF', icon: FileText, description: 'Informe visual con graficos' },
  { value: 'csv', label: 'CSV', icon: File, description: 'Datos tabulares simples' },
  { value: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Multiples hojas con formulas' },
]

const DEFAULT_METRICS: ExportMetric[] = [
  { id: 'revenue', label: 'Ingresos totales', checked: true },
  { id: 'orders', label: 'Numero de pedidos', checked: true },
  { id: 'avgTicket', label: 'Ticket medio', checked: true },
  { id: 'margins', label: 'Margenes por categoria', checked: true },
  { id: 'storeComparison', label: 'Comparacion de tiendas', checked: false },
  { id: 'productPerformance', label: 'Rendimiento de productos', checked: false },
  { id: 'employeeMetrics', label: 'Metricas de empleados', checked: false },
  { id: 'channelBreakdown', label: 'Desglose por canal', checked: false },
]

const DATE_RANGES = [
  { value: '7d', label: 'Ultimos 7 dias' },
  { value: '30d', label: 'Ultimos 30 dias' },
  { value: '60d', label: 'Ultimos 60 dias' },
  { value: '90d', label: 'Ultimos 90 dias' },
]

export function AnalyticsExport() {
  const [format, setFormat] = useState<ExportFormat>('pdf')
  const [dateRange, setDateRange] = useState('30d')
  const [metrics, setMetrics] = useState(DEFAULT_METRICS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const toggleMetric = (id: string) => {
    setMetrics(
      metrics.map((m) => (m.id === id ? { ...m, checked: !m.checked } : m))
    )
  }

  const selectedCount = metrics.filter((m) => m.checked).length

  const handleGenerate = () => {
    setIsGenerating(true)
    setIsGenerated(false)
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-cbd-green" />
            <div>
              <CardTitle className="text-lg font-semibold text-white">
                Exportar Informe
              </CardTitle>
              <p className="text-xs text-cbd-gray-light mt-0.5">
                Genera un informe personalizado de analiticas
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-cbd-gray-light">Formato</label>
            <div className="grid grid-cols-3 gap-3">
              {EXPORT_FORMATS.map((f) => {
                const Icon = f.icon
                return (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f.value)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-lg border transition-all',
                      format === f.value
                        ? 'border-cbd-green bg-cbd-green/10 text-cbd-green'
                        : 'border-white/10 bg-black/20 text-cbd-gray-light hover:border-white/20 hover:text-white'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{f.label}</span>
                    <span className="text-[9px] text-center opacity-70">{f.description}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-cbd-gray-light">Periodo</label>
            <div className="flex rounded-lg bg-black/30 border border-white/10 p-0.5 w-fit">
              {DATE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setDateRange(range.value)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                    dateRange === range.value
                      ? 'bg-cbd-green text-black'
                      : 'text-cbd-gray-light hover:text-white'
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics to Include */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-cbd-gray-light">
                Metricas a incluir
              </label>
              <span className="text-[10px] text-cbd-green">
                {selectedCount} seleccionadas
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all text-left',
                    metric.checked
                      ? 'border-cbd-green/40 bg-cbd-green/5 text-white'
                      : 'border-white/10 bg-black/20 text-cbd-gray-light hover:border-white/20'
                  )}
                >
                  <div
                    className={cn(
                      'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0',
                      metric.checked
                        ? 'border-cbd-green bg-cbd-green'
                        : 'border-white/30'
                    )}
                  >
                    {metric.checked && (
                      <Check className="w-2.5 h-2.5 text-black" />
                    )}
                  </div>
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || selectedCount === 0}
              className={cn(
                'flex-1 bg-cbd-green text-black font-medium hover:bg-cbd-green/90 transition-all',
                isGenerating && 'opacity-70'
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : isGenerated ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Descargar {format.toUpperCase()}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generar Informe
                </>
              )}
            </Button>
          </div>

          {/* Generated notification */}
          <AnimatePresence>
            {isGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cbd-green/10 border border-cbd-green/30"
              >
                <Check className="h-4 w-4 text-cbd-green" />
                <span className="text-xs text-cbd-green">
                  Informe generado correctamente. Listo para descargar.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
