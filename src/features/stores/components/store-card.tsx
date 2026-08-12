'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, ShoppingBag, DollarSign, User } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'
import { Store } from '@/types'
import { getStoreManager, getStoreKPIs } from '@/lib/mock-data/stores'

interface StoreCardProps {
  store: Store
  index?: number
}

export function StoreCard({ store, index = 0 }: StoreCardProps) {
  const router = useRouter()
  const manager = getStoreManager(store.managerId)
  const kpis = getStoreKPIs(store.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          'glass border-cbd-green/10 card-hover cursor-pointer group relative overflow-hidden',
          !store.isActive && 'opacity-70'
        )}
        onClick={() => router.push(`/dashboard/stores/${store.id}`)}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cbd-green/5 to-transparent pointer-events-none" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-cbd-green transition-colors">
                {store.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-cbd-gray-light">
                <MapPin className="h-3.5 w-3.5" />
                <span>{store.city}, {store.country}</span>
              </div>
            </div>
            <Badge variant={store.isActive ? 'success' : 'destructive'}>
              <span className={cn(
                'w-1.5 h-1.5 rounded-full mr-1.5',
                store.isActive ? 'bg-cbd-black' : 'bg-white'
              )} />
              {store.isActive ? 'Activa' : 'Inactiva'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Manager */}
          {manager && (
            <div className="flex items-center gap-2 text-sm text-cbd-gray-light">
              <User className="h-3.5 w-3.5" />
              <span>{manager.name}</span>
            </div>
          )}

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-cbd-black/50">
              <DollarSign className="h-4 w-4 text-cbd-green" />
              <div>
                <p className="text-xs text-cbd-gray-light">Ventas hoy</p>
                <p className="text-sm font-semibold text-white">
                  {kpis ? formatCurrency(kpis.dailySales) : '-'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-cbd-black/50">
              <ShoppingBag className="h-4 w-4 text-cbd-green" />
              <div>
                <p className="text-xs text-cbd-gray-light">Pedidos</p>
                <p className="text-sm font-semibold text-white">
                  {kpis ? kpis.dailyOrders : '-'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
