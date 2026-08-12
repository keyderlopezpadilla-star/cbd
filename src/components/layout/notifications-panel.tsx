'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useNotificationsStore, type Notification } from '@/stores/notifications-store'
import { NotificationType } from '@/lib/constants'
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Package,
  ShoppingCart,
  ArrowLeftRight,
  Shield,
  X,
  Check,
} from 'lucide-react'
import Link from 'next/link'

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
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  return `${days}d`
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
}) {
  const content = (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3 transition-colors hover:bg-cbd-black-secondary',
        !notification.read && 'bg-cbd-green/5'
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium', notification.read ? 'text-cbd-gray-light' : 'text-white')}>
          {notification.title}
        </p>
        <p className="text-xs text-cbd-gray mt-0.5 truncate">{notification.message}</p>
        <p className="text-[10px] text-cbd-gray/60 mt-1">{formatTimeAgo(notification.timestamp)}</p>
      </div>
      {!notification.read && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onMarkAsRead(notification.id)
          }}
          className="flex-shrink-0 p-1 rounded hover:bg-cbd-green/10 text-cbd-gray hover:text-cbd-green transition-colors"
          title="Marcar como leida"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )

  if (notification.link) {
    return (
      <Link href={notification.link} className="block">
        {content}
      </Link>
    )
  }

  return content
}

export function NotificationsPanel() {
  const { notifications, isPanelOpen, setPanelOpen, markAsRead, markAllAsRead } =
    useNotificationsStore()
  const panelRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setPanelOpen(false)
      }
    }

    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPanelOpen, setPanelOpen])

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setPanelOpen(!isPanelOpen)}
        className="relative flex items-center justify-center h-9 w-9 rounded-lg hover:bg-cbd-black-secondary transition-colors"
      >
        <Bell className="h-5 w-5 text-cbd-gray-light" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cbd-green px-1 text-[10px] font-bold text-black">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isPanelOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl glass-strong border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-cbd-green hover:text-cbd-green-light transition-colors"
                >
                  Marcar todas
                </button>
              )}
              <button
                onClick={() => setPanelOpen(false)}
                className="p-1 rounded hover:bg-cbd-black-secondary text-cbd-gray hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-8 w-8 text-cbd-gray/40 mx-auto mb-2" />
                <p className="text-sm text-cbd-gray">No hay notificaciones</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-white/5 px-4 py-2">
              <Link
                href="/dashboard/notifications"
                onClick={() => setPanelOpen(false)}
                className="block text-center text-xs text-cbd-green hover:text-cbd-green-light transition-colors py-1"
              >
                Ver todas las notificaciones
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
