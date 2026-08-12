'use client'

import { useMemo } from 'react'

interface UserManagementTableProps {
  searchQuery: string
  roleFilter: string
  statusFilter: string
  orgFilter: string
}

const users = [
  { id: '1', name: 'Carlos Admin', email: 'carlos@greenleaf.com', role: 'SUPER_ADMIN', org: 'GreenLeaf CBD', status: 'active', lastLogin: 'Hace 2 min' },
  { id: '2', name: 'Maria Garcia', email: 'maria@greenleaf.com', role: 'ADMIN', org: 'GreenLeaf CBD', status: 'active', lastLogin: 'Hace 1 hora' },
  { id: '3', name: 'Pedro Lopez', email: 'pedro@cbdvalencia.com', role: 'MANAGER', org: 'CBD Valencia Store', status: 'active', lastLogin: 'Hace 3 horas' },
  { id: '4', name: 'Ana Martinez', email: 'ana@cbdexpress.com', role: 'EMPLOYEE', org: 'CBD Express Madrid', status: 'active', lastLogin: 'Hoy' },
  { id: '5', name: 'Luis Fernandez', email: 'luis@greenleaf.com', role: 'ACCOUNTING', org: 'GreenLeaf CBD', status: 'active', lastLogin: 'Ayer' },
  { id: '6', name: 'Sara Ruiz', email: 'sara@cbdvalencia.com', role: 'MARKETING', org: 'CBD Valencia Store', status: 'inactive', lastLogin: 'Hace 1 semana' },
  { id: '7', name: 'Spam User', email: 'user@spam.com', role: 'EMPLOYEE', org: 'Natural Wellness BCN', status: 'suspended', lastLogin: 'Hace 2 semanas' },
  { id: '8', name: 'David Torres', email: 'david@hemp.com', role: 'MANAGER', org: 'Hemp Solutions', status: 'active', lastLogin: 'Hace 5 horas' },
]

const roleColors: Record<string, string> = {
  SUPER_ADMIN: 'text-red-400 bg-red-500/10',
  ADMIN: 'text-orange-400 bg-orange-500/10',
  MANAGER: 'text-cbd-green bg-cbd-green/10',
  EMPLOYEE: 'text-blue-400 bg-blue-500/10',
  ACCOUNTING: 'text-yellow-400 bg-yellow-500/10',
  MARKETING: 'text-pink-400 bg-pink-500/10',
}

export function UserManagementTable({ searchQuery, roleFilter, statusFilter, orgFilter }: UserManagementTableProps) {
  const filtered = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      const matchesOrg = orgFilter === 'all' || user.org.includes(orgFilter)
      return matchesSearch && matchesRole && matchesStatus && matchesOrg
    })
  }, [searchQuery, roleFilter, statusFilter, orgFilter])

  return (
    <div className="bg-cbd-dark border border-cbd-dark-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cbd-dark-border">
              <th className="text-left py-3 px-4 text-cbd-gray-light font-medium">Usuario</th>
              <th className="text-left py-3 px-4 text-cbd-gray-light font-medium">Rol</th>
              <th className="text-left py-3 px-4 text-cbd-gray-light font-medium">Organizacion</th>
              <th className="text-center py-3 px-4 text-cbd-gray-light font-medium">Estado</th>
              <th className="text-right py-3 px-4 text-cbd-gray-light font-medium">Ultimo Login</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-cbd-dark-border/50 hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-xs text-cbd-gray-light">{user.email}</p>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-cbd-gray-light">{user.org}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center gap-1 text-xs ${
                    user.status === 'active' ? 'text-green-400' :
                    user.status === 'suspended' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'active' ? 'bg-green-400' :
                      user.status === 'suspended' ? 'bg-red-400' : 'bg-gray-400'
                    }`} />
                    {user.status === 'active' ? 'Activo' : user.status === 'suspended' ? 'Suspendido' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-cbd-gray-light text-xs">{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <div className="py-12 text-center text-cbd-gray-light">
          No se encontraron usuarios
        </div>
      )}
    </div>
  )
}
