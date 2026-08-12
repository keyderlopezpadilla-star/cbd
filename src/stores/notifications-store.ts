'use client'

import { create } from 'zustand'
import { NotificationType } from '@/lib/constants'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  link?: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: NotificationType.STOCK_ALERT,
    title: 'Stock bajo detectado',
    message: 'CBD Oil 10% en Madrid Centro tiene solo 3 unidades.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    link: '/dashboard/inventory',
  },
  {
    id: '2',
    type: NotificationType.ORDER_UPDATE,
    title: 'Nuevo pedido recibido',
    message: 'Pedido #ORD-2024-0891 por 245.00 EUR.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: '/dashboard/orders',
  },
  {
    id: '3',
    type: NotificationType.TRANSFER_UPDATE,
    title: 'Transferencia completada',
    message: 'Transferencia de Valencia a Barcelona completada.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
    link: '/dashboard/transfers',
  },
  {
    id: '4',
    type: NotificationType.SUCCESS,
    title: 'Reporte generado',
    message: 'El reporte de ventas semanal esta disponible.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    link: '/dashboard/analytics',
  },
  {
    id: '5',
    type: NotificationType.SECURITY_ALERT,
    title: 'Nuevo inicio de sesion',
    message: 'Se detecto un nuevo inicio de sesion desde Madrid.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
]

interface NotificationsState {
  notifications: Notification[]
  isPanelOpen: boolean
  setPanelOpen: (open: boolean) => void
  togglePanel: () => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
}

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  isPanelOpen: false,
  setPanelOpen: (open) => set({ isPanelOpen: open }),
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { ...notification, id: crypto.randomUUID() },
        ...state.notifications,
      ],
    })),
}))

// Selector for unread count
export const selectUnreadCount = (state: NotificationsState) =>
  state.notifications.filter((n) => !n.read).length
