'use client'

import { useState } from 'react'
import { Save, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { TIER_CONFIGS, TierConfig } from '@/lib/mock-data/loyalty'

export function TierManagement() {
  const [tiers, setTiers] = useState<TierConfig[]>(TIER_CONFIGS)
  const [hasChanges, setHasChanges] = useState(false)

  const handleThresholdChange = (index: number, field: 'minPoints' | 'maxPoints', value: string) => {
    const updated = [...tiers]
    const numValue = parseInt(value) || 0
    if (field === 'maxPoints') {
      updated[index] = { ...updated[index], maxPoints: value === '' ? null : numValue }
    } else {
      updated[index] = { ...updated[index], minPoints: numValue }
    }
    setTiers(updated)
    setHasChanges(true)
  }

  const handleMultiplierChange = (index: number, value: string) => {
    const updated = [...tiers]
    updated[index] = { ...updated[index], multiplier: parseFloat(value) || 1 }
    setTiers(updated)
    setHasChanges(true)
  }

  const handleDiscountChange = (index: number, value: string) => {
    const updated = [...tiers]
    updated[index] = { ...updated[index], discount: parseInt(value) || 0 }
    setTiers(updated)
    setHasChanges(true)
  }

  const handleReset = () => {
    setTiers(TIER_CONFIGS)
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
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">
              Configuracion de Tiers
            </CardTitle>
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
                Guardar Cambios
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tiers.map((tier, index) => (
              <div key={tier.tier}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn('w-3 h-3 rounded-full', tier.bgColor, tier.borderColor, 'border')} />
                  <h3 className={cn('text-base font-semibold', tier.color)}>{tier.name}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-6">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Puntos Minimos</Label>
                    <Input
                      type="number"
                      value={tier.minPoints}
                      onChange={(e) => handleThresholdChange(index, 'minPoints', e.target.value)}
                      className="bg-background/50 border-border/50"
                      disabled={index === 0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Puntos Maximos</Label>
                    <Input
                      type="number"
                      value={tier.maxPoints ?? ''}
                      onChange={(e) => handleThresholdChange(index, 'maxPoints', e.target.value)}
                      placeholder="Sin limite"
                      className="bg-background/50 border-border/50"
                      disabled={index === tiers.length - 1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Descuento (%)</Label>
                    <Input
                      type="number"
                      value={tier.discount}
                      onChange={(e) => handleDiscountChange(index, e.target.value)}
                      className="bg-background/50 border-border/50"
                      min={0}
                      max={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Multiplicador Eventos</Label>
                    <Input
                      type="number"
                      value={tier.multiplier}
                      onChange={(e) => handleMultiplierChange(index, e.target.value)}
                      className="bg-background/50 border-border/50"
                      step={0.5}
                      min={1}
                    />
                  </div>
                </div>
                <div className="pl-6 mt-3">
                  <Label className="text-xs text-muted-foreground">Beneficios</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {tier.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className={cn(
                          'text-xs px-2 py-1 rounded-full border',
                          tier.bgColor,
                          tier.borderColor,
                          tier.color
                        )}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                {index < tiers.length - 1 && <Separator className="mt-6 bg-border/30" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
