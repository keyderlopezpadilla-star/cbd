'use client'

import { Crown, Star, Shield, Gem, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LoyaltyTier } from '@/lib/constants'
import {
  TIER_CONFIGS,
  getTierConfig,
  getNextTier,
  calculateProgressToNextTier,
  getPointsToNextTier,
} from '@/lib/mock-data/loyalty'

interface MemberProgressProps {
  customerName: string
  currentTier: LoyaltyTier
  currentPoints: number
}

const tierIcons: Record<LoyaltyTier, typeof Crown> = {
  [LoyaltyTier.STARTER]: Shield,
  [LoyaltyTier.PREMIUM]: Star,
  [LoyaltyTier.VIP]: Gem,
  [LoyaltyTier.BLACK]: Crown,
}

export function MemberProgress({ customerName, currentTier, currentPoints }: MemberProgressProps) {
  const tierConfig = getTierConfig(currentTier)
  const nextTier = getNextTier(currentTier)
  const progress = calculateProgressToNextTier(currentPoints, currentTier)
  const pointsNeeded = getPointsToNextTier(currentPoints, currentTier)
  const Icon = tierIcons[currentTier]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progreso de {customerName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={cn('p-1.5 rounded-md', tierConfig.bgColor)}>
                <Icon className={cn('h-3.5 w-3.5', tierConfig.iconColor)} />
              </div>
              <span className={cn('text-sm font-semibold', tierConfig.color)}>
                {tierConfig.name}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Points Display */}
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              {currentPoints.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">puntos acumulados</p>
          </div>

          {/* Progress Bar */}
          {nextTier ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className={tierConfig.color}>{tierConfig.name}</span>
                <span className="text-muted-foreground">
                  {pointsNeeded} pts para {nextTier.name}
                </span>
                <span className={nextTier.color}>{nextTier.name}</span>
              </div>
              <div className="relative h-3 rounded-full bg-background/50 border border-border/50 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cbd-green to-cbd-green-light"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                {/* Milestone markers */}
                {TIER_CONFIGS.slice(1).map((tier) => {
                  const maxRange = TIER_CONFIGS[TIER_CONFIGS.length - 1].minPoints
                  const position = (tier.minPoints / maxRange) * 100
                  if (position > 100) return null
                  return (
                    <div
                      key={tier.tier}
                      className="absolute top-0 bottom-0 w-px bg-border/80"
                      style={{ left: `${position}%` }}
                      title={`${tier.name}: ${tier.minPoints} pts`}
                    />
                  )
                })}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {progress}% completado
              </p>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-amber-400 font-medium">
                Nivel maximo alcanzado
              </p>
              <p className="text-xs text-muted-foreground">
                Disfruta de todos los beneficios Black
              </p>
            </div>
          )}

          {/* Tier Path */}
          <div className="flex items-center justify-center gap-1 pt-2">
            {TIER_CONFIGS.map((tier, i) => {
              const TierIcon = tierIcons[tier.tier]
              const isActive = tier.tier === currentTier
              const isPast = TIER_CONFIGS.findIndex((t) => t.tier === currentTier) > i
              return (
                <div key={tier.tier} className="flex items-center">
                  <div
                    className={cn(
                      'p-1.5 rounded-full border',
                      isActive
                        ? `${tier.bgColor} ${tier.borderColor}`
                        : isPast
                        ? 'bg-cbd-green/10 border-cbd-green/30'
                        : 'bg-background/50 border-border/50'
                    )}
                  >
                    <TierIcon
                      className={cn(
                        'h-3 w-3',
                        isActive
                          ? tier.iconColor
                          : isPast
                          ? 'text-cbd-green'
                          : 'text-muted-foreground'
                      )}
                    />
                  </div>
                  {i < TIER_CONFIGS.length - 1 && (
                    <ChevronRight
                      className={cn(
                        'h-3 w-3 mx-0.5',
                        isPast ? 'text-cbd-green' : 'text-muted-foreground/50'
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Multi-member view for the dashboard
export function MemberProgressGrid() {
  const sampleMembers = [
    { name: 'Maria Lopez', tier: LoyaltyTier.VIP, points: 2450 },
    { name: 'Carlos Garcia', tier: LoyaltyTier.BLACK, points: 5890 },
    { name: 'Ana Martinez', tier: LoyaltyTier.STARTER, points: 89 },
    { name: 'Pablo Ruiz', tier: LoyaltyTier.PREMIUM, points: 456 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sampleMembers.map((member) => (
        <MemberProgress
          key={member.name}
          customerName={member.name}
          currentTier={member.tier}
          currentPoints={member.points}
        />
      ))}
    </div>
  )
}
