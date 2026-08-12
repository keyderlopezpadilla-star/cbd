'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { PlatformStatsCards } from '@/features/super-admin/components/platform-stats-cards'

const recentActivity = [
  { id: '1', action: 'Nueva organizacion registrada', entity: 'GreenLeaf CBD', time: 'Hace 2 horas', type: 'org' as const },
  { id: '2', action: 'Plan actualizado a BUSINESS', entity: 'CBD Valencia Store', time: 'Hace 4 horas', type: 'subscription' as const },
  { id: '3', action: 'Usuario suspendido', entity: 'user@spam.com', time: 'Hace 6 horas', type: 'user' as const },
  { id: '4', action: 'Alerta de uso AI excesivo', entity: 'CBD Express Madrid', time: 'Hace 8 horas', type: 'alert' as const },
  { id: '5', action: 'Nuevo usuario registrado', entity: 'maria@greenleaf.com', time: 'Hace 12 horas', type: 'user' as const },
]

const systemAlerts = [
  { id: '1', level: 'warning' as const, message: 'Alto uso de CPU en servidor de base de datos', time: 'Hace 15 min' },
  { id: '2', level: 'info' as const, message: '3 organizaciones acercandose al limite del plan FREE', time: 'Hace 1 hora' },
  { id: '3', level: 'error' as const, message: 'Fallo en servicio de email - reintentando', time: 'Hace 2 horas' },
]

export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cbd-green/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-cbd-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Panel Super Admin</h1>
            <p className="text-sm text-cbd-gray-light">
              Vista general de la plataforma y metricas del sistema
            </p>
          </div>
        </div>
      </motion.div>

      {/* Platform Stats */}
      <PlatformStatsCards />

      {/* Activity and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-2 shrink-0',
                    activity.type === 'org' && 'bg-blue-400',
                    activity.type === 'subscription' && 'bg-cbd-green',
                    activity.type === 'user' && 'bg-purple-400',
                    activity.type === 'alert' && 'bg-yellow-400'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-cbd-gray-light truncate">{activity.entity}</p>
                </div>
                <span className="text-xs text-cbd-gray-light whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Alertas del Sistema</h2>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'p-3 rounded-lg border',
                  alert.level === 'error' && 'bg-red-500/5 border-red-500/20',
                  alert.level === 'warning' && 'bg-yellow-500/5 border-yellow-500/20',
                  alert.level === 'info' && 'bg-blue-500/5 border-blue-500/20'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      'text-xs font-medium uppercase',
                      alert.level === 'error' && 'text-red-400',
                      alert.level === 'warning' && 'text-yellow-400',
                      alert.level === 'info' && 'text-blue-400'
                    )}
                  >
                    {alert.level}
                  </span>
                  <span className="text-xs text-cbd-gray-light">{alert.time}</span>
                </div>
                <p className="text-sm text-white">{alert.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
