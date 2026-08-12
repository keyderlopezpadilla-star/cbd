'use client'

import { useState } from 'react'
import { Monitor, History, RotateCcw, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { POSTerminal } from '@/features/sales/components/pos-terminal'
import { SalesHistory } from '@/features/sales/components/sales-history'
import { ReturnsForm } from '@/features/sales/components/returns-form'
import { DailySummary } from '@/features/sales/components/daily-summary'

type TabId = 'pos' | 'history' | 'returns' | 'summary'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'pos', label: 'Terminal POS', icon: Monitor },
  { id: 'history', label: 'Historial', icon: History },
  { id: 'returns', label: 'Devoluciones', icon: RotateCcw },
  { id: 'summary', label: 'Resumen', icon: BarChart3 },
]

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('pos')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ventas</h1>
        <p className="text-sm text-muted-foreground">
          Terminal de punto de venta, historial de transacciones y gestion de devoluciones
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
      {activeTab === 'pos' && <POSTerminal />}
      {activeTab === 'history' && <SalesHistory />}
      {activeTab === 'returns' && <ReturnsForm />}
      {activeTab === 'summary' && <DailySummary />}
    </div>
  )
}
