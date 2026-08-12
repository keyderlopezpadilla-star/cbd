'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NotificationType } from '@/lib/constants'
import { getNotificationTypeLabel } from '@/lib/mock-data/notifications'
import { Bell, Mail, Smartphone, Moon, Store, Save } from 'lucide-react'
import { DEMO_STORES } from '@/lib/constants'

interface NotificationPreference {
  type: NotificationType
  inApp: boolean
  email: boolean
  push: boolean
}

interface QuietHours {
  enabled: boolean
  start: string
  end: string
}

interface StorePreference {
  storeId: string
  storeName: string
  enabled: boolean
}

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(
    Object.values(NotificationType).map((type) => ({
      type,
      inApp: true,
      email: type !== NotificationType.INFO,
      push: type === NotificationType.STOCK_ALERT || type === NotificationType.SECURITY_ALERT || type === NotificationType.ERROR,
    }))
  )

  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: true,
    start: '22:00',
    end: '08:00',
  })

  const [storePreferences, setStorePreferences] = useState<StorePreference[]>(
    DEMO_STORES.map((store) => ({
      storeId: store.id,
      storeName: store.name,
      enabled: true,
    }))
  )

  const [saved, setSaved] = useState(false)

  const togglePreference = (type: NotificationType, channel: 'inApp' | 'email' | 'push') => {
    setPreferences((prev) =>
      prev.map((p) =>
        p.type === type ? { ...p, [channel]: !p[channel] } : p
      )
    )
    setSaved(false)
  }

  const toggleStorePreference = (storeId: string) => {
    setStorePreferences((prev) =>
      prev.map((s) =>
        s.storeId === storeId ? { ...s, enabled: !s.enabled } : s
      )
    )
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Channel Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-white/5 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Preferencias por Tipo</h3>
          <p className="text-xs text-cbd-gray mt-0.5">Configura como recibir cada tipo de notificacion</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-2 text-xs font-medium text-cbd-gray">Tipo</th>
                <th className="text-center px-4 py-2 text-xs font-medium text-cbd-gray">
                  <div className="flex items-center justify-center gap-1">
                    <Bell className="h-3 w-3" />
                    En App
                  </div>
                </th>
                <th className="text-center px-4 py-2 text-xs font-medium text-cbd-gray">
                  <div className="flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </div>
                </th>
                <th className="text-center px-4 py-2 text-xs font-medium text-cbd-gray">
                  <div className="flex items-center justify-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    Push
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {preferences.map((pref) => (
                <tr key={pref.type} className="hover:bg-cbd-black-secondary/50 transition-colors">
                  <td className="px-4 py-2.5 text-sm text-white">
                    {getNotificationTypeLabel(pref.type)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <ToggleSwitch
                      checked={pref.inApp}
                      onChange={() => togglePreference(pref.type, 'inApp')}
                    />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <ToggleSwitch
                      checked={pref.email}
                      onChange={() => togglePreference(pref.type, 'email')}
                    />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <ToggleSwitch
                      checked={pref.push}
                      onChange={() => togglePreference(pref.type, 'push')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quiet Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl border border-white/5 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-indigo-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Horas de Silencio</h3>
              <p className="text-xs text-cbd-gray">No recibir notificaciones push durante este horario</p>
            </div>
          </div>
          <ToggleSwitch
            checked={quietHours.enabled}
            onChange={() => {
              setQuietHours((prev) => ({ ...prev, enabled: !prev.enabled }))
              setSaved(false)
            }}
          />
        </div>

        {quietHours.enabled && (
          <div className="flex items-center gap-4 mt-3">
            <div>
              <label className="text-xs text-cbd-gray block mb-1">Desde</label>
              <input
                type="time"
                value={quietHours.start}
                onChange={(e) => {
                  setQuietHours((prev) => ({ ...prev, start: e.target.value }))
                  setSaved(false)
                }}
                className="bg-cbd-black-secondary border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cbd-green/50"
              />
            </div>
            <div>
              <label className="text-xs text-cbd-gray block mb-1">Hasta</label>
              <input
                type="time"
                value={quietHours.end}
                onChange={(e) => {
                  setQuietHours((prev) => ({ ...prev, end: e.target.value }))
                  setSaved(false)
                }}
                className="bg-cbd-black-secondary border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cbd-green/50"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Store Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl border border-white/5 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Store className="h-4 w-4 text-cbd-green" />
          <div>
            <h3 className="text-sm font-semibold text-white">Notificaciones por Tienda</h3>
            <p className="text-xs text-cbd-gray">Selecciona de que tiendas quieres recibir notificaciones</p>
          </div>
        </div>

        <div className="space-y-2">
          {storePreferences.map((store) => (
            <div
              key={store.storeId}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-cbd-black-secondary/50 transition-colors"
            >
              <span className="text-sm text-white">{store.storeName}</span>
              <ToggleSwitch
                checked={store.enabled}
                onChange={() => toggleStorePreference(store.storeId)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            saved
              ? 'bg-cbd-green/20 text-cbd-green border border-cbd-green/50'
              : 'bg-cbd-green text-black hover:bg-cbd-green-light'
          )}
        >
          <Save className="h-4 w-4" />
          {saved ? 'Guardado' : 'Guardar Preferencias'}
        </button>
      </div>
    </div>
  )
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
        checked ? 'bg-cbd-green' : 'bg-cbd-black-secondary border border-white/10'
      )}
    >
      <span
        className={cn(
          'inline-block h-3.5 w-3.5 transform rounded-full transition-transform',
          checked ? 'translate-x-4.5 bg-black' : 'translate-x-0.5 bg-cbd-gray'
        )}
      />
    </button>
  )
}
