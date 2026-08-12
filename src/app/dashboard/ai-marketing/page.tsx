'use client'

import { useState } from 'react'
import { Sparkles, ShieldCheck, LayoutTemplate } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AIMarketingGenerator } from '@/features/ai/components/ai-marketing-generator'
import { ComplianceChecker } from '@/features/ai/components/compliance-checker'
import { ContentTemplates } from '@/features/ai/components/content-templates'

type TabId = 'generator' | 'compliance' | 'templates'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'generator', label: 'Generador IA', icon: Sparkles },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
]

export default function AIMarketingPage() {
  const [activeTab, setActiveTab] = useState<TabId>('generator')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Marketing IA</h1>
        <p className="text-sm text-muted-foreground">
          Genera contenido de marketing optimizado para CBD con filtros de compliance automaticos
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
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
      {activeTab === 'generator' && <AIMarketingGenerator />}
      {activeTab === 'compliance' && <ComplianceChecker />}
      {activeTab === 'templates' && <ContentTemplates />}
    </div>
  )
}
