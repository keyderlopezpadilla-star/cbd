'use client'

import { motion } from 'framer-motion'
import { User, ShoppingBag, Star, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Customer } from '@/types'
import { LoyaltyTier } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { getCustomerSegment, getSegmentLabel, getSegmentColor } from '@/lib/mock-data/customers'
import { DEMO_STORES } from '@/lib/constants'
import Link from 'next/link'

interface CustomerCardProps {
  customer: Customer
  index?: number
}

function getTierColor(tier: LoyaltyTier): string {
  switch (tier) {
    case LoyaltyTier.BLACK:
      return 'bg-gray-900 text-white border-gray-600'
    case LoyaltyTier.VIP:
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case LoyaltyTier.PREMIUM:
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    default:
      return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
  }
}

function getTierLabel(tier: LoyaltyTier): string {
  switch (tier) {
    case LoyaltyTier.BLACK: return 'Black'
    case LoyaltyTier.VIP: return 'VIP'
    case LoyaltyTier.PREMIUM: return 'Premium'
    default: return 'Starter'
  }
}

export function CustomerCard({ customer, index = 0 }: CustomerCardProps) {
  const segment = getCustomerSegment(customer)
  const store = DEMO_STORES.find((s) => s.id === customer.preferredStoreId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/dashboard/customers/${customer.id}`}>
        <Card className="glass border-cbd-green/20 card-hover cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-cbd-green" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {customer.name}
                  </h3>
                  <Badge variant="outline" className={getTierColor(customer.loyaltyTier)}>
                    {getTierLabel(customer.loyaltyTier)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{customer.email}</p>

                {/* Metrics */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ShoppingBag className="h-3 w-3" />
                    <span>{customer.totalPurchases} compras</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3" />
                    <span>{customer.loyaltyPoints} pts</span>
                  </div>
                  {store && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{store.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className={getSegmentColor(segment)}>
                  {getSegmentLabel(segment)}
                </Badge>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(customer.totalSpent)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
