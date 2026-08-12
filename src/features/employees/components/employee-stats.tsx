'use client'

import { motion } from 'framer-motion'
import { Users, UserCheck, TrendingUp, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MOCK_EMPLOYEES } from '@/lib/mock-data/employees'
import { formatCurrency } from '@/lib/utils'

const activeEmployees = MOCK_EMPLOYEES.filter((e) => e.status === 'ACTIVE')
const topPerformer = MOCK_EMPLOYEES.reduce((best, emp) =>
  emp.performanceScore > best.performanceScore ? emp : best
, MOCK_EMPLOYEES[0])
const avgPerformance = Math.round(
  activeEmployees.reduce((acc, e) => acc + e.performanceScore, 0) / activeEmployees.length
)

const stats = [
  {
    label: 'Total Empleados',
    value: MOCK_EMPLOYEES.length,
    icon: Users,
    change: '+2 este trimestre',
    changeType: 'positive' as const,
  },
  {
    label: 'Activos Hoy',
    value: activeEmployees.length,
    icon: UserCheck,
    change: `${Math.round((activeEmployees.length / MOCK_EMPLOYEES.length) * 100)}% plantilla`,
    changeType: 'positive' as const,
  },
  {
    label: 'Rendimiento Promedio',
    value: `${avgPerformance}%`,
    icon: TrendingUp,
    change: '+3% vs mes anterior',
    changeType: 'positive' as const,
  },
  {
    label: 'Top Performer',
    value: topPerformer.name.split(' ')[0],
    icon: Award,
    change: `${topPerformer.performanceScore}% score`,
    changeType: 'positive' as const,
  },
]

export function EmployeeStats() {
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
