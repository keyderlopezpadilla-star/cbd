'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PackageCheck, ArrowUpDown, CheckCircle } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { REORDER_RECOMMENDATIONS, type ReorderRecommendation } from '@/lib/mock-data/ai-predictions'

type SortField = 'priority' | 'date'

const priorityConfig = {
  urgent: {
    label: 'Urgente',
    color: 'text-red-400 bg-red-400/10 border-red-400/30',
  },
  normal: {
    label: 'Normal',
    color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  },
  low: {
    label: 'Bajo',
    color: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
  },
}

export function ReorderRecommendations() {
  const [sortField, setSortField] = useState<SortField>('priority')
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set())

  const sortedRecommendations = useMemo(() => {
    const priorityOrder = { urgent: 0, normal: 1, low: 2 }
    return [...REORDER_RECOMMENDATIONS].sort((a, b) => {
      if (sortField === 'priority') {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      // Sort by date (Hoy first, then Manana, etc.)
      const dateOrder: Record<string, number> = { Hoy: 0, Manana: 1 }
      const aOrder = (dateOrder[a.optimalOrderDate] ?? parseInt(a.optimalOrderDate)) || 99
      const bOrder = (dateOrder[b.optimalOrderDate] ?? parseInt(b.optimalOrderDate)) || 99
      return aOrder - bOrder
    })
  }, [sortField])

  const totalCost = REORDER_RECOMMENDATIONS
    .filter((r) => r.suggestedQuantity > 0)
    .reduce((sum, r) => sum + r.estimatedCost, 0)

  const handleApprove = (productId: string) => {
    setApprovedIds((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      return next
    })
  }

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <PackageCheck className="h-4 w-4 text-cbd-green" />
            Recomendaciones de Reorden
          </CardTitle>
          <button
            onClick={() => setSortField(sortField === 'priority' ? 'date' : 'priority')}
            className="flex items-center gap-1 text-[10px] text-cbd-gray hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
          >
            <ArrowUpDown className="h-3 w-3" />
            {sortField === 'priority' ? 'Por prioridad' : 'Por fecha'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Producto</th>
                <th className="text-center text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Stock</th>
                <th className="text-center text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Demanda 30d</th>
                <th className="text-center text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Sugerido</th>
                <th className="text-center text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Fecha</th>
                <th className="text-left text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Proveedor</th>
                <th className="text-right text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Coste</th>
                <th className="text-center text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Prioridad</th>
                <th className="text-center text-[10px] text-cbd-gray uppercase tracking-wider py-2 px-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecommendations.map((rec, i) => {
                const config = priorityConfig[rec.priority]
                const isApproved = approvedIds.has(rec.productId)
                return (
                  <motion.tr
                    key={rec.productId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className={cn(
                      'border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors',
                      isApproved && 'opacity-60'
                    )}
                  >
                    <td className="py-2.5 px-2">
                      <p className="text-xs text-white font-medium truncate max-w-[160px]">{rec.productName}</p>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={cn('text-xs', rec.currentStock <= 5 ? 'text-red-400 font-medium' : 'text-white')}>
                        {rec.currentStock}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="text-xs text-white">{rec.predictedDemand30d}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="text-xs text-cbd-green font-medium">
                        {rec.suggestedQuantity > 0 ? rec.suggestedQuantity : '-'}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={cn('text-xs', rec.optimalOrderDate === 'Hoy' ? 'text-red-400 font-medium' : 'text-cbd-gray')}>
                        {rec.optimalOrderDate}
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="text-xs text-cbd-gray truncate max-w-[120px] block">{rec.supplier}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <span className="text-xs text-white font-medium">
                        {rec.estimatedCost > 0 ? formatCurrency(rec.estimatedCost) : '-'}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', config.color)}>
                        {config.label}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {rec.suggestedQuantity > 0 && (
                        <button
                          onClick={() => handleApprove(rec.productId)}
                          className={cn(
                            'text-[10px] px-2 py-1 rounded-md border transition-all',
                            isApproved
                              ? 'border-cbd-green/40 bg-cbd-green/10 text-cbd-green'
                              : 'border-white/10 text-cbd-gray hover:border-cbd-green/30 hover:text-white'
                          )}
                        >
                          {isApproved ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Aprobado
                            </span>
                          ) : (
                            'Aprobar Pedido'
                          )}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-xs text-cbd-gray">
              {approvedIds.size} de {REORDER_RECOMMENDATIONS.filter((r) => r.suggestedQuantity > 0).length} aprobados
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-cbd-gray">Coste total estimado</p>
            <p className="text-lg font-bold text-white">{formatCurrency(totalCost)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
