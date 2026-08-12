'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NotificationStats } from '@/features/notifications/components/notification-stats'
import { NotificationCenter } from '@/features/notifications/components/notification-center'
import { NotificationPreferences } from '@/features/notifications/components/notification-preferences'

type Tab = 'notifications' | 'preferences'

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('notifications')

  const tabs = [
    { id: 'notifications' as Tab, label: 'Todas las Notificaciones', icon: Bell },
    { id: 'preferences' as Tab, label: 'Preferencias', icon: Settings2 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
          <p className="text-sm text-cbd-gray mt-1">
            Gestiona tus notificaciones y preferencias de alerta
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <NotificationStats />

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-cbd-black-secondary border border-white/5 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === tab.id
                ? 'bg-cbd-green/20 text-cbd-green border border-cbd-green/30'
                : 'text-cbd-gray hover:text-white'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'notifications' && <NotificationCenter />}
        {activeTab === 'preferences' && <NotificationPreferences />}
      </motion.div>
    </div>
  )
}
