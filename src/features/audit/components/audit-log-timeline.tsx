'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AuditAction } from '@/lib/constants'
import { mockAuditLogs, getActionLabel, getActionColor } from '@/lib/mock-data/audit-logs'
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LogIn,
  LogOut,
  Download,
} from 'lucide-react'

function getActionIcon(action: AuditAction) {
  switch (action) {
    case AuditAction.CREATE:
      return Plus
    case AuditAction.READ:
      return Eye
    case AuditAction.UPDATE:
      return Pencil
    case AuditAction.DELETE:
      return Trash2
    case AuditAction.LOGIN:
      return LogIn
    case AuditAction.LOGOUT:
      return LogOut
    case AuditAction.EXPORT:
      return Download
  }
}

interface TimelineGroup {
  label: string
  logs: typeof mockAuditLogs
}

export function AuditLogTimeline() {
  const groupedLogs = useMemo(() => {
    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)
    const yesterdayStart = new Date(todayStart)
    yesterdayStart.setDate(yesterdayStart.getDate() - 1)

    const groups: TimelineGroup[] = []
    const todayLogs = mockAuditLogs.filter(
      (log) => new Date(log.timestamp) >= todayStart
    )
    const yesterdayLogs = mockAuditLogs.filter(
      (log) => {
        const d = new Date(log.timestamp)
        return d >= yesterdayStart && d < todayStart
      }
    )
    const olderLogs = mockAuditLogs.filter(
      (log) => new Date(log.timestamp) < yesterdayStart
    ).slice(0, 10)

    if (todayLogs.length > 0) groups.push({ label: 'Hoy', logs: todayLogs })
    if (yesterdayLogs.length > 0) groups.push({ label: 'Ayer', logs: yesterdayLogs })
    if (olderLogs.length > 0) groups.push({ label: 'Anteriores', logs: olderLogs })

    return groups
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl border border-white/5 p-4"
    >
      <h3 className="text-sm font-semibold text-white mb-4">Linea de Tiempo</h3>

      <div className="space-y-6">
        {groupedLogs.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-medium text-cbd-gray mb-3">{group.label}</p>
            <div className="relative pl-6 space-y-3">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" />

              {group.logs.map((log, index) => {
                const Icon = getActionIcon(log.action)
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative flex items-start gap-3"
                  >
                    {/* Dot */}
                    <div className={cn(
                      'absolute -left-6 top-1 w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-cbd-black',
                      log.result === 'failure' ? 'bg-red-400/20' : 'bg-cbd-black-secondary'
                    )}>
                      <Icon className={cn('h-2.5 w-2.5', getActionColor(log.action))} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white truncate">
                          {log.userName}
                        </span>
                        <span className={cn('text-[10px]', getActionColor(log.action))}>
                          {getActionLabel(log.action)}
                        </span>
                        <span className="text-xs text-cbd-gray truncate">
                          {log.resourceName}
                        </span>
                      </div>
                      <p className="text-[10px] text-cbd-gray/60 mt-0.5">
                        {new Date(log.timestamp).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {log.storeName && ` - ${log.storeName}`}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
