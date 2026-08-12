'use client'

import { useMemo } from 'react'

interface OrganizationTableProps {
  searchQuery: string
  planFilter: string
  statusFilter: string
}

const organizations = [
  { id: '1', name: 'GreenLeaf CBD', plan: 'BUSINESS', stores: 5, users: 22, mrr: 299, status: 'active', created: '2024-01-15' },
  { id: '2', name: 'CBD Valencia Store', plan: 'PRO', stores: 3, users: 12, mrr: 149, status: 'active', created: '2024-03-22' },
  { id: '3', name: 'CBD Express Madrid', plan: 'BUSINESS', stores: 8, users: 35, mrr: 299, status: 'active', created: '2024-02-10' },
  { id: '4', name: 'Natural Wellness BCN', plan: 'FREE', stores: 1, users: 3, mrr: 0, status: 'active', created: '2024-06-01' },
  { id: '5', name: 'Hemp Solutions', plan: 'PRO', stores: 2, users: 8, mrr: 149, status: 'inactive', created: '2024-04-18' },
  { id: '6', name: 'Sevilla CBD Shop', plan: 'ENTERPRISE', stores: 12, users: 48, mrr: 599, status: 'active', created: '2023-11-05' },
]

export function OrganizationTable({ searchQuery, planFilter, statusFilter }: OrganizationTableProps) {
  const filtered = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPlan = planFilter === 'all' || org.plan === planFilter
      const matchesStatus = statusFilter === 'all' || org.status === statusFilter
      return matchesSearch && matchesPlan && matchesStatus
    })
  }, [searchQuery, planFilter, statusFilter])

  const planColors: Record<string, string> = {
    FREE: 'text-gray-400 bg-gray-500/10',
    PRO: 'text-blue-400 bg-blue-500/10',
    BUSINESS: 'text-cbd-green bg-cbd-green/10',
    ENTERPRISE: 'text-purple-400 bg-purple-500/10',
  }

  return (
    <div className="bg-cbd-dark border border-cbd-dark-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cbd-dark-border">
              <th className="text-left py-3 px-4 text-cbd-gray-light font-medium">Organizacion</th>
              <th className="text-left py-3 px-4 text-cbd-gray-light font-medium">Plan</th>
              <th className="text-center py-3 px-4 text-cbd-gray-light font-medium">Tiendas</th>
              <th className="text-center py-3 px-4 text-cbd-gray-light font-medium">Usuarios</th>
              <th className="text-right py-3 px-4 text-cbd-gray-light font-medium">MRR</th>
              <th className="text-center py-3 px-4 text-cbd-gray-light font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((org) => (
              <tr key={org.id} className="border-b border-cbd-dark-border/50 hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <p className="text-white font-medium">{org.name}</p>
                  <p className="text-xs text-cbd-gray-light">Desde {org.created}</p>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${planColors[org.plan]}`}>
                    {org.plan}
                  </span>
                </td>
                <td className="py-3 px-4 text-center text-white">{org.stores}</td>
                <td className="py-3 px-4 text-center text-white">{org.users}</td>
                <td className="py-3 px-4 text-right text-white font-medium">
                  {org.mrr > 0 ? `€${org.mrr}` : 'Gratis'}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center gap-1 text-xs ${org.status === 'active' ? 'text-green-400' : 'text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${org.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                    {org.status === 'active' ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <div className="py-12 text-center text-cbd-gray-light">
          No se encontraron organizaciones
        </div>
      )}
    </div>
  )
}
