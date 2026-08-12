'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Employee,
  getEmployeeStatusColor,
  getEmployeeStatusLabel,
  getRoleLabel,
  getRoleColor,
} from '@/lib/mock-data/employees'
import { EmployeeSchedule } from './employee-schedule'
import { EmployeePerformance } from './employee-performance'
import Link from 'next/link'

interface EmployeeDetailProps {
  employee: Employee
}

type TabId = 'profile' | 'schedule' | 'performance'

export function EmployeeDetail({ employee }: EmployeeDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  const tabs: { id: TabId; label: string }[] = [
    { id: 'profile', label: 'Perfil' },
    { id: 'schedule', label: 'Horario' },
    { id: 'performance', label: 'Rendimiento' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/employees">
          <Button variant="outline" size="icon" className="border-white/10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center">
            <span className="text-lg font-bold text-cbd-green">{employee.avatar}</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
              <Badge variant="outline" className={getEmployeeStatusColor(employee.status)}>
                {getEmployeeStatusLabel(employee.status)}
              </Badge>
              <Badge variant="outline" className={getRoleColor(employee.role)}>
                {getRoleLabel(employee.role)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {employee.storeName} - {employee.department}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{employee.performanceScore}%</p>
          <p className="text-xs text-muted-foreground">Score Rendimiento</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === tab.id
                ? 'text-cbd-green border-cbd-green'
                : 'text-muted-foreground border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Contact Info */}
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Informacion de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">{employee.storeName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">Contratado: {formatDate(employee.hireDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">Salario: {formatCurrency(employee.salary)}/mes</span>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employee.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <Award className="h-4 w-4 text-cbd-green" />
                    <span className="text-sm text-white">{cert}</span>
                  </div>
                ))}
              </div>
              {employee.notes && (
                <div className="mt-4 p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-muted-foreground mb-1">Notas:</p>
                  <p className="text-sm text-white">{employee.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card className="glass border-cbd-green/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-white">Resumen de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">
                    {employee.salesMetrics.totalRevenue > 0 ? formatCurrency(employee.salesMetrics.totalRevenue) : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Ingresos Totales</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">
                    {employee.salesMetrics.totalTransactions > 0 ? employee.salesMetrics.totalTransactions : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Transacciones</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">
                    {employee.salesMetrics.avgTicket > 0 ? formatCurrency(employee.salesMetrics.avgTicket) : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Ticket Medio</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">
                    {employee.salesMetrics.conversionRate > 0 ? `${employee.salesMetrics.conversionRate}%` : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'schedule' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmployeeSchedule employee={employee} />
        </motion.div>
      )}

      {activeTab === 'performance' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmployeePerformance employee={employee} />
        </motion.div>
      )}
    </div>
  )
}
