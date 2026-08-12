'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NotificationType } from '@/lib/constants'
import {
  Bell,
  CheckCheck,
  Trash2,
  Package,
  ShoppingCart,
  ArrowLeftRight,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Check,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { mockNotifications, type MockNotification, getNotificationTypeLabel, getNotificationSeverityColor } from '@/lib/mock-data/notifications'
import { NotificationFilters } from './notification-filters'

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case NotificationType.STOCK_ALERT:
      return <Package className="h-4 w-4 text-amber-400" />
    case NotificationType.ORDER_UPDATE:
      return <ShoppingCart className="h-4 w-4 text-blue-400" />
    case NotificationType.TRANSFER_UPDATE:
      return <ArrowLeftRight className="h-4 w-4 text-purple-400" />
    case NotificationType.SUCCESS:
      return <CheckCircle2 className="h-4 w-4 text-cbd-green" />
    case NotificationType.WARNING:
      return <AlertTriangle className="h-4 w-4 text-amber-400" />
    case NotificationType.ERROR:
      return <XCircle className="h-4 w-4 text-red-400" />
    case NotificationType.SECURITY_ALERT:
      return <Shield className="h-4 w-4 text-red-400" />
    case NotificationType.INFO:
    default:
      return <Info className="h-4 w-4 text-blue-400" />
  }
}

function formatTimeAgo(timestamp: string): string {
  const now = Date.now()
  const date = new Date(timestamp).getTime()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (minutes < 1) return 'Ahora'
  if (minutes < 60) return `hace ${minutes}m`
  if (hours < 24) return `hace ${hours}h`
  if (days === 1) return 'Ayer'
  return `hace ${days} dias`
}

const ITEMS_PER_PAGE = 10

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<MockNotification[]>(mockNotifications)
  const [selectedTypes, setSelectedTypes] = useState<NotificationType[]>([])
  const [dateRange, setDateRange] = useState('all')
  const [status, setStatus] = useState<'all' | 'read' | 'unread'>('all')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications]

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((n) => selectedTypes.includes(n.type))
    }

    if (status === 'read') {
      filtered = filtered.filter((n) => n.read)
    } else if (status === 'unread') {
      filtered = filtered.filter((n) => !n.read)
    }

    if (dateRange === 'today') {
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      filtered = filtered.filter((n) => new Date(n.timestamp) >= todayStart)
    } else if (dateRange === 'week') {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      filtered = filtered.filter((n) => new Date(n.timestamp).getTime() >= weekAgo)
    } else if (dateRange === 'month') {
      const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
      filtered = filtered.filter((n) => new Date(n.timestamp).getTime() >= monthAgo)
    }

    return filtered
  }, [notifications, selectedTypes, dateRange, status])

  const visibleNotifications = filteredNotifications.slice(0, visibleCount)
  const hasMore = visibleCount < filteredNotifications.length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-4">
      <NotificationFilters
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-cbd-gray">
          {filteredNotifications.length} notificaciones
          {unreadCount > 0 && (
            <span className="text-cbd-green ml-2">({unreadCount} sin leer)</span>
          )}
        </p>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cbd-green/10 text-cbd-green hover:bg-cbd-green/20 transition-colors"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Marcar todas como leidas
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="glass rounded-xl border border-white/5 divide-y divide-white/5 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 py-12 text-center"
            >
              <Bell className="h-10 w-10 text-cbd-gray/30 mx-auto mb-3" />
              <p className="text-sm text-cbd-gray">No hay notificaciones que coincidan con los filtros</p>
            </motion.div>
          ) : (
            visibleNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  'flex items-start gap-3 px-4 py-3 transition-colors hover:bg-cbd-black-secondary group',
                  !notification.read && 'bg-cbd-green/5'
                )}
              >
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={cn('text-sm font-medium truncate', notification.read ? 'text-cbd-gray-light' : 'text-white')}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-cbd-gray mt-0.5">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-cbd-gray/60">{formatTimeAgo(notification.timestamp)}</span>
                        <span className={cn('text-[10px] px-1.5 py-0.5 rounded', getNotificationSeverityColor(notification.severity))}>
                          {getNotificationTypeLabel(notification.type)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      {notification.link && (
                        <Link
                          href={notification.link}
                          className="p-1 rounded hover:bg-cbd-green/10 text-cbd-gray hover:text-cbd-green transition-colors"
                          title="Ver recurso"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded hover:bg-cbd-green/10 text-cbd-gray hover:text-cbd-green transition-colors"
                          title="Marcar como leida"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 rounded hover:bg-red-400/10 text-cbd-gray hover:text-red-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-cbd-black-secondary text-cbd-gray-light hover:text-white hover:bg-cbd-black-secondary/80 border border-white/5 transition-colors"
          >
            Cargar mas ({filteredNotifications.length - visibleCount} restantes)
          </button>
        </div>
      )}
    </div>
  )
}
