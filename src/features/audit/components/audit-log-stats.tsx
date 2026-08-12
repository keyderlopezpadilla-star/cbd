'use client'

import { motion } from 'framer-motion'
import { Activity, Users, XCircle, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockAuditLogs } from '@/lib/mock-data/audit-logs'

const todayStart = new Date()
todayStart.setHours(0, 0, 0, 0)

const todayLogs = mockAuditLogs.filter(
  (log) => new Date(log.timestamp) >= todayStart
)

const uniqueUsers = new Set(mockAuditLogs.map((log) => log.userId)).size

const failedActions = mockAuditLogs.filter((log) => log.result === 'failure').length

const resourceCounts: Record<string, number> = {}
mockAuditLogs.forEach((log) => {
  resourceCounts[log.resource] = (resourceCounts[log.resource] || 0) + 1
})
const mostActiveResource = Object.entries(resourceCounts).sort((a, b) => b[1] - a[1])[0]

const stats = [
  {
    label: 'Acciones Hoy',
    value: todayLogs.length,
    icon: Activity,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    label: 'Usuarios Activos',
    value: uniqueUsers,
    icon: Users,
    color: 'text-cbd-green',
    bgColor: 'bg-cbd-green/10',
  },
  {
    label: 'Acciones Fallidas',
    value: failedActions,
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
  },
  {
    label: 'Recurso mas Activo',
    value: mostActiveResource ? mostActiveResource[0].charAt(0).toUpperCase() + mostActiveResource[0].slice(1) : '-',
    subtitle: mostActiveResource ? `${mostActiveResource[1]} acciones` : undefined,
    icon: Database,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
]

export function AuditLogStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-4 border border-white/5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-cbd-gray">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-[10px] text-cbd-gray mt-0.5">{stat.subtitle}</p>
              )}
            </div>
            <div className={cn('p-2.5 rounded-lg', stat.bgColor)}>
              <stat.icon className={cn('h-5 w-5', stat.color)} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
