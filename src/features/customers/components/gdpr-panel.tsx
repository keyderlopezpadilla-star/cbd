'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Download,
  Trash2,
  Mail,
  MessageSquare,
  Share2,
  BarChart3,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDateTime } from '@/lib/utils'
import {
  getCustomerGDPRConsent,
  getCustomerGDPRAudit,
  GDPRConsent,
  GDPRAuditEntry,
} from '@/lib/mock-data/customers'

interface GDPRPanelProps {
  customerId: string
}

export function GDPRPanel({ customerId }: GDPRPanelProps) {
  const consent = getCustomerGDPRConsent(customerId)
  const auditLog = getCustomerGDPRAudit(customerId)

  const [consents, setConsents] = useState<GDPRConsent | undefined>(consent)
  const [showEraseConfirm, setShowEraseConfirm] = useState(false)

  const toggleConsent = (field: keyof Pick<GDPRConsent, 'marketingEmail' | 'marketingSMS' | 'thirdPartySharing' | 'analytics'>) => {
    if (!consents) return
    setConsents({ ...consents, [field]: !consents[field], updatedAt: new Date() })
  }

  const consentItems = [
    {
      key: 'marketingEmail' as const,
      label: 'Email Marketing',
      description: 'Recibir ofertas y novedades por email',
      icon: Mail,
      enabled: consents?.marketingEmail ?? false,
    },
    {
      key: 'marketingSMS' as const,
      label: 'SMS Marketing',
      description: 'Recibir notificaciones y ofertas por SMS',
      icon: MessageSquare,
      enabled: consents?.marketingSMS ?? false,
    },
    {
      key: 'thirdPartySharing' as const,
      label: 'Compartir con Terceros',
      description: 'Permitir compartir datos con socios comerciales',
      icon: Share2,
      enabled: consents?.thirdPartySharing ?? false,
    },
    {
      key: 'analytics' as const,
      label: 'Analitica',
      description: 'Permitir uso de datos para mejora del servicio',
      icon: BarChart3,
      enabled: consents?.analytics ?? false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Consent Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-cbd-green" />
              <CardTitle className="text-sm text-white">Gestion de Consentimientos</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {consentItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConsent(item.key)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      item.enabled ? 'bg-cbd-green' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        item.enabled ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              )
            })}

            {consents && (
              <p className="text-xs text-muted-foreground mt-2">
                Ultima actualizacion: {formatDateTime(consents.updatedAt)} | IP: {consents.ipAddress}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-sm text-white">Acciones de Datos (GDPR)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-white/10 hover:border-cbd-green/50"
            >
              <Download className="h-4 w-4 text-cbd-green" />
              <div className="text-left">
                <p className="text-sm">Exportar Datos del Cliente</p>
                <p className="text-xs text-muted-foreground">
                  Descargar todos los datos personales en formato JSON
                </p>
              </div>
            </Button>

            <Separator className="bg-white/10" />

            {!showEraseConfirm ? (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10"
                onClick={() => setShowEraseConfirm(true)}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
                <div className="text-left">
                  <p className="text-sm text-red-400">Derecho al Olvido</p>
                  <p className="text-xs text-muted-foreground">
                    Eliminar permanentemente todos los datos del cliente
                  </p>
                </div>
              </Button>
            ) : (
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Confirmar Eliminacion</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Esta accion es irreversible. Se eliminaran todos los datos personales,
                  historial de compras y registros asociados a este cliente.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Confirmar Eliminacion
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEraseConfirm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Audit Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-sm text-white">Registro de Auditoria GDPR</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {auditLog.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay registros de auditoria para este cliente
              </p>
            ) : (
              <div className="space-y-3">
                {auditLog
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-white/5"
                    >
                      <Badge
                        variant="outline"
                        className={
                          entry.action.includes('REVOKED')
                            ? 'border-red-500/30 text-red-400'
                            : entry.action.includes('EXPORT') || entry.action.includes('ACCESS')
                            ? 'border-blue-500/30 text-blue-400'
                            : 'border-green-500/30 text-green-400'
                        }
                      >
                        {entry.action}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{entry.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Por: {entry.performedBy} | {formatDateTime(entry.date)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
