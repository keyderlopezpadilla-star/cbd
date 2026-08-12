'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Mail, Smartphone, MessageSquare, Monitor } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { NOTIFICATION_SETTINGS, NotificationSetting } from '@/lib/mock-data/settings'

const channelIcons = {
  email: Mail,
  push: Bell,
  sms: MessageSquare,
  inApp: Monitor,
}

const channelLabels = {
  email: 'Email',
  push: 'Push',
  sms: 'SMS',
  inApp: 'In-App',
}

const frequencyLabels = {
  instant: 'Instantanea',
  hourly: 'Cada hora',
  daily: 'Diaria',
  weekly: 'Semanal',
}

const typeLabels: Record<string, string> = {
  orders: 'Pedidos',
  inventory: 'Inventario',
  marketing: 'Marketing',
  system: 'Sistema',
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(NOTIFICATION_SETTINGS)

  const toggleChannel = (notifId: string, channel: keyof NotificationSetting['channels']) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notifId
          ? { ...n, channels: { ...n.channels, [channel]: !n.channels[channel] } }
          : n
      )
    )
  }

  const updateFrequency = (notifId: string, frequency: NotificationSetting['frequency']) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, frequency } : n))
    )
  }

  const groupedByType = notifications.reduce<Record<string, NotificationSetting[]>>((acc, notif) => {
    if (!acc[notif.type]) acc[notif.type] = []
    acc[notif.type].push(notif)
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-cbd-green" />
            Preferencias de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Configura como y cuando quieres recibir notificaciones. Activa o desactiva canales para cada tipo de alerta.
          </p>

          {/* Channel Legend */}
          <div className="flex flex-wrap gap-4 mt-4 p-3 rounded-lg bg-black/20 border border-white/5">
            {(Object.entries(channelIcons) as [keyof typeof channelIcons, typeof Mail][]).map(
              ([key, Icon]) => (
                <div key={key} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cbd-green" />
                  <span className="text-xs text-muted-foreground">{channelLabels[key]}</span>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Groups */}
      {Object.entries(groupedByType).map(([type, typeNotifications]) => (
        <Card key={type} className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <span className="text-cbd-green">{typeLabels[type] || type}</span>
              <Badge variant="outline" className="text-xs border-white/20">
                {typeNotifications.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {typeNotifications.map((notif) => (
              <div
                key={notif.id}
                className="p-4 rounded-lg bg-black/20 border border-white/5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{notif.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                  </div>
                  <Select
                    value={notif.frequency}
                    onValueChange={(v) =>
                      updateFrequency(notif.id, v as NotificationSetting['frequency'])
                    }
                  >
                    <SelectTrigger className="w-36 h-8 bg-black/20 border-white/10 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instantanea</SelectItem>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="daily">Diaria</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Channel Toggles */}
                <div className="flex items-center gap-2">
                  {(
                    Object.entries(notif.channels) as [
                      keyof NotificationSetting['channels'],
                      boolean
                    ][]
                  ).map(([channel, isEnabled]) => {
                    const Icon = channelIcons[channel]
                    return (
                      <button
                        key={channel}
                        onClick={() => toggleChannel(notif.id, channel)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors',
                          isEnabled
                            ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
                            : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30'
                        )}
                      >
                        <Icon className="h-3 w-3" />
                        {channelLabels[channel]}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
          Guardar Cambios
        </Button>
      </div>
    </motion.div>
  )
}
