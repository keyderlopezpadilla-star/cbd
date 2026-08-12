'use client'

import { motion } from 'framer-motion'
import { X, User, Globe, Monitor, Clock, Database, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type MockAuditLog, getActionLabel, getActionColor, getResultLabel, getResultColor } from '@/lib/mock-data/audit-logs'

interface AuditLogDetailProps {
  log: MockAuditLog
  onClose: () => void
}

export function AuditLogDetail({ log, onClose }: AuditLogDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-strong rounded-xl border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h3 className="text-lg font-semibold text-white">Detalle de Accion</h3>
            <p className="text-xs text-cbd-gray mt-0.5">ID: {log.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-cbd-black-secondary text-cbd-gray hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-5">
          {/* Main info */}
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              icon={<User className="h-4 w-4 text-blue-400" />}
              label="Usuario"
              value={log.userName}
              subValue={log.userRole}
            />
            <InfoItem
              icon={<Shield className={cn('h-4 w-4', getActionColor(log.action))} />}
              label="Accion"
              value={getActionLabel(log.action)}
              valueColor={getActionColor(log.action)}
            />
            <InfoItem
              icon={<Database className="h-4 w-4 text-purple-400" />}
              label="Recurso"
              value={log.resourceName}
              subValue={`${log.resource}${log.resourceId ? ` (${log.resourceId})` : ''}`}
            />
            <InfoItem
              icon={<Clock className="h-4 w-4 text-amber-400" />}
              label="Fecha y Hora"
              value={new Date(log.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
              subValue={new Date(log.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            />
            <InfoItem
              icon={<Globe className="h-4 w-4 text-emerald-400" />}
              label="Direccion IP"
              value={log.ipAddress}
            />
            <InfoItem
              icon={<Monitor className="h-4 w-4 text-cyan-400" />}
              label="Resultado"
              value={getResultLabel(log.result)}
              valueColor={getResultColor(log.result)}
            />
          </div>

          {/* User Agent */}
          <div>
            <p className="text-xs text-cbd-gray mb-1">User Agent</p>
            <p className="text-xs text-cbd-gray-light bg-cbd-black-secondary rounded-lg px-3 py-2 font-mono break-all">
              {log.userAgent}
            </p>
          </div>

          {/* Session */}
          <div>
            <p className="text-xs text-cbd-gray mb-1">Session ID</p>
            <p className="text-xs text-cbd-gray-light bg-cbd-black-secondary rounded-lg px-3 py-2 font-mono">
              {log.sessionId}
            </p>
          </div>

          {/* Store */}
          {log.storeName && (
            <div>
              <p className="text-xs text-cbd-gray mb-1">Tienda</p>
              <p className="text-sm text-white">{log.storeName}</p>
            </div>
          )}

          {/* Details JSON */}
          <div>
            <p className="text-xs text-cbd-gray mb-2">Detalles de la Accion</p>
            <div className="bg-cbd-black-secondary rounded-lg p-4 border border-white/5">
              <pre className="text-xs text-cbd-gray-light font-mono whitespace-pre-wrap break-all">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </div>
          </div>

          {/* Before/After for updates */}
          {log.details.before !== undefined && log.details.after !== undefined && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-red-400 mb-1">Valor Anterior</p>
                <div className="bg-red-400/5 border border-red-400/20 rounded-lg px-3 py-2">
                  <p className="text-sm text-white font-mono">{String(log.details.before)}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-cbd-green mb-1">Valor Nuevo</p>
                <div className="bg-cbd-green/5 border border-cbd-green/20 rounded-lg px-3 py-2">
                  <p className="text-sm text-white font-mono">{String(log.details.after)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function InfoItem({
  icon,
  label,
  value,
  subValue,
  valueColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  subValue?: string
  valueColor?: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-cbd-gray">{label}</p>
        <p className={cn('text-sm font-medium', valueColor || 'text-white')}>{value}</p>
        {subValue && <p className="text-[10px] text-cbd-gray">{subValue}</p>}
      </div>
    </div>
  )
}
