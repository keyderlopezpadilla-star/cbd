'use client'

import { useState } from 'react'
import { Settings, Save, Calendar, Zap, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { MOCK_LOYALTY_CONFIG, LoyaltyConfig, BonusEvent } from '@/lib/mock-data/loyalty'

export function LoyaltyConfigPanel() {
  const [config, setConfig] = useState<LoyaltyConfig>(MOCK_LOYALTY_CONFIG)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = <K extends keyof LoyaltyConfig>(field: K, value: LoyaltyConfig[K]) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleReset = () => {
    setConfig(MOCK_LOYALTY_CONFIG)
    setHasChanges(false)
  }

  const handleSave = () => {
    // In a real app, this would persist to the backend
    setHasChanges(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* General Configuration */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-cbd-green" />
              <CardTitle className="text-lg font-semibold text-foreground">
                Configuracion General
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={!hasChanges}
                className="border-border/50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Resetear
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-cbd-green text-black hover:bg-cbd-green-light"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Points Settings */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Sistema de Puntos</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Puntos por Euro</Label>
                <Input
                  type="number"
                  value={config.pointsPerEuro}
                  onChange={(e) =>
                    handleChange('pointsPerEuro', parseInt(e.target.value) || 1)
                  }
                  className="bg-background/50 border-border/50"
                  min={1}
                />
                <p className="text-[10px] text-muted-foreground">
                  Cada euro gastado = X puntos
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Valor Punto (EUR)</Label>
                <Input
                  type="number"
                  value={config.pointsRedemptionValue}
                  onChange={(e) =>
                    handleChange('pointsRedemptionValue', parseFloat(e.target.value) || 0.01)
                  }
                  className="bg-background/50 border-border/50"
                  step={0.001}
                  min={0.001}
                />
                <p className="text-[10px] text-muted-foreground">
                  1 punto = {config.pointsRedemptionValue}EUR al canjear
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Dias hasta Expiracion</Label>
                <Input
                  type="number"
                  value={config.expiryDays}
                  onChange={(e) =>
                    handleChange('expiryDays', parseInt(e.target.value) || 365)
                  }
                  className="bg-background/50 border-border/50"
                  min={30}
                />
                <p className="text-[10px] text-muted-foreground">
                  Puntos expiran tras {config.expiryDays} dias sin actividad
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Tier Upgrade Rules */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Reglas de Upgrade/Downgrade</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-Upgrade</p>
                  <p className="text-[10px] text-muted-foreground">
                    Subir tier automaticamente al alcanzar puntos
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChange('enableAutoUpgrade', !config.enableAutoUpgrade)}
                  className={cn(
                    'text-xs',
                    config.enableAutoUpgrade
                      ? 'bg-cbd-green/10 border-cbd-green/30 text-cbd-green'
                      : 'border-border/50'
                  )}
                >
                  {config.enableAutoUpgrade ? 'Activo' : 'Inactivo'}
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-Downgrade</p>
                  <p className="text-[10px] text-muted-foreground">
                    Bajar tier por inactividad prolongada
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChange('enableAutoDowngrade', !config.enableAutoDowngrade)}
                  className={cn(
                    'text-xs',
                    config.enableAutoDowngrade
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'border-border/50'
                  )}
                >
                  {config.enableAutoDowngrade ? 'Activo' : 'Inactivo'}
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Dias Inactividad para Downgrade
                </Label>
                <Input
                  type="number"
                  value={config.downgradeInactivityDays}
                  onChange={(e) =>
                    handleChange('downgradeInactivityDays', parseInt(e.target.value) || 180)
                  }
                  className="bg-background/50 border-border/50"
                  disabled={!config.enableAutoDowngrade}
                  min={30}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Events */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Eventos Bonus
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            Multiplicadores de puntos temporales para eventos especiales
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {config.bonusEvents.map((event) => (
              <BonusEventRow key={event.id} event={event} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function BonusEventRow({ event }: { event: BonusEvent }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50">
      <div className="flex items-center gap-3">
        <div className={cn(
          'p-2 rounded-lg',
          event.isActive ? 'bg-cbd-green/10' : 'bg-background/50'
        )}>
          <Calendar className={cn(
            'h-4 w-4',
            event.isActive ? 'text-cbd-green' : 'text-muted-foreground'
          )} />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{event.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={cn(
            'text-xs',
            event.isActive
              ? 'border-cbd-green/30 text-cbd-green bg-cbd-green/10'
              : 'border-border/50 text-muted-foreground'
          )}
        >
          x{event.multiplier}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            'text-xs',
            event.isActive
              ? 'border-cbd-green/30 text-cbd-green'
              : 'border-border/50 text-muted-foreground'
          )}
        >
          {event.isActive ? 'Activo' : 'Programado'}
        </Badge>
      </div>
    </div>
  )
}
