'use client'

import { Star, Truck, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Supplier } from '@/lib/mock-data/suppliers'

interface SupplierEvaluationProps {
  supplier: Supplier
}

export function SupplierEvaluation({ supplier }: SupplierEvaluationProps) {
  const metrics = [
    {
      label: 'Puntualidad Entregas',
      value: supplier.onTimeDeliveryRate,
      icon: Truck,
      color: supplier.onTimeDeliveryRate >= 90 ? 'text-green-400' : supplier.onTimeDeliveryRate >= 80 ? 'text-amber-400' : 'text-red-400',
      barColor: supplier.onTimeDeliveryRate >= 90 ? 'bg-green-400' : supplier.onTimeDeliveryRate >= 80 ? 'bg-amber-400' : 'bg-red-400',
    },
    {
      label: 'Calidad del Producto',
      value: (supplier.qualityScore / 5) * 100,
      icon: CheckCircle,
      color: supplier.qualityScore >= 4.5 ? 'text-green-400' : supplier.qualityScore >= 3.5 ? 'text-amber-400' : 'text-red-400',
      barColor: supplier.qualityScore >= 4.5 ? 'bg-green-400' : supplier.qualityScore >= 3.5 ? 'bg-amber-400' : 'bg-red-400',
    },
    {
      label: 'Tiempo de Respuesta',
      value: supplier.leadTimeDays <= 5 ? 95 : supplier.leadTimeDays <= 10 ? 75 : 55,
      icon: Clock,
      color: supplier.leadTimeDays <= 5 ? 'text-green-400' : supplier.leadTimeDays <= 10 ? 'text-amber-400' : 'text-red-400',
      barColor: supplier.leadTimeDays <= 5 ? 'bg-green-400' : supplier.leadTimeDays <= 10 ? 'bg-amber-400' : 'bg-red-400',
    },
    {
      label: 'Consistencia',
      value: Math.min(100, supplier.totalOrders * 2.5),
      icon: TrendingUp,
      color: supplier.totalOrders >= 30 ? 'text-green-400' : supplier.totalOrders >= 15 ? 'text-amber-400' : 'text-red-400',
      barColor: supplier.totalOrders >= 30 ? 'bg-green-400' : supplier.totalOrders >= 15 ? 'bg-amber-400' : 'bg-red-400',
    },
  ]

  const overallScore = (
    (supplier.onTimeDeliveryRate / 100) * 0.3 +
    (supplier.qualityScore / 5) * 0.35 +
    (supplier.leadTimeDays <= 5 ? 0.95 : supplier.leadTimeDays <= 10 ? 0.75 : 0.55) * 0.2 +
    (Math.min(100, supplier.totalOrders * 2.5) / 100) * 0.15
  ) * 5

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Evaluacion General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 ${
                      i < Math.floor(supplier.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : i < supplier.rating
                        ? 'text-amber-400 fill-amber-400/50'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-3xl font-bold text-white">{supplier.rating.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Rating del Proveedor</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cbd-green">{overallScore.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Score Ponderado</p>
              <p className="text-xs text-muted-foreground mt-1">
                (Puntualidad 30%, Calidad 35%, Respuesta 20%, Consistencia 15%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Metricas Detalladas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm text-white">{metric.label}</span>
                </div>
                <span className={`text-sm font-medium ${metric.color}`}>
                  {metric.value.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${metric.barColor} transition-all duration-500`}
                  style={{ width: `${Math.min(100, metric.value)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supplier.onTimeDeliveryRate < 90 && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-400">
                  La tasa de entrega puntual esta por debajo del 90%. Considerar negociar penalizaciones por retraso.
                </p>
              </div>
            )}
            {supplier.qualityScore >= 4.5 && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-400">
                  Excelente calidad de producto. Candidato a proveedor preferente o acuerdo a largo plazo.
                </p>
              </div>
            )}
            {supplier.leadTimeDays > 10 && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-400">
                  Lead time superior a 10 dias. Planificar pedidos con mayor anticipacion o buscar alternativa local.
                </p>
              </div>
            )}
            {supplier.rating >= 4.5 && supplier.onTimeDeliveryRate >= 95 && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-400">
                  Proveedor de alto rendimiento. Considerar incrementar volumen de pedidos o exclusividad.
                </p>
              </div>
            )}
            {supplier.status === 'PENDING' && (
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-blue-400">
                  Proveedor en evaluacion. Completar periodo de prueba antes de aumentar volumen.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
