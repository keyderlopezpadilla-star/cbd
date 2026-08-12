'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileText,
  FlaskConical,
  Package,
  Calendar,
  Globe,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PRODUCT_COMPLIANCE_RECORDS, COMPLIANCE_DOCUMENTS } from '@/lib/mock-data/compliance'

export function ComplianceDashboard() {
  const totalProducts = PRODUCT_COMPLIANCE_RECORDS.length
  const compliantProducts = PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.compliant).length
  const nonCompliantProducts = totalProducts - compliantProducts
  const complianceRate = Math.round((compliantProducts / totalProducts) * 100)

  const expiringCerts = PRODUCT_COMPLIANCE_RECORDS.filter((p) => {
    const expiry = new Date(p.labCertificateExpiry)
    const now = new Date()
    const daysUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return daysUntilExpiry < 90 && daysUntilExpiry > 0
  })

  const outdatedDocs = COMPLIANCE_DOCUMENTS.filter((d) => d.status === 'outdated').length

  const stats = [
    {
      label: 'Tasa de Cumplimiento',
      value: `${complianceRate}%`,
      icon: Shield,
      color: complianceRate >= 80 ? 'text-cbd-green' : 'text-yellow-400',
      bgColor: complianceRate >= 80 ? 'bg-cbd-green/10' : 'bg-yellow-400/10',
      subtitle: `${compliantProducts}/${totalProducts} productos`,
    },
    {
      label: 'Productos No Conformes',
      value: nonCompliantProducts.toString(),
      icon: AlertTriangle,
      color: nonCompliantProducts > 0 ? 'text-red-400' : 'text-cbd-green',
      bgColor: nonCompliantProducts > 0 ? 'bg-red-400/10' : 'bg-cbd-green/10',
      subtitle: nonCompliantProducts > 0 ? 'Requieren revision' : 'Todo conforme',
    },
    {
      label: 'Certificados por Expirar',
      value: expiringCerts.length.toString(),
      icon: Clock,
      color: expiringCerts.length > 0 ? 'text-yellow-400' : 'text-cbd-green',
      bgColor: expiringCerts.length > 0 ? 'bg-yellow-400/10' : 'bg-cbd-green/10',
      subtitle: 'Proximos 90 dias',
    },
    {
      label: 'Documentos Desactualizados',
      value: outdatedDocs.toString(),
      icon: FileText,
      color: outdatedDocs > 0 ? 'text-orange-400' : 'text-cbd-green',
      bgColor: outdatedDocs > 0 ? 'bg-orange-400/10' : 'bg-cbd-green/10',
      subtitle: 'Necesitan actualizacion',
    },
  ]

  const recentAlerts = [
    {
      message: 'Certificado LAB-2024-004 expira en 30 dias',
      product: 'Capsulas CBD 25mg',
      severity: 'warning' as const,
      date: '15 Feb 2024',
    },
    {
      message: 'Producto no conforme detectado',
      product: 'Capsulas CBD 25mg',
      severity: 'error' as const,
      date: '12 Feb 2024',
    },
    {
      message: 'Regulacion de suplementos DE desactualizada',
      product: 'Documentacion',
      severity: 'info' as const,
      date: '10 Feb 2024',
    },
    {
      message: 'Nuevo certificado subido exitosamente',
      product: 'Balsamo CBD Deportivo',
      severity: 'success' as const,
      date: '05 Feb 2024',
    },
  ]

  const severityConfig = {
    warning: { color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', icon: Clock },
    error: { color: 'text-red-400', bgColor: 'bg-red-400/10', icon: AlertTriangle },
    info: { color: 'text-blue-400', bgColor: 'bg-blue-400/10', icon: FileText },
    success: { color: 'text-cbd-green', bgColor: 'bg-cbd-green/10', icon: CheckCircle },
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', stat.bgColor)}>
                      <Icon className={cn('h-5 w-5', stat.color)} />
                    </div>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={cn('text-xs mt-0.5', stat.color)}>{stat.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-cbd-green" />
                Estado de Cumplimiento CBD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cumplimiento General</span>
                  <span className={cn('text-lg font-bold', complianceRate >= 80 ? 'text-cbd-green' : 'text-yellow-400')}>
                    {complianceRate}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${complianceRate}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={cn('h-full rounded-full', complianceRate >= 80 ? 'bg-cbd-green' : 'bg-yellow-400')}
                  />
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Por Categoria Regulatoria</p>
                {[
                  { label: 'Novel Food', count: PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.regulatoryCategory === 'novel_food').length, compliant: PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.regulatoryCategory === 'novel_food' && p.compliant).length },
                  { label: 'Cosmeticos', count: PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.regulatoryCategory === 'cosmetics').length, compliant: PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.regulatoryCategory === 'cosmetics' && p.compliant).length },
                  { label: 'Materia Prima', count: PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.regulatoryCategory === 'raw_material').length, compliant: PRODUCT_COMPLIANCE_RECORDS.filter((p) => p.regulatoryCategory === 'raw_material' && p.compliant).length },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {cat.compliant}/{cat.count}
                      </span>
                      {cat.compliant === cat.count ? (
                        <CheckCircle className="h-4 w-4 text-cbd-green" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* THC Limits Reference */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-3 mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Limites THC por Region</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-foreground">EU: max 0.2%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-foreground">US: max 0.3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-foreground">UK: max 0.2%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-foreground">CH: max 1.0%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cbd-green" />
                Alertas y Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert, index) => {
                const config = severityConfig[alert.severity]
                const AlertIcon = config.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 p-3"
                  >
                    <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0', config.bgColor)}>
                      <AlertIcon className={cn('h-4 w-4', config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] border-white/20">
                          <Package className="h-2.5 w-2.5 mr-1" />
                          {alert.product}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{alert.date}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Upcoming Reviews */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Proximas Revisiones
                </p>
                <div className="space-y-2">
                  {PRODUCT_COMPLIANCE_RECORDS.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center justify-between text-xs">
                      <span className="text-foreground truncate">{product.productName}</span>
                      <span className="text-muted-foreground whitespace-nowrap ml-2">{product.nextReviewDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
