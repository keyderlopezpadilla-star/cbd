'use client'

import { motion } from 'framer-motion'
import { Bell, BellOff, AlertTriangle, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockNotifications } from '@/lib/mock-data/notifications'

const stats = [
  {
    label: 'Total Notificaciones',
    value: mockNotifications.length,
    icon: Bell,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    label: 'Sin Leer',
    value: mockNotifications.filter((n) => !n.read).length,
    icon: BellOff,
    color: 'text-cbd-green',
    bgColor: 'bg-cbd-green/10',
  },
  {
    label: 'Alertas esta Semana',
    value: mockNotifications.filter(
      (n) =>
        new Date(n.timestamp).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 &&
        (n.severity === 'high' || n.severity === 'critical')
    ).length,
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    label: 'Alertas Criticas',
    value: mockNotifications.filter((n) => n.severity === 'critical').length,
    icon: ShieldAlert,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
  },
]

export function NotificationStats() {
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
