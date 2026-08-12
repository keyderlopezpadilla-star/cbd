'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Search, Filter, Plus } from 'lucide-react'
import { OrganizationTable } from '@/features/super-admin/components/organization-table'

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Organizaciones</h1>
              <p className="text-sm text-cbd-gray-light">
                Gestiona todas las organizaciones de la plataforma
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-cbd-green text-black rounded-lg text-sm font-medium hover:bg-cbd-green/90 transition-colors">
            <Plus className="h-4 w-4" />
            Nueva Organizacion
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cbd-gray-light" />
          <input
            type="text"
            placeholder="Buscar organizaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white placeholder:text-cbd-gray-light focus:outline-none focus:border-cbd-green/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-cbd-gray-light" />
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-cbd-green/50"
          >
            <option value="all">Todos los planes</option>
            <option value="FREE">Free</option>
            <option value="PRO">Pro</option>
            <option value="BUSINESS">Business</option>
            <option value="ENTERPRISE">Enterprise</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-cbd-green/50"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activa</option>
            <option value="inactive">Inactiva</option>
            <option value="suspended">Suspendida</option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <OrganizationTable
          searchQuery={searchQuery}
          planFilter={planFilter}
          statusFilter={statusFilter}
        />
      </motion.div>
    </div>
  )
}
