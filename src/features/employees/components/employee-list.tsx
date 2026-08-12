'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SortAsc, SortDesc } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserRole, DEMO_STORES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import {
  MOCK_EMPLOYEES,
  Employee,
  getEmployeeStatusColor,
  getEmployeeStatusLabel,
  getRoleLabel,
  getRoleColor,
} from '@/lib/mock-data/employees'
import Link from 'next/link'

type SortField = 'name' | 'performanceScore' | 'salesMetrics.totalRevenue' | 'hireDate'

export function EmployeeList() {
  const [search, setSearch] = useState('')
  const [storeFilter, setStoreFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('performanceScore')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filteredEmployees = useMemo(() => {
    let result = [...MOCK_EMPLOYEES]

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.storeName.toLowerCase().includes(q)
      )
    }

    // Store filter
    if (storeFilter !== 'all') {
      result = result.filter((e) => e.storeId === storeFilter)
    }

    // Role filter
    if (roleFilter !== 'all') {
      result = result.filter((e) => e.role === roleFilter)
    }

    // Sort
    result.sort((a, b) => {
      let valA: number | string
      let valB: number | string

      switch (sortField) {
        case 'name':
          valA = a.name
          valB = b.name
          break
        case 'performanceScore':
          valA = a.performanceScore
          valB = b.performanceScore
          break
        case 'salesMetrics.totalRevenue':
          valA = a.salesMetrics.totalRevenue
          valB = b.salesMetrics.totalRevenue
          break
        case 'hireDate':
          valA = a.hireDate.getTime()
          valB = b.hireDate.getTime()
          break
        default:
          return 0
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number)
    })

    return result
  }, [search, storeFilter, roleFilter, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function getPerformanceColor(score: number): string {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Lista de Empleados</CardTitle>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o tienda..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-[180px] bg-background/50 border-white/10">
                <SelectValue placeholder="Tienda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {DEMO_STORES.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value={UserRole.MANAGER}>Gerente</SelectItem>
                <SelectItem value={UserRole.EMPLOYEE}>Empleado</SelectItem>
                <SelectItem value={UserRole.MARKETING}>Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredEmployees.length} empleados encontrados
            </p>
            <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
              <SelectTrigger className="w-[180px] bg-background/50 border-white/10">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="performanceScore">Rendimiento</SelectItem>
                <SelectItem value="salesMetrics.totalRevenue">Ingresos</SelectItem>
                <SelectItem value="hireDate">Antiguedad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-white">
                      Empleado
                      {sortField === 'name' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Rol</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Tienda</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Estado</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('performanceScore')} className="flex items-center gap-1 hover:text-white ml-auto">
                      Rendimiento
                      {sortField === 'performanceScore' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('salesMetrics.totalRevenue')} className="flex items-center gap-1 hover:text-white ml-auto">
                      Ingresos
                      {sortField === 'salesMetrics.totalRevenue' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <Link href={`/dashboard/employees/${employee.id}`} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center">
                          <span className="text-xs font-medium text-cbd-green">
                            {employee.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getRoleColor(employee.role)}>
                        {getRoleLabel(employee.role)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-white">{employee.storeName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getEmployeeStatusColor(employee.status)}>
                        {getEmployeeStatusLabel(employee.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium ${getPerformanceColor(employee.performanceScore)}`}>
                        {employee.performanceScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-white">
                      {employee.salesMetrics.totalRevenue > 0 ? formatCurrency(employee.salesMetrics.totalRevenue) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron empleados con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
