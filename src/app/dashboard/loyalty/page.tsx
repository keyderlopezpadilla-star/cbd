'use client'

import { Crown, Settings, History, Gift, BarChart3, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoyaltyStats } from '@/features/loyalty/components/loyalty-stats'
import { LoyaltyOverview } from '@/features/loyalty/components/loyalty-overview'
import { TierCard } from '@/features/loyalty/components/tier-card'
import { TierManagement } from '@/features/loyalty/components/tier-management'
import { PointsHistory } from '@/features/loyalty/components/points-history'
import { RedemptionCatalog } from '@/features/loyalty/components/redemption-catalog'
import { LoyaltyConfigPanel } from '@/features/loyalty/components/loyalty-config'
import { MemberProgressGrid } from '@/features/loyalty/components/member-progress'
import { TIER_CONFIGS } from '@/lib/mock-data/loyalty'

export default function LoyaltyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Programa de Fidelidad</h1>
          <p className="text-sm text-muted-foreground">
            Sistema de puntos, tiers y recompensas para clientes
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cbd-green/10 border border-cbd-green/20">
          <Crown className="h-4 w-4 text-cbd-green" />
          <span className="text-sm font-medium text-cbd-green">1 punto = 1 EUR</span>
        </div>
      </div>

      {/* Stats */}
      <LoyaltyStats />

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-background/50 border border-border/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-cbd-green/10 data-[state=active]:text-cbd-green">
            <BarChart3 className="h-4 w-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="tiers" className="data-[state=active]:bg-cbd-green/10 data-[state=active]:text-cbd-green">
            <Crown className="h-4 w-4 mr-2" />
            Tiers
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-cbd-green/10 data-[state=active]:text-cbd-green">
            <History className="h-4 w-4 mr-2" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-cbd-green/10 data-[state=active]:text-cbd-green">
            <Gift className="h-4 w-4 mr-2" />
            Recompensas
          </TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-cbd-green/10 data-[state=active]:text-cbd-green">
            <Users className="h-4 w-4 mr-2" />
            Miembros
          </TabsTrigger>
          <TabsTrigger value="config" className="data-[state=active]:bg-cbd-green/10 data-[state=active]:text-cbd-green">
            <Settings className="h-4 w-4 mr-2" />
            Configuracion
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <LoyaltyOverview />
          {/* Tier Cards Grid */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Niveles de Fidelidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIER_CONFIGS.map((config, index) => (
                <TierCard key={config.tier} config={config} index={index} />
              ))}
            </div>
          </div>
          {/* Recent Points Activity */}
          <PointsHistory />
        </TabsContent>

        {/* Tiers Tab */}
        <TabsContent value="tiers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIER_CONFIGS.map((config, index) => (
              <TierCard key={config.tier} config={config} index={index} />
            ))}
          </div>
          <TierManagement />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <PointsHistory />
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <RedemptionCatalog />
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Progreso de Miembros</h2>
          <MemberProgressGrid />
        </TabsContent>

        {/* Config Tab */}
        <TabsContent value="config">
          <LoyaltyConfigPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
