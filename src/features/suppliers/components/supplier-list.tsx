'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SortAsc, SortDesc, Star } from 'lucide-react'
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
import { formatCurrency } from '@/lib/utils'
import {
  MOCK_SUPPLIERS,
  Supplier,
  SupplierStatus,
  getSupplierStatusColor,
  getSupplierStatusLabel,
} from '@/lib/mock-data/suppliers'
import Link from 'next/link'

type SortField = 'name' | 'rating' | 'totalOrders' | 'totalSpent' | 'onTimeDeliveryRate'

export function SupplierList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('rating')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filteredSuppliers = useMemo(() => {
    let result = [...MOCK_SUPPLIERS]

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.company.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter)
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter)
      result = result.filter((s) => s.rating >= minRating)
    }

    // Sort
    result.sort((a, b) => {
      const valA = a[sortField]
      const valB = b[sortField]

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number)
    })

    return result
  }, [search, statusFilter, ratingFilter, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function renderStars(rating: number) {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Lista de Proveedores</CardTitle>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, empresa, email o ciudad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-background/50 border-white/10">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ACTIVE">Activo</SelectItem>
                <SelectItem value="INACTIVE">Inactivo</SelectItem>
                <SelectItem value="PENDING">Pendiente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[150px] bg-background/50 border-white/10">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="4.5">4.5+ Estrellas</SelectItem>
                <SelectItem value="4.0">4.0+ Estrellas</SelectItem>
                <SelectItem value="3.5">3.5+ Estrellas</SelectItem>
                <SelectItem value="3.0">3.0+ Estrellas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredSuppliers.length} proveedores encontrados
            </p>
            <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
              <SelectTrigger className="w-[180px] bg-background/50 border-white/10">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="totalOrders">Pedidos</SelectItem>
                <SelectItem value="totalSpent">Total Compras</SelectItem>
                <SelectItem value="onTimeDeliveryRate">Puntualidad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-white">
                      Proveedor
                      {sortField === 'name' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Estado</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('rating')} className="flex items-center gap-1 hover:text-white">
                      Rating
                      {sortField === 'rating' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('totalOrders')} className="flex items-center gap-1 hover:text-white ml-auto">
                      Pedidos
                      {sortField === 'totalOrders' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('totalSpent')} className="flex items-center gap-1 hover:text-white ml-auto">
                      Total Compras
                      {sortField === 'totalSpent' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">
                    <button onClick={() => toggleSort('onTimeDeliveryRate')} className="flex items-center gap-1 hover:text-white ml-auto">
                      Puntualidad
                      {sortField === 'onTimeDeliveryRate' && (sortDir === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <Link href={`/dashboard/suppliers/${supplier.id}`} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center">
                          <span className="text-xs font-medium text-cbd-green">
                            {supplier.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{supplier.company}</p>
                          <p className="text-xs text-muted-foreground">{supplier.name} - {supplier.city}, {supplier.country}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getSupplierStatusColor(supplier.status)}>
                        {getSupplierStatusLabel(supplier.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {renderStars(supplier.rating)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-white">
                      {supplier.totalOrders}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-white">
                      {formatCurrency(supplier.totalSpent)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm">
                      <span className={supplier.onTimeDeliveryRate >= 90 ? 'text-green-400' : supplier.onTimeDeliveryRate >= 80 ? 'text-amber-400' : 'text-red-400'}>
                        {supplier.onTimeDeliveryRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron proveedores con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
