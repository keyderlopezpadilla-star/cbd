'use client'

import { useState } from 'react'
import { Megaphone, Ticket, Percent, Users, Calendar, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MarketingStats } from '@/features/marketing/components/marketing-stats'
import { CampaignList } from '@/features/marketing/components/campaign-list'
import { CampaignForm } from '@/features/marketing/components/campaign-form'
import { CampaignDetail } from '@/features/marketing/components/campaign-detail'
import { CouponManager } from '@/features/marketing/components/coupon-manager'
import { DiscountRules } from '@/features/marketing/components/discount-rules'
import { AudienceBuilder } from '@/features/marketing/components/audience-builder'
import { PromotionalCalendar } from '@/features/marketing/components/promotional-calendar'
import { Campaign } from '@/lib/mock-data/marketing'

type TabId = 'overview' | 'campaigns' | 'coupons' | 'discounts' | 'audience'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Vista General', icon: LayoutGrid },
  { id: 'campaigns', label: 'Campanas', icon: Megaphone },
  { id: 'coupons', label: 'Cupones', icon: Ticket },
  { id: 'discounts', label: 'Descuentos', icon: Percent },
  { id: 'audience', label: 'Audiencia', icon: Users },
]

type ViewMode = 'list' | 'create' | 'detail'

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const handleSelectCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setViewMode('detail')
  }

  const handleCreateNew = () => {
    setSelectedCampaign(null)
    setViewMode('create')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedCampaign(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Marketing & Promociones</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona campanas, cupones, descuentos y segmentacion de audiencia
        </p>
      </div>

      {/* Stats */}
      <MarketingStats />

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setViewMode('list')
                setSelectedCampaign(null)
              }}
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CampaignList onSelectCampaign={handleSelectCampaign} onCreateNew={handleCreateNew} />
          <PromotionalCalendar />
        </div>
      )}

      {activeTab === 'campaigns' && (
        <>
          {viewMode === 'list' && (
            <CampaignList onSelectCampaign={handleSelectCampaign} onCreateNew={handleCreateNew} />
          )}
          {viewMode === 'create' && (
            <CampaignForm onClose={handleBack} onSave={handleBack} />
          )}
          {viewMode === 'detail' && selectedCampaign && (
            <CampaignDetail campaign={selectedCampaign} onBack={handleBack} />
          )}
        </>
      )}

      {activeTab === 'coupons' && <CouponManager />}

      {activeTab === 'discounts' && <DiscountRules />}

      {activeTab === 'audience' && <AudienceBuilder />}
    </div>
  )
}
