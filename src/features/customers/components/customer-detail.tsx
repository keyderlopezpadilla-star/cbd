'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShoppingBag,
  Star,
  TrendingUp,
  Crown,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Customer } from '@/types'
import { LoyaltyTier, DEMO_STORES } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getCustomerSegment, getSegmentLabel, getSegmentColor } from '@/lib/mock-data/customers'
import { PurchaseHistory } from './purchase-history'
import { GDPRPanel } from './gdpr-panel'

interface CustomerDetailProps {
  customer: Customer
}

function getTierInfo(tier: LoyaltyTier): { label: string; color: string; nextTier: string | null; pointsToNext: number } {
  switch (tier) {
    case LoyaltyTier.BLACK:
      return { label: 'Black', color: 'text-white', nextTier: null, pointsToNext: 0 }
    case LoyaltyTier.VIP:
      return { label: 'VIP', color: 'text-purple-400', nextTier: 'Black', pointsToNext: 5000 }
    case LoyaltyTier.PREMIUM:
      return { label: 'Premium', color: 'text-amber-400', nextTier: 'VIP', pointsToNext: 2000 }
    default:
      return { label: 'Starter', color: 'text-zinc-400', nextTier: 'Premium', pointsToNext: 500 }
  }
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState('info')
  const segment = getCustomerSegment(customer)
  const tierInfo = getTierInfo(customer.loyaltyTier)
  const store = DEMO_STORES.find((s) => s.id === customer.preferredStoreId)

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass border-cbd-green/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-cbd-green/10 border-2 border-cbd-green/30 flex items-center justify-center">
                <User className="h-10 w-10 text-cbd-green" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
                  <Badge variant="outline" className={getSegmentColor(segment)}>
                    {getSegmentLabel(segment)}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> {customer.email}
                  </span>
                  {customer.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> {customer.phone}
                    </span>
                  )}
                  {store && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {store.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{customer.totalPurchases}</p>
                  <p className="text-xs text-muted-foreground">Compras</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{formatCurrency(customer.totalSpent)}</p>
                  <p className="text-xs text-muted-foreground">Total Gastado</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{formatCurrency(customer.averageTicket)}</p>
                  <p className="text-xs text-muted-foreground">Ticket Medio</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-background/50 border border-white/10">
          <TabsTrigger value="info" className="data-[state=active]:bg-cbd-green/20 data-[state=active]:text-cbd-green">
            <User className="h-4 w-4 mr-2" />
            Informacion
          </TabsTrigger>
          <TabsTrigger value="purchases" className="data-[state=active]:bg-cbd-green/20 data-[state=active]:text-cbd-green">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Compras
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="data-[state=active]:bg-cbd-green/20 data-[state=active]:text-cbd-green">
            <Crown className="h-4 w-4 mr-2" />
            Fidelidad
          </TabsTrigger>
          <TabsTrigger value="gdpr" className="data-[state=active]:bg-cbd-green/20 data-[state=active]:text-cbd-green">
            <MessageSquare className="h-4 w-4 mr-2" />
            GDPR
          </TabsTrigger>
        </TabsList>

        {/* Info Tab */}
        <TabsContent value="info" className="mt-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card className="glass border-cbd-green/20">
              <CardHeader>
                <CardTitle className="text-sm text-white">Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Nombre</p>
                    <p className="text-sm text-white">{customer.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm text-white">{customer.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Telefono</p>
                    <p className="text-sm text-white">{customer.phone || 'No proporcionado'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Fecha de Nacimiento</p>
                    <p className="text-sm text-white">
                      {customer.birthDate ? formatDate(customer.birthDate) : 'No proporcionada'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Tienda Preferida</p>
                    <p className="text-sm text-white">{store?.name || 'No asignada'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Cliente Desde</p>
                    <p className="text-sm text-white">{formatDate(customer.createdAt)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Ultima Compra</p>
                    <p className="text-sm text-white">
                      {customer.lastPurchase ? formatDate(customer.lastPurchase) : 'Sin compras'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Consentimiento Marketing</p>
                    <Badge variant="outline" className={customer.marketingConsent ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}>
                      {customer.marketingConsent ? 'Aceptado' : 'No aceptado'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Purchases Tab */}
        <TabsContent value="purchases" className="mt-6">
          <PurchaseHistory customerId={customer.id} />
        </TabsContent>

        {/* Loyalty Tab */}
        <TabsContent value="loyalty" className="mt-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass border-cbd-green/20">
                <CardHeader>
                  <CardTitle className="text-sm text-white">Estado de Fidelidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-cbd-green/10 border-2 border-cbd-green/30 flex items-center justify-center">
                      <Crown className={`h-8 w-8 ${tierInfo.color}`} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">Tier {tierInfo.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.loyaltyPoints.toLocaleString()} puntos acumulados
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  {tierInfo.nextTier && (
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Progreso a {tierInfo.nextTier}</span>
                        <span className="text-white">
                          {customer.loyaltyPoints} / {tierInfo.pointsToNext}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cbd-green rounded-full transition-all"
                          style={{ width: `${Math.min((customer.loyaltyPoints / tierInfo.pointsToNext) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                      <p className="text-xs text-muted-foreground">Puntos Disponibles</p>
                      <p className="text-lg font-bold text-cbd-green">{customer.loyaltyPoints.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 border border-white/10">
                      <p className="text-xs text-muted-foreground">Valor en EUR</p>
                      <p className="text-lg font-bold text-white">{formatCurrency(customer.loyaltyPoints * 0.01)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-cbd-green/20">
                <CardHeader>
                  <CardTitle className="text-sm text-white">Beneficios del Tier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                      <Star className="h-4 w-4 text-cbd-green" />
                      <span className="text-sm text-white">
                        {customer.loyaltyTier === LoyaltyTier.BLACK ? '3x' :
                         customer.loyaltyTier === LoyaltyTier.VIP ? '2x' :
                         customer.loyaltyTier === LoyaltyTier.PREMIUM ? '1.5x' : '1x'} puntos por compra
                      </span>
                    </div>
                    {(customer.loyaltyTier === LoyaltyTier.VIP || customer.loyaltyTier === LoyaltyTier.BLACK) && (
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                        <TrendingUp className="h-4 w-4 text-cbd-green" />
                        <span className="text-sm text-white">Envio gratuito</span>
                      </div>
                    )}
                    {customer.loyaltyTier === LoyaltyTier.BLACK && (
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                        <Crown className="h-4 w-4 text-cbd-green" />
                        <span className="text-sm text-white">Acceso exclusivo a nuevos productos</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                      <Calendar className="h-4 w-4 text-cbd-green" />
                      <span className="text-sm text-white">
                        Descuento cumpleanos: {customer.loyaltyTier === LoyaltyTier.BLACK ? '20%' :
                         customer.loyaltyTier === LoyaltyTier.VIP ? '15%' :
                         customer.loyaltyTier === LoyaltyTier.PREMIUM ? '10%' : '5%'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        {/* GDPR Tab */}
        <TabsContent value="gdpr" className="mt-6">
          <GDPRPanel customerId={customer.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
