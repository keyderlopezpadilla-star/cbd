'use client'

import { useState } from 'react'
import { Shield, UserCheck, FlaskConical, BookOpen, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ComplianceDashboard } from '@/features/compliance/components/compliance-dashboard'
import { AgeGateSettings } from '@/features/compliance/components/age-gate-settings'
import { ProductComplianceForm } from '@/features/compliance/components/product-compliance-form'
import { ComplianceDocumentation } from '@/features/compliance/components/compliance-documentation'

type TabId = 'dashboard' | 'age-gate' | 'products' | 'documentation'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Vista General', icon: LayoutGrid },
  { id: 'age-gate', label: 'Verificacion de Edad', icon: UserCheck },
  { id: 'products', label: 'Cumplimiento Producto', icon: FlaskConical },
  { id: 'documentation', label: 'Documentacion', icon: BookOpen },
]

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-7 w-7 text-cbd-green" />
          Cumplimiento Normativo
        </h1>
        <p className="text-sm text-muted-foreground">
          Verificacion de edad, cumplimiento regulatorio de productos CBD y documentacion legal
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
      {activeTab === 'dashboard' && <ComplianceDashboard />}
      {activeTab === 'age-gate' && <AgeGateSettings />}
      {activeTab === 'products' && <ProductComplianceForm />}
      {activeTab === 'documentation' && <ComplianceDocumentation />}
    </div>
  )
}
