'use client'

import { useState } from 'react'
import { Percent, DollarSign, Tag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { usePOSStore, CartDiscount } from '@/stores/pos-store'

interface DiscountSelectorProps {
  onClose: () => void
}

const QUICK_DISCOUNTS = [
  { type: 'percentage' as const, value: 5, label: '5%' },
  { type: 'percentage' as const, value: 10, label: '10%' },
  { type: 'percentage' as const, value: 15, label: '15%' },
  { type: 'percentage' as const, value: 20, label: '20%' },
  { type: 'percentage' as const, value: 25, label: '25%' },
  { type: 'fixed' as const, value: 5, label: '5€' },
  { type: 'fixed' as const, value: 10, label: '10€' },
  { type: 'fixed' as const, value: 20, label: '20€' },
]

export function DiscountSelector({ onClose }: DiscountSelectorProps) {
  const { cartDiscount, setCartDiscount, subtotal } = usePOSStore()
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(
    cartDiscount?.type || 'percentage'
  )
  const [customValue, setCustomValue] = useState<string>(
    cartDiscount?.value.toString() || ''
  )

  const handleQuickDiscount = (discount: { type: 'percentage' | 'fixed'; value: number; label: string }) => {
    const newDiscount: CartDiscount = {
      type: discount.type,
      value: discount.value,
      label: discount.label,
    }
    setCartDiscount(newDiscount)
    onClose()
  }

  const handleCustomDiscount = () => {
    const value = parseFloat(customValue)
    if (isNaN(value) || value <= 0) return

    if (discountType === 'percentage' && value > 100) return
    if (discountType === 'fixed' && value > subtotal) return

    const label = discountType === 'percentage' ? `${value}%` : `${value}€`
    const newDiscount: CartDiscount = {
      type: discountType,
      value,
      label,
    }
    setCartDiscount(newDiscount)
    onClose()
  }

  const handleRemoveDiscount = () => {
    setCartDiscount(null)
    onClose()
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-cbd-green" />
          <h3 className="font-semibold text-foreground text-lg">Aplicar Descuento</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-card/50 text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Discounts */}
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Descuentos rapidos</Label>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_DISCOUNTS.map((discount) => (
            <button
              key={`${discount.type}-${discount.value}`}
              onClick={() => handleQuickDiscount(discount)}
              className={cn(
                'p-2.5 rounded-lg border text-sm font-medium transition-all',
                cartDiscount?.type === discount.type && cartDiscount?.value === discount.value
                  ? 'border-cbd-green bg-cbd-green/10 text-cbd-green'
                  : 'border-border/50 text-muted-foreground hover:border-cbd-green/50 hover:text-foreground'
              )}
            >
              {discount.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Discount */}
      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Descuento personalizado</Label>

        {/* Type Toggle */}
        <div className="flex rounded-lg border border-border/50 p-1 w-fit">
          <button
            onClick={() => setDiscountType('percentage')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              discountType === 'percentage'
                ? 'bg-cbd-green text-black'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Percent className="h-3.5 w-3.5" />
            Porcentaje
          </button>
          <button
            onClick={() => setDiscountType('fixed')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              discountType === 'fixed'
                ? 'bg-cbd-green text-black'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <DollarSign className="h-3.5 w-3.5" />
            Fijo
          </button>
        </div>

        {/* Custom Value Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="number"
              min="0"
              max={discountType === 'percentage' ? 100 : subtotal}
              step="0.01"
              placeholder={discountType === 'percentage' ? 'Ej: 12.5' : 'Ej: 15.00'}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="bg-card/50 border-border/50 pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {discountType === 'percentage' ? '%' : '€'}
            </span>
          </div>
          <Button
            onClick={handleCustomDiscount}
            className="bg-cbd-green hover:bg-cbd-green/90 text-black font-medium"
          >
            Aplicar
          </Button>
        </div>
      </div>

      {/* Remove Discount */}
      {cartDiscount && (
        <Button
          variant="outline"
          onClick={handleRemoveDiscount}
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          Eliminar descuento actual ({cartDiscount.label})
        </Button>
      )}
    </div>
  )
}
