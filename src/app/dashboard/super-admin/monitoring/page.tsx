'use client'

import { motion } from 'framer-motion'
import { Activity, Database, Cpu, HardDrive, Users, Clock } from 'lucide-react'
import { SystemHealthChart } from '@/features/super-admin/components/system-health-chart'

const systemMetrics = [
  { label: 'Uptime', value: '99.97%', icon: Clock, color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Base de Datos', value: '2.4 GB', icon: Database, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'CPU Usage', value: '34%', icon: Cpu, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Memoria', value: '67%', icon: HardDrive, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Sesiones Activas', value: '1,247', icon: Users, color: 'text-cbd-green', bg: 'bg-cbd-green/10' },
  { label: 'Tiempo Respuesta', value: '145ms', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-500/10' },
]

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Monitoring del Sistema</h1>
            <p className="text-sm text-cbd-gray-light">
              Estado de salud, rendimiento y recursos del sistema
            </p>
          </div>
        </div>
      </motion.div>

      {/* System Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {systemMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-4"
            >
              <div className={`w-8 h-8 rounded-lg ${metric.bg} flex items-center justify-center mb-3`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
              <p className="text-lg font-bold text-white">{metric.value}</p>
              <p className="text-xs text-cbd-gray-light mt-1">{metric.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <SystemHealthChart />
      </motion.div>
    </div>
  )
}
