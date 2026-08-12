'use client'

import { motion } from 'framer-motion'
import { Building2, CheckCircle, Star, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers'

const stats = [
  {
    label: 'Total Proveedores',
    value: MOCK_SUPPLIERS.length,
    icon: Building2,
    change: '+2 este mes',
    changeType: 'positive' as const,
  },
  {
    label: 'Proveedores Activos',
    value: MOCK_SUPPLIERS.filter((s) => s.status === 'ACTIVE').length,
    icon: CheckCircle,
    change: '83% del total',
    changeType: 'positive' as const,
  },
  {
    label: 'Rating Promedio',
    value: (MOCK_SUPPLIERS.reduce((acc, s) => acc + s.rating, 0) / MOCK_SUPPLIERS.length).toFixed(1),
    icon: Star,
    change: '+0.2 vs mes anterior',
    changeType: 'positive' as const,
  },
  {
    label: 'Pedidos Pendientes',
    value: MOCK_SUPPLIERS.reduce(
      (acc, s) => acc + s.orderHistory.filter((o) => o.status === 'PENDING' || o.status === 'IN_TRANSIT').length,
      0
    ),
    icon: Clock,
    change: '3 en transito',
    changeType: 'neutral' as const,
  },
]

export function SupplierStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/10">
                  <stat.icon className="h-5 w-5 text-cbd-green" />
                </div>
                <span
                  className={`text-xs ${
                    stat.changeType === 'positive'
                      ? 'text-green-400'
                      : stat.changeType === 'neutral'
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
