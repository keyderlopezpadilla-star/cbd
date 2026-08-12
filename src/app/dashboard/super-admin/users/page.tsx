'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter } from 'lucide-react'
import { UserManagementTable } from '@/features/super-admin/components/user-management-table'

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [orgFilter, setOrgFilter] = useState<string>('all')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Usuarios de la Plataforma</h1>
            <p className="text-sm text-cbd-gray-light">
              Gestiona todos los usuarios de todas las organizaciones
            </p>
          </div>
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
            placeholder="Buscar usuarios por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white placeholder:text-cbd-gray-light focus:outline-none focus:border-cbd-green/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-cbd-gray-light" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-cbd-green/50"
          >
            <option value="all">Todos los roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="ACCOUNTING">Accounting</option>
            <option value="MARKETING">Marketing</option>
          </select>
          <select
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
            className="px-3 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-cbd-green/50"
          >
            <option value="all">Todas las organizaciones</option>
            <option value="org-1">CBD Madrid</option>
            <option value="org-2">GreenLeaf Valencia</option>
            <option value="org-3">CBD Express Barcelona</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-cbd-dark border border-cbd-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-cbd-green/50"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="suspended">Suspendido</option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <UserManagementTable
          searchQuery={searchQuery}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          orgFilter={orgFilter}
        />
      </motion.div>
    </div>
  )
}
