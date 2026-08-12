'use client'

import { Crown, Star, Shield, Gem, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LoyaltyTier } from '@/lib/constants'
import { TierConfig } from '@/lib/mock-data/loyalty'

interface TierCardProps {
  config: TierConfig
  index: number
}

const tierIcons: Record<LoyaltyTier, typeof Crown> = {
  [LoyaltyTier.STARTER]: Shield,
  [LoyaltyTier.PREMIUM]: Star,
  [LoyaltyTier.VIP]: Gem,
  [LoyaltyTier.BLACK]: Crown,
}

export function TierCard({ config, index }: TierCardProps) {
  const Icon = tierIcons[config.tier]
  const pointRange = config.maxPoints
    ? `${config.minPoints} - ${config.maxPoints} pts`
    : `${config.minPoints}+ pts`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={cn('glass card-hover h-full', config.borderColor)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('p-2.5 rounded-lg', config.bgColor)}>
                <Icon className={cn('h-5 w-5', config.iconColor)} />
              </div>
              <div>
                <CardTitle className={cn('text-lg font-bold', config.color)}>
                  {config.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{pointRange}</p>
              </div>
            </div>
            <Badge variant="outline" className={cn('text-xs', config.borderColor, config.color)}>
              {config.memberCount} miembros
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.discount > 0 && (
            <div className={cn('text-sm font-semibold', config.color)}>
              {config.discount}% descuento permanente
            </div>
          )}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Beneficios
            </p>
            <ul className="space-y-1.5">
              {config.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className={cn('h-3.5 w-3.5 mt-0.5 flex-shrink-0', config.iconColor)} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Multiplicador eventos</span>
              <span className={cn('font-semibold', config.color)}>x{config.multiplier}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
