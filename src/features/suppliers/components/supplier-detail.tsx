'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Star,
  Package,
  Clock,
  TrendingUp,
  User,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Supplier,
  getSupplierStatusColor,
  getSupplierStatusLabel,
  getPaymentTermsLabel,
  getOrderStatusColor,
  getOrderStatusLabel,
} from '@/lib/mock-data/suppliers'
import { SupplierEvaluation } from './supplier-evaluation'
import Link from 'next/link'

interface SupplierDetailProps {
  supplier: Supplier
}

type TabId = 'info' | 'orders' | 'products' | 'evaluation'

export function SupplierDetail({ supplier }: SupplierDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('info')

  const tabs: { id: TabId; label: string }[] = [
    { id: 'info', label: 'Informacion' },
    { id: 'orders', label: 'Pedidos' },
    { id: 'products', label: 'Productos' },
    { id: 'evaluation', label: 'Evaluacion' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/suppliers">
          <Button variant="outline" size="icon" className="border-white/10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{supplier.company}</h1>
            <Badge variant="outline" className={getSupplierStatusColor(supplier.status)}>
              {getSupplierStatusLabel(supplier.status)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {supplier.name} - {supplier.city}, {supplier.country}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(supplier.rating)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-600'
              }`}
            />
          ))}
          <span className="ml-2 text-lg font-bold text-white">{supplier.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === tab.id
                ? 'text-cbd-green border-cbd-green'
                : 'text-muted-foreground border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Contact Info */}
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Informacion de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">{supplier.address}, {supplier.city}, {supplier.country}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">Lead Time: {supplier.leadTimeDays} dias</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">Condiciones: {getPaymentTermsLabel(supplier.paymentTerms)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Persons */}
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Personas de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supplier.contactPersons.map((person) => (
                <div key={person.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center">
                    <User className="h-4 w-4 text-cbd-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">{person.name}</p>
                      {person.isPrimary && (
                        <Badge variant="outline" className="bg-cbd-green/10 text-cbd-green border-cbd-green/30 text-[10px]">
                          Principal
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{person.email} | {person.phone}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card className="glass border-cbd-green/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-white">Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{supplier.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Total Pedidos</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{formatCurrency(supplier.totalSpent)}</p>
                  <p className="text-xs text-muted-foreground">Total Invertido</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{supplier.onTimeDeliveryRate}%</p>
                  <p className="text-xs text-muted-foreground">Puntualidad</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{supplier.qualityScore.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Calidad</p>
                </div>
              </div>
              {supplier.notes && (
                <div className="mt-4 p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-muted-foreground mb-1">Notas:</p>
                  <p className="text-sm text-white">{supplier.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Historial de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplier.orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cbd-green/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-cbd-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.products.join(', ')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <Badge variant="outline" className={getOrderStatusColor(order.status)}>
                        {getOrderStatusLabel(order.status)}
                      </Badge>
                      <p className="text-sm font-medium text-white">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass border-cbd-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Productos Suministrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {supplier.productsSupplied.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-cbd-green/10 flex items-center justify-center">
                      <Package className="h-4 w-4 text-cbd-green" />
                    </div>
                    <span className="text-sm text-white">{product}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">Categorias:</p>
                <div className="flex gap-2 flex-wrap">
                  {supplier.categories.map((cat) => (
                    <Badge key={cat} variant="outline" className="bg-cbd-green/10 text-cbd-green border-cbd-green/30">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'evaluation' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SupplierEvaluation supplier={supplier} />
        </motion.div>
      )}
    </div>
  )
}
