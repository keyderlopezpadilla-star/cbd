'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Users,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Database,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  CONSENT_RECORDS,
  DATA_REQUESTS,
  PRIVACY_POLICY_VERSIONS,
  RETENTION_RULES,
} from '@/lib/mock-data/gdpr'

export function GdprDashboard() {
  const totalConsents = CONSENT_RECORDS.length
  const fullConsents = CONSENT_RECORDS.filter(
    (r) => r.categories.analytics && r.categories.marketing && r.categories.personalization
  ).length
  const pendingRequests = DATA_REQUESTS.filter((r) => r.status === 'pending').length
  const currentPolicy = PRIVACY_POLICY_VERSIONS.find((p) => p.status === 'published')
  const autoDeleteRules = RETENTION_RULES.filter((r) => r.autoDelete).length

  // Compliance score based on various factors
  const complianceFactors = [
    currentPolicy !== undefined, // Has active policy
    pendingRequests <= 2, // Few pending requests
    autoDeleteRules > 0, // Has auto-delete rules
    CONSENT_RECORDS.length > 0, // Collecting consents
    RETENTION_RULES.length >= 5, // Comprehensive retention rules
  ]
  const complianceScore = Math.round(
    (complianceFactors.filter(Boolean).length / complianceFactors.length) * 100
  )

  const stats = [
    {
      label: 'Consentimientos Totales',
      value: totalConsents.toString(),
      icon: Users,
      color: 'text-cbd-green',
      bgColor: 'bg-cbd-green/10',
      subtitle: `${fullConsents} completos`,
    },
    {
      label: 'Solicitudes Pendientes',
      value: pendingRequests.toString(),
      icon: Clock,
      color: pendingRequests > 0 ? 'text-yellow-400' : 'text-cbd-green',
      bgColor: pendingRequests > 0 ? 'bg-yellow-400/10' : 'bg-cbd-green/10',
      subtitle: pendingRequests > 0 ? 'Requieren atencion' : 'Todo al dia',
    },
    {
      label: 'Politica Activa',
      value: currentPolicy ? `v${currentPolicy.version}` : 'N/A',
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      subtitle: currentPolicy ? `Desde ${currentPolicy.effectiveDate}` : 'Sin publicar',
    },
    {
      label: 'Puntuacion Cumplimiento',
      value: `${complianceScore}%`,
      icon: Shield,
      color: complianceScore >= 80 ? 'text-cbd-green' : 'text-yellow-400',
      bgColor: complianceScore >= 80 ? 'bg-cbd-green/10' : 'bg-yellow-400/10',
      subtitle: complianceScore >= 80 ? 'Buen estado' : 'Necesita mejoras',
    },
  ]

  const recentActivity = [
    {
      action: 'Consentimiento actualizado',
      user: 'Laura Diaz',
      date: '10 Feb 2024',
      type: 'consent',
    },
    {
      action: 'Solicitud de eliminacion',
      user: 'Diego Moreno',
      date: '10 Feb 2024',
      type: 'request',
    },
    {
      action: 'Borrador v2.2 creado',
      user: 'admin@cbdsaas.com',
      date: '10 Feb 2024',
      type: 'policy',
    },
    {
      action: 'Solicitud de exportacion',
      user: 'Javier Ruiz',
      date: '08 Feb 2024',
      type: 'request',
    },
    {
      action: 'Consentimiento actualizado',
      user: 'Ana Torres',
      date: '05 Feb 2024',
      type: 'consent',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
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
        {/* Compliance Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-cbd-green" />
                Estado de Cumplimiento RGPD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Puntuacion General</span>
                  <span className={cn('text-lg font-bold', complianceScore >= 80 ? 'text-cbd-green' : 'text-yellow-400')}>
                    {complianceScore}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${complianceScore}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={cn('h-full rounded-full', complianceScore >= 80 ? 'bg-cbd-green' : 'bg-yellow-400')}
                  />
                </div>
              </div>

              {/* Factors */}
              <div className="space-y-2">
                {[
                  { label: 'Politica de privacidad activa', passed: complianceFactors[0] },
                  { label: 'Solicitudes pendientes bajo control', passed: complianceFactors[1] },
                  { label: 'Auto-eliminacion configurada', passed: complianceFactors[2] },
                  { label: 'Recopilacion de consentimientos', passed: complianceFactors[3] },
                  { label: 'Reglas de retencion completas', passed: complianceFactors[4] },
                ].map((factor, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {factor.passed ? (
                      <CheckCircle className="h-4 w-4 text-cbd-green" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className={cn('text-sm', factor.passed ? 'text-foreground' : 'text-muted-foreground')}>
                      {factor.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-cbd-green" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3"
                >
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    activity.type === 'consent' ? 'bg-cbd-green/10' :
                    activity.type === 'request' ? 'bg-yellow-400/10' : 'bg-blue-400/10'
                  )}>
                    {activity.type === 'consent' ? (
                      <Users className="h-4 w-4 text-cbd-green" />
                    ) : activity.type === 'request' ? (
                      <Database className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <FileText className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
