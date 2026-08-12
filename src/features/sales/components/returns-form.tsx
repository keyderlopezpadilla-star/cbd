'use client'

import { useState } from 'react'
import { RotateCcw, Search, AlertCircle, Package, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency } from '@/lib/utils'
import { mockSales, RETURN_REASONS, mockReturns, ReturnReason } from '@/lib/mock-data/sales'
import { Sale, SaleItem } from '@/types'
import { motion } from 'framer-motion'

export function ReturnsForm() {
  const [saleSearch, setSaleSearch] = useState('')
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map())
  const [reason, setReason] = useState<ReturnReason | ''>('')
  const [notes, setNotes] = useState('')
  const [refundMethod, setRefundMethod] = useState<'original' | 'cash' | 'card'>('original')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSearchSale = () => {
    const found = mockSales.find(
      (s) =>
        s.saleNumber.toLowerCase() === saleSearch.toLowerCase() ||
        s.id === saleSearch
    )
    if (found) {
      setSelectedSale(found)
      setSelectedItems(new Map())
    }
  }

  const handleToggleItem = (productId: string, maxQty: number) => {
    const newItems = new Map(selectedItems)
    if (newItems.has(productId)) {
      newItems.delete(productId)
    } else {
      newItems.set(productId, maxQty)
    }
    setSelectedItems(newItems)
  }

  const handleQuantityChange = (productId: string, qty: number, maxQty: number) => {
    const newItems = new Map(selectedItems)
    if (qty <= 0) {
      newItems.delete(productId)
    } else {
      newItems.set(productId, Math.min(qty, maxQty))
    }
    setSelectedItems(newItems)
  }

  const calculateRefundAmount = (): number => {
    if (!selectedSale) return 0
    let refund = 0
    selectedItems.forEach((qty, productId) => {
      const item = selectedSale.items.find((i) => i.productId === productId)
      if (item) {
        refund += (item.price - item.discount) * qty
      }
    })
    // Add proportional tax
    const taxRate = 0.21
    refund = refund * (1 + taxRate)
    return refund
  }

  const handleSubmitReturn = () => {
    // In real app this would create the return record
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setSaleSearch('')
    setSelectedSale(null)
    setSelectedItems(new Map())
    setReason('')
    setNotes('')
    setRefundMethod('original')
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-cbd-green mb-4" />
        <h3 className="text-xl font-bold text-foreground">Devolucion Procesada</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Se ha procesado la devolucion por {formatCurrency(calculateRefundAmount())}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          El stock se actualizara automaticamente
        </p>
        <Button
          onClick={handleReset}
          className="mt-6 bg-cbd-green hover:bg-cbd-green/90 text-black font-medium"
        >
          Procesar Otra Devolucion
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Sale */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-cbd-green" />
          <h3 className="font-semibold text-foreground text-lg">Procesar Devolucion</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Introduce el numero de ticket para buscar la venta original
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ej: VTA-2024-0001"
              value={saleSearch}
              onChange={(e) => setSaleSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSale()}
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>
          <Button onClick={handleSearchSale} variant="outline">
            Buscar
          </Button>
        </div>
      </div>

      {/* Selected Sale Details */}
      {selectedSale && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Sale Info */}
          <div className="p-4 rounded-xl border border-border/30 bg-card/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {selectedSale.saleNumber}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedSale.createdAt.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Badge className="bg-cbd-green/10 text-cbd-green border-cbd-green/20">
                {formatCurrency(selectedSale.total)}
              </Badge>
            </div>

            {/* Items to Return */}
            <Label className="text-sm text-muted-foreground">Selecciona productos a devolver</Label>
            <div className="space-y-2 mt-2">
              {selectedSale.items.map((item) => {
                const isSelected = selectedItems.has(item.productId)
                const selectedQty = selectedItems.get(item.productId) || 0
                return (
                  <div
                    key={item.productId}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer',
                      isSelected
                        ? 'border-cbd-green/50 bg-cbd-green/5'
                        : 'border-border/30 hover:border-border/50'
                    )}
                    onClick={() => handleToggleItem(item.productId, item.quantity)}
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-md border border-border/50">
                      {isSelected && (
                        <div className="w-3 h-3 rounded-sm bg-cbd-green" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.total)}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Label className="text-xs text-muted-foreground">Uds:</Label>
                        <Input
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={selectedQty}
                          onChange={(e) =>
                            handleQuantityChange(item.productId, parseInt(e.target.value) || 0, item.quantity)
                          }
                          className="w-16 h-7 text-xs bg-card/50 border-border/50"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reason */}
          {selectedItems.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <Label className="text-sm text-muted-foreground">Motivo de la devolucion</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {RETURN_REASONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setReason(r.value)}
                      className={cn(
                        'p-2.5 rounded-lg border text-xs font-medium transition-all text-left',
                        reason === r.value
                          ? 'border-cbd-green bg-cbd-green/10 text-cbd-green'
                          : 'border-border/50 text-muted-foreground hover:border-cbd-green/50'
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-sm text-muted-foreground">Notas (opcional)</Label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Descripcion adicional del motivo..."
                  className="mt-1.5 w-full p-3 rounded-lg bg-card/50 border border-border/50 text-sm text-foreground resize-none h-20 placeholder:text-muted-foreground"
                />
              </div>

              {/* Refund Method */}
              <div>
                <Label className="text-sm text-muted-foreground">Metodo de reembolso</Label>
                <div className="flex gap-2 mt-2">
                  {[
                    { value: 'original' as const, label: 'Metodo original' },
                    { value: 'cash' as const, label: 'Efectivo' },
                    { value: 'card' as const, label: 'Tarjeta' },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setRefundMethod(method.value)}
                      className={cn(
                        'px-3 py-2 rounded-lg border text-xs font-medium transition-all',
                        refundMethod === method.value
                          ? 'border-cbd-green bg-cbd-green/10 text-cbd-green'
                          : 'border-border/50 text-muted-foreground hover:border-cbd-green/50'
                      )}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/30" />

              {/* Refund Summary */}
              <div className="p-4 rounded-xl border border-border/30 bg-card/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Importe a devolver</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedItems.size} producto(s), IVA incluido
                    </p>
                  </div>
                  <span className="text-xl font-bold text-cbd-green">
                    {formatCurrency(calculateRefundAmount())}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmitReturn}
                  disabled={!reason || selectedItems.size === 0}
                  className="flex-1 bg-cbd-green hover:bg-cbd-green/90 text-black font-semibold"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Procesar Devolucion
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Recent Returns */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Devoluciones Recientes</h4>
        <div className="space-y-2">
          {mockReturns.map((ret) => (
            <div key={ret.id} className="p-3 rounded-lg border border-border/20 bg-card/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-medium text-foreground">{ret.saleNumber}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {RETURN_REASONS.find((r) => r.value === ret.reason)?.label} -{' '}
                    {ret.createdAt.toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {ret.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                  </p>
                </div>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                  -{formatCurrency(ret.refundAmount)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
