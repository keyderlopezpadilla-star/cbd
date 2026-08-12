'use client'

import { useState } from 'react'
import { Shield, Users, Database, FileText, Clock, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GdprDashboard } from '@/features/gdpr/components/gdpr-dashboard'
import { ConsentManager } from '@/features/gdpr/components/consent-manager'
import { DataRequests } from '@/features/gdpr/components/data-requests'
import { PrivacyPolicyEditor } from '@/features/gdpr/components/privacy-policy-editor'
import { RetentionConfig } from '@/features/gdpr/components/retention-config'

type TabId = 'dashboard' | 'consents' | 'requests' | 'policy' | 'retention'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Vista General', icon: LayoutGrid },
  { id: 'consents', label: 'Consentimientos', icon: Users },
  { id: 'requests', label: 'Solicitudes', icon: Database },
  { id: 'policy', label: 'Politica de Privacidad', icon: FileText },
  { id: 'retention', label: 'Retencion', icon: Clock },
]

export default function GdprPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-7 w-7 text-cbd-green" />
          RGPD & Privacidad
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona consentimientos, solicitudes de datos, politicas de privacidad y reglas de retencion
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <GdprDashboard />}
      {activeTab === 'consents' && <ConsentManager />}
      {activeTab === 'requests' && <DataRequests />}
      {activeTab === 'policy' && <PrivacyPolicyEditor />}
      {activeTab === 'retention' && <RetentionConfig />}
    </div>
  )
}
