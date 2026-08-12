'use client'

import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NotificationType } from '@/lib/constants'
import { getNotificationTypeLabel } from '@/lib/mock-data/notifications'

interface NotificationFiltersProps {
  selectedTypes: NotificationType[]
  onTypesChange: (types: NotificationType[]) => void
  dateRange: string
  onDateRangeChange: (range: string) => void
  status: 'all' | 'read' | 'unread'
  onStatusChange: (status: 'all' | 'read' | 'unread') => void
}

const dateRangeOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'today', label: 'Hoy' },
  { value: 'week', label: 'Esta Semana' },
  { value: 'month', label: 'Este Mes' },
]

const statusOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'unread', label: 'Sin Leer' },
  { value: 'read', label: 'Leidas' },
]

export function NotificationFilters({
  selectedTypes,
  onTypesChange,
  dateRange,
  onDateRangeChange,
  status,
  onStatusChange,
}: NotificationFiltersProps) {
  const toggleType = (type: NotificationType) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type))
    } else {
      onTypesChange([...selectedTypes, type])
    }
  }

  const clearFilters = () => {
    onTypesChange([])
    onDateRangeChange('all')
    onStatusChange('all')
  }

  const hasFilters = selectedTypes.length > 0 || dateRange !== 'all' || status !== 'all'

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 border border-white/5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-cbd-green" />
          <span className="text-sm font-medium text-white">Filtros</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-cbd-gray hover:text-white transition-colors"
          >
            <X className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Type filters */}
      <div>
        <p className="text-xs text-cbd-gray mb-2">Tipo de Notificacion</p>
        <div className="flex flex-wrap gap-2">
          {Object.values(NotificationType).map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                selectedTypes.includes(type)
                  ? 'bg-cbd-green/20 border-cbd-green/50 text-cbd-green'
                  : 'bg-cbd-black-secondary border-white/5 text-cbd-gray hover:text-white hover:border-white/10'
              )}
            >
              {getNotificationTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Date range and status */}
      <div className="flex flex-wrap gap-4">
        <div>
          <p className="text-xs text-cbd-gray mb-2">Periodo</p>
          <div className="flex gap-1.5">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onDateRangeChange(option.value)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                  dateRange === option.value
                    ? 'bg-cbd-green/20 border-cbd-green/50 text-cbd-green'
                    : 'bg-cbd-black-secondary border-white/5 text-cbd-gray hover:text-white hover:border-white/10'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-cbd-gray mb-2">Estado</p>
          <div className="flex gap-1.5">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onStatusChange(option.value as 'all' | 'read' | 'unread')}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                  status === option.value
                    ? 'bg-cbd-green/20 border-cbd-green/50 text-cbd-green'
                    : 'bg-cbd-black-secondary border-white/5 text-cbd-gray hover:text-white hover:border-white/10'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
