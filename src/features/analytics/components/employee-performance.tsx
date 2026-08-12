'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import { Users, ArrowUpDown, Medal } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { EMPLOYEE_PERFORMANCE_DATA, type EmployeePerformanceData } from '@/lib/mock-data/analytics'

type SortField = 'revenue' | 'salesCount' | 'avgTicket' | 'conversionRate' | 'revenuePerHour'

interface EmployeePerformanceProps {
  filters: {
    stores: string[]
  }
}

export function EmployeePerformance({ filters }: EmployeePerformanceProps) {
  const [sortField, setSortField] = useState<SortField>('revenue')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const filteredEmployees = useMemo(() => {
    if (filters.stores.length === 0) return EMPLOYEE_PERFORMANCE_DATA
    return EMPLOYEE_PERFORMANCE_DATA.filter((e) => filters.stores.includes(e.storeId))
  }, [filters.stores])

  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      return sortDirection === 'desc' ? bVal - aVal : aVal - bVal
    })
  }, [filteredEmployees, sortField, sortDirection])

  const chartData = useMemo(
    () =>
      [...filteredEmployees]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 8)
        .map((e) => ({
          name: e.name.split(' ')[0],
          revenue: e.revenue,
          salesCount: e.salesCount,
        })),
    [filteredEmployees]
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-amber-400'
      case 1: return 'text-gray-300'
      case 2: return 'text-orange-400'
      default: return 'text-transparent'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cbd-green" />
            <div>
              <CardTitle className="text-lg font-semibold text-white">
                Rendimiento de Empleados
              </CardTitle>
              <p className="text-xs text-cbd-gray-light mt-0.5">
                Metricas individuales de ventas y productividad
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bar Chart Ranking */}
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#888', fontSize: 10 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#888', fontSize: 11 }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Ingresos' : 'Ventas',
                  ]}
                />
                <Bar dataKey="revenue" fill="#00FF66" radius={[0, 4, 4, 0]} name="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-2 text-cbd-gray-light font-medium w-8">#</th>
                  <th className="text-left py-2 px-2 text-cbd-gray-light font-medium">Empleado</th>
                  <th className="text-left py-2 px-2 text-cbd-gray-light font-medium">Tienda</th>
                  <th className="text-right py-2 px-2">
                    <button
                      onClick={() => handleSort('salesCount')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'salesCount' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Ventas
                      <ArrowUpDown className="h-2.5 w-2.5" />
                    </button>
                  </th>
                  <th className="text-right py-2 px-2">
                    <button
                      onClick={() => handleSort('revenue')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'revenue' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Ingresos
                      <ArrowUpDown className="h-2.5 w-2.5" />
                    </button>
                  </th>
                  <th className="text-right py-2 px-2">
                    <button
                      onClick={() => handleSort('avgTicket')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'avgTicket' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Ticket
                      <ArrowUpDown className="h-2.5 w-2.5" />
                    </button>
                  </th>
                  <th className="text-right py-2 px-2">
                    <button
                      onClick={() => handleSort('conversionRate')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'conversionRate' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Conv.
                      <ArrowUpDown className="h-2.5 w-2.5" />
                    </button>
                  </th>
                  <th className="text-right py-2 px-2">
                    <button
                      onClick={() => handleSort('revenuePerHour')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'revenuePerHour' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      EUR/h
                      <ArrowUpDown className="h-2.5 w-2.5" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.map((employee, index) => (
                  <tr key={employee.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-2">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <Medal className={cn('h-4 w-4', getMedalColor(index))} />
                        ) : (
                          <span className="text-cbd-gray-light text-[10px] ml-0.5">{index + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-white font-medium">{employee.name}</td>
                    <td className="py-2.5 px-2">
                      <span className="text-cbd-gray-light text-[10px] bg-white/5 px-1.5 py-0.5 rounded">
                        {employee.storeName.split(' ')[0]}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-cbd-gray-light">{employee.salesCount}</td>
                    <td className="py-2.5 px-2 text-right text-white font-medium">
                      {formatCurrency(employee.revenue)}
                    </td>
                    <td className="py-2.5 px-2 text-right text-cbd-gray-light">
                      {formatCurrency(employee.avgTicket)}
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <span className={cn(
                        'font-medium',
                        employee.conversionRate >= 70 ? 'text-cbd-green' :
                        employee.conversionRate >= 60 ? 'text-amber-400' : 'text-red-400'
                      )}>
                        {employee.conversionRate}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-cbd-gray-light">
                      {formatCurrency(employee.revenuePerHour)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
