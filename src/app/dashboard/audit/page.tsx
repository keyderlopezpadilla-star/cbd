'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollText, Download, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuditLogStats } from '@/features/audit/components/audit-log-stats'
import { AuditLogTable } from '@/features/audit/components/audit-log-table'
import { AuditLogTimeline } from '@/features/audit/components/audit-log-timeline'
import { AuditLogExport } from '@/features/audit/components/audit-log-export'

export default function AuditPage() {
  const [showExport, setShowExport] = useState(false)
  const [view, setView] = useState<'table' | 'timeline'>('table')

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Registro de Auditoria</h1>
          <p className="text-sm text-cbd-gray mt-1">
            Monitorea todas las acciones realizadas en el sistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex gap-1 p-1 rounded-lg bg-cbd-black-secondary border border-white/5">
            <button
              onClick={() => setView('table')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                view === 'table'
                  ? 'bg-cbd-green/20 text-cbd-green'
                  : 'text-cbd-gray hover:text-white'
              )}
            >
              <ScrollText className="h-3.5 w-3.5" />
              Tabla
            </button>
            <button
              onClick={() => setView('timeline')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                view === 'timeline'
                  ? 'bg-cbd-green/20 text-cbd-green'
                  : 'text-cbd-gray hover:text-white'
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              Timeline
            </button>
          </div>

          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-cbd-green text-black hover:bg-cbd-green-light transition-colors"
          >
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <AuditLogStats />

      {/* Content */}
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {view === 'table' && <AuditLogTable />}
        {view === 'timeline' && <AuditLogTimeline />}
      </motion.div>

      {/* Export modal */}
      <AnimatePresence>
        {showExport && <AuditLogExport onClose={() => setShowExport(false)} />}
      </AnimatePresence>
    </div>
  )
}
