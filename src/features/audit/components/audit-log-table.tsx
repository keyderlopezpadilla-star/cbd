'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AuditAction } from '@/lib/constants'
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowUpDown,
  X,
} from 'lucide-react'
import {
  mockAuditLogs,
  type MockAuditLog,
  getActionLabel,
  getActionColor,
  getResultLabel,
  getResultColor,
} from '@/lib/mock-data/audit-logs'
import { AuditLogDetail } from './audit-log-detail'

type SortField = 'timestamp' | 'userName' | 'action' | 'resource' | 'result'
type SortDir = 'asc' | 'desc'

const ITEMS_PER_PAGE = 20

const userOptions = [...new Set(mockAuditLogs.map((l) => l.userName))].sort()
const resourceOptions = [...new Set(mockAuditLogs.map((l) => l.resource))].sort()

export function AuditLogTable() {
  const [search, setSearch] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [resourceFilter, setResourceFilter] = useState('')
  const [resultFilter, setResultFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortField, setSortField] = useState<SortField>('timestamp')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)
  const [selectedLog, setSelectedLog] = useState<MockAuditLog | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredLogs = useMemo(() => {
    let logs = [...mockAuditLogs]

    if (search) {
      const s = search.toLowerCase()
      logs = logs.filter(
        (l) =>
          l.userName.toLowerCase().includes(s) ||
          l.resourceName.toLowerCase().includes(s) ||
          l.ipAddress.includes(s)
      )
    }
    if (userFilter) logs = logs.filter((l) => l.userName === userFilter)
    if (actionFilter) logs = logs.filter((l) => l.action === actionFilter)
    if (resourceFilter) logs = logs.filter((l) => l.resource === resourceFilter)
    if (resultFilter) logs = logs.filter((l) => l.result === resultFilter)
    if (dateFrom) {
      const from = new Date(dateFrom)
      logs = logs.filter((l) => new Date(l.timestamp) >= from)
    }
    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59, 999)
      logs = logs.filter((l) => new Date(l.timestamp) <= to)
    }

    logs.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'timestamp':
          cmp = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          break
        case 'userName':
          cmp = a.userName.localeCompare(b.userName)
          break
        case 'action':
          cmp = a.action.localeCompare(b.action)
          break
        case 'resource':
          cmp = a.resource.localeCompare(b.resource)
          break
        case 'result':
          cmp = a.result.localeCompare(b.result)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return logs
  }, [search, userFilter, actionFilter, resourceFilter, resultFilter, dateFrom, dateTo, sortField, sortDir])

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const paginatedLogs = filteredLogs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const hasFilters = userFilter || actionFilter || resourceFilter || resultFilter || dateFrom || dateTo
  const clearFilters = () => {
    setUserFilter('')
    setActionFilter('')
    setResourceFilter('')
    setResultFilter('')
    setDateFrom('')
    setDateTo('')
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Search and filter toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cbd-gray" />
          <input
            type="text"
            placeholder="Buscar por usuario, recurso o IP..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-9 pr-4 py-2 bg-cbd-black-secondary border border-white/10 rounded-lg text-sm text-white placeholder:text-cbd-gray focus:outline-none focus:border-cbd-green/50"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors',
            showFilters || hasFilters
              ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
              : 'bg-cbd-black-secondary border-white/10 text-cbd-gray hover:text-white'
          )}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-cbd-green" />
          )}
        </button>
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-xl border border-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-white">Filtros Avanzados</p>
                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-cbd-gray hover:text-white">
                    <X className="h-3 w-3" /> Limpiar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div>
                  <label className="text-[10px] text-cbd-gray block mb-1">Usuario</label>
                  <select
                    value={userFilter}
                    onChange={(e) => { setUserFilter(e.target.value); setPage(1) }}
                    className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cbd-green/50"
                  >
                    <option value="">Todos</option>
                    {userOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-cbd-gray block mb-1">Accion</label>
                  <select
                    value={actionFilter}
                    onChange={(e) => { setActionFilter(e.target.value); setPage(1) }}
                    className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cbd-green/50"
                  >
                    <option value="">Todas</option>
                    {Object.values(AuditAction).map((a) => (
                      <option key={a} value={a}>{getActionLabel(a)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-cbd-gray block mb-1">Recurso</label>
                  <select
                    value={resourceFilter}
                    onChange={(e) => { setResourceFilter(e.target.value); setPage(1) }}
                    className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cbd-green/50"
                  >
                    <option value="">Todos</option>
                    {resourceOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-cbd-gray block mb-1">Resultado</label>
                  <select
                    value={resultFilter}
                    onChange={(e) => { setResultFilter(e.target.value); setPage(1) }}
                    className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cbd-green/50"
                  >
                    <option value="">Todos</option>
                    <option value="success">Exitoso</option>
                    <option value="failure">Fallido</option>
                    <option value="warning">Advertencia</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-cbd-gray block mb-1">Desde</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
                    className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cbd-green/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-cbd-gray block mb-1">Hasta</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
                    className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cbd-green/50"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <SortHeader field="timestamp" current={sortField} dir={sortDir} onSort={toggleSort}>Fecha</SortHeader>
                <SortHeader field="userName" current={sortField} dir={sortDir} onSort={toggleSort}>Usuario</SortHeader>
                <SortHeader field="action" current={sortField} dir={sortDir} onSort={toggleSort}>Accion</SortHeader>
                <SortHeader field="resource" current={sortField} dir={sortDir} onSort={toggleSort}>Recurso</SortHeader>
                <SortHeader field="result" current={sortField} dir={sortDir} onSort={toggleSort}>Resultado</SortHeader>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-cbd-gray">IP</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-cbd-gray">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-cbd-gray">
                    No se encontraron registros
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-cbd-black-secondary/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="px-4 py-2.5 text-xs text-cbd-gray-light whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      {' '}
                      {new Date(log.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-white">{log.userName}</p>
                        <p className="text-[10px] text-cbd-gray">{log.userRole}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn('text-xs font-medium', getActionColor(log.action))}>
                        {getActionLabel(log.action)}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div>
                        <p className="text-xs text-white">{log.resourceName}</p>
                        <p className="text-[10px] text-cbd-gray">{log.resource}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium',
                        log.result === 'success' && 'bg-cbd-green/10 text-cbd-green',
                        log.result === 'failure' && 'bg-red-400/10 text-red-400',
                        log.result === 'warning' && 'bg-amber-400/10 text-amber-400',
                      )}>
                        {getResultLabel(log.result)}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-cbd-gray font-mono">
                      {log.ipAddress}
                    </td>
                    <td className="px-4 py-2.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedLog(log) }}
                        className="p-1.5 rounded-lg hover:bg-cbd-green/10 text-cbd-gray hover:text-cbd-green transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <p className="text-xs text-cbd-gray">
              Mostrando {(page - 1) * ITEMS_PER_PAGE + 1} - {Math.min(page * ITEMS_PER_PAGE, filteredLogs.length)} de {filteredLogs.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-cbd-black-secondary text-cbd-gray hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = page <= 3 ? i + 1 : page + i - 2
                if (pageNum > totalPages || pageNum < 1) return null
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      'w-7 h-7 rounded-lg text-xs font-medium transition-colors',
                      pageNum === page
                        ? 'bg-cbd-green/20 text-cbd-green border border-cbd-green/30'
                        : 'text-cbd-gray hover:text-white hover:bg-cbd-black-secondary'
                    )}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-cbd-black-secondary text-cbd-gray hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedLog && (
          <AuditLogDetail log={selectedLog} onClose={() => setSelectedLog(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function SortHeader({
  field,
  current,
  dir,
  onSort,
  children,
}: {
  field: SortField
  current: SortField
  dir: SortDir
  onSort: (field: SortField) => void
  children: React.ReactNode
}) {
  const isActive = field === current
  return (
    <th className="text-left px-4 py-2.5">
      <button
        onClick={() => onSort(field)}
        className={cn(
          'flex items-center gap-1 text-xs font-medium transition-colors',
          isActive ? 'text-cbd-green' : 'text-cbd-gray hover:text-white'
        )}
      >
        {children}
        {isActive ? (
          dir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-50" />
        )}
      </button>
    </th>
  )
}
