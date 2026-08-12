'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Employee } from '@/lib/mock-data/employees'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, ShoppingCart, Target, ThumbsUp } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'

interface EmployeePerformanceProps {
  employee: Employee
}

export function EmployeePerformance({ employee }: EmployeePerformanceProps) {
  const { salesMetrics } = employee

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
  const revenueData = salesMetrics.monthlyRevenue.map((revenue, idx) => ({
    month: months[idx],
    revenue,
    target: revenue * (1 + Math.random() * 0.2 - 0.1),
  }))

  const performanceMetrics = [
    {
      label: 'Ingresos Totales',
      value: formatCurrency(salesMetrics.totalRevenue),
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      label: 'Transacciones',
      value: salesMetrics.totalTransactions.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-blue-400',
    },
    {
      label: 'Ticket Medio',
      value: formatCurrency(salesMetrics.avgTicket),
      icon: Target,
      color: 'text-amber-400',
    },
    {
      label: 'Satisfaccion',
      value: salesMetrics.customerSatisfaction > 0 ? `${salesMetrics.customerSatisfaction}/5` : 'N/A',
      icon: ThumbsUp,
      color: 'text-purple-400',
    },
  ]

  const conversionData = [
    { name: 'Conversion', value: salesMetrics.conversionRate, fill: '#00FF66' },
    { name: 'No Conversion', value: 100 - salesMetrics.conversionRate, fill: '#1a1a2e' },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label} className="glass border-cbd-green/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-lg font-bold text-white">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Ingresos Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          {salesMetrics.totalRevenue > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid rgba(0, 255, 102, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Bar dataKey="revenue" fill="#00FF66" radius={[4, 4, 0, 0]} name="Ingresos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Este empleado no tiene datos de ventas</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Score & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-lg text-white">Score de Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={
                      employee.performanceScore >= 90
                        ? '#00FF66'
                        : employee.performanceScore >= 75
                        ? '#F59E0B'
                        : '#EF4444'
                    }
                    strokeWidth="12"
                    strokeDasharray={`${(employee.performanceScore / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-white">{employee.performanceScore}</span>
                  <span className="text-xs text-muted-foreground">de 100</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conversion</span>
                <span className="text-white">{salesMetrics.conversionRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items Vendidos</span>
                <span className="text-white">{salesMetrics.itemsSold.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Devoluciones</span>
                <span className="text-white">{salesMetrics.returnsHandled}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-lg text-white">Tendencia de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            {salesMetrics.totalRevenue > 0 ? (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a2e',
                        border: '1px solid rgba(0, 255, 102, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#00FF66"
                      strokeWidth={2}
                      dot={{ fill: '#00FF66', r: 4 }}
                      name="Ingresos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center">
                <p className="text-muted-foreground">Sin datos de ventas disponibles</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
