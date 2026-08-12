'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plug,
  CreditCard,
  Truck,
  BarChart3,
  Users,
  Package,
  Wallet,
  Activity,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { INTEGRATION_CONFIGS, IntegrationConfig } from '@/lib/mock-data/settings'

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  Truck,
  Package,
  Wallet,
  BarChart3,
  Activity,
  Users,
  Mail,
}

const categoryLabels: Record<string, string> = {
  payment: 'Pagos',
  shipping: 'Envios',
  analytics: 'Analitica',
  crm: 'CRM & Marketing',
}

const categoryIcons: Record<string, React.ElementType> = {
  payment: CreditCard,
  shipping: Truck,
  analytics: BarChart3,
  crm: Users,
}

export function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>(INTEGRATION_CONFIGS)

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id
          ? {
              ...int,
              isConnected: !int.isConnected,
              status: !int.isConnected ? 'active' : 'inactive',
              lastSync: !int.isConnected ? new Date().toISOString() : int.lastSync,
            }
          : int
      )
    )
  }

  const groupedByCategory = integrations.reduce<Record<string, IntegrationConfig[]>>((acc, int) => {
    if (!acc[int.category]) acc[int.category] = []
    acc[int.category].push(int)
    return acc
  }, {})

  const getStatusBadge = (status: IntegrationConfig['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-cbd-green/20 text-cbd-green border-cbd-green/50 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Activo
          </Badge>
        )
      case 'error':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return (
          <Badge className="bg-white/10 text-muted-foreground border-white/20 text-xs">
            <XCircle className="h-3 w-3 mr-1" />
            Inactivo
          </Badge>
        )
    }
  }

  const formatLastSync = (dateStr?: string) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plug className="h-5 w-5 text-cbd-green" />
            Integraciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Conecta tu tienda con servicios externos para pagos, envios, analitica y CRM. Gestiona las conexiones activas y configura nuevas integraciones.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-cbd-green" />
              <span className="text-muted-foreground">
                {integrations.filter((i) => i.status === 'active').length} activas
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-muted-foreground">
                {integrations.filter((i) => i.status === 'error').length} con error
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-white/30" />
              <span className="text-muted-foreground">
                {integrations.filter((i) => i.status === 'inactive').length} inactivas
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Groups */}
      {Object.entries(groupedByCategory).map(([category, categoryIntegrations]) => {
        const CategoryIcon = categoryIcons[category] || Plug
        return (
          <Card key={category} className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <CategoryIcon className="h-4 w-4 text-cbd-green" />
                {categoryLabels[category] || category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryIntegrations.map((integration) => {
                const IntIcon = iconMap[integration.icon] || Plug
                return (
                  <div
                    key={integration.id}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-lg border transition-colors',
                      integration.isConnected
                        ? 'bg-black/20 border-cbd-green/20'
                        : 'bg-black/10 border-white/5'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'h-10 w-10 rounded-lg flex items-center justify-center',
                          integration.isConnected
                            ? 'bg-cbd-green/10'
                            : 'bg-white/5'
                        )}
                      >
                        <IntIcon
                          className={cn(
                            'h-5 w-5',
                            integration.isConnected ? 'text-cbd-green' : 'text-muted-foreground'
                          )}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{integration.name}</p>
                          {getStatusBadge(integration.status)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {integration.description}
                        </p>
                        {integration.lastSync && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            Ultima sync: {formatLastSync(integration.lastSync)}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => toggleConnection(integration.id)}
                      className={cn(
                        integration.isConnected
                          ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                          : 'bg-cbd-green text-black hover:bg-cbd-green/90'
                      )}
                      variant={integration.isConnected ? 'outline' : 'default'}
                    >
                      {integration.isConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )
      })}
    </motion.div>
  )
}
