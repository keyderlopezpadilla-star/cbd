'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Store, CreditCard, Brain, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Organizaciones', value: '12', change: '+2', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Usuarios Totales', value: '847', change: '+34', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Tiendas Activas', value: '45', change: '+3', icon: Store, color: 'text-cbd-green', bg: 'bg-cbd-green/10' },
  { label: 'MRR', value: '€24,500', change: '+12%', icon: CreditCard, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Consultas IA', value: '3,241', change: '+18%', icon: Brain, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { label: 'Crecimiento', value: '+15%', change: 'MoM', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
]

export function PlatformStatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-4"
          >
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-xs text-cbd-gray-light mt-1">{stat.label}</p>
            <span className="text-xs text-cbd-green">{stat.change}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
