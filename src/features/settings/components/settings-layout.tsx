'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  Store,
  Receipt,
  Globe,
  Bell,
  Plug,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GeneralSettings } from './general-settings'
import { TaxSettings } from './tax-settings'
import { CurrencyLanguage } from './currency-language'
import { NotificationSettings } from './notification-settings'
import { IntegrationSettings } from './integration-settings'

type SectionId = 'general' | 'taxes' | 'currency' | 'notifications' | 'integrations'

const sections: { id: SectionId; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'general', label: 'General', icon: Store, description: 'Nombre, logo, contacto y horarios' },
  { id: 'taxes', label: 'Impuestos', icon: Receipt, description: 'Tasas por region y producto' },
  { id: 'currency', label: 'Moneda e Idioma', icon: Globe, description: 'Formato y preferencias' },
  { id: 'notifications', label: 'Notificaciones', icon: Bell, description: 'Canales y frecuencia' },
  { id: 'integrations', label: 'Integraciones', icon: Plug, description: 'Conexiones externas' },
]

export function SettingsLayout() {
  const [activeSection, setActiveSection] = useState<SectionId>('general')

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />
      case 'taxes':
        return <TaxSettings />
      case 'currency':
        return <CurrencyLanguage />
      case 'notifications':
        return <NotificationSettings />
      case 'integrations':
        return <IntegrationSettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-cbd-green" />
          Configuracion
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona la configuracion general de tu tienda, impuestos, idioma, notificaciones e integraciones
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:w-64 shrink-0"
        >
          <nav className="space-y-1 lg:sticky lg:top-4">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                    isActive
                      ? 'bg-cbd-green/10 border border-cbd-green/30 text-cbd-green'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent'
                  )}
                >
                  <Icon className={cn('h-4 w-4', isActive ? 'text-cbd-green' : '')} />
                  <div>
                    <p className="text-sm font-medium">{section.label}</p>
                    <p className="text-xs text-muted-foreground hidden lg:block">{section.description}</p>
                  </div>
                </button>
              )
            })}
          </nav>
        </motion.aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
