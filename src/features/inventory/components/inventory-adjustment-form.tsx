'use client'

import { useState, useMemo } from 'react'
import { Save, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StockStatusBadge } from '@/components/ui/stock-status-badge'
import { DEMO_STORES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  mockInventoryItems,
  getProductName,
} from '@/lib/mock-data/inventory'
import { InventoryItem } from '@/types'

const ADJUSTMENT_REASONS = [
  { value: 'damage', label: 'Dano / Rotura' },
  { value: 'count_correction', label: 'Correccion de conteo' },
  { value: 'returns', label: 'Devolucion' },
  { value: 'expired', label: 'Caducado' },
  { value: 'other', label: 'Otro' },
]

export function InventoryAdjustmentForm() {
  const [selectedStore, setSelectedStore] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [newQuantity, setNewQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const storeProducts = useMemo(() => {
    if (!selectedStore) return []
    return mockInventoryItems.filter((item) => item.storeId === selectedStore)
  }, [selectedStore])

  const selectedItem: InventoryItem | undefined = useMemo(() => {
    if (!selectedProduct || !selectedStore) return undefined
    return mockInventoryItems.find(
      (item) => item.productId === selectedProduct && item.storeId === selectedStore
    )
  }, [selectedProduct, selectedStore])

  const difference = useMemo(() => {
    if (!selectedItem || newQuantity === '') return null
    return Number(newQuantity) - selectedItem.quantity
  }, [selectedItem, newQuantity])

  const isValid = selectedStore && selectedProduct && newQuantity !== '' && reason && selectedItem

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleStoreChange = (value: string) => {
    setSelectedStore(value)
    setSelectedProduct('')
    setNewQuantity('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Form fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Tienda</label>
            <Select value={selectedStore} onValueChange={handleStoreChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tienda" />
              </SelectTrigger>
              <SelectContent>
                {DEMO_STORES.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Producto</label>
            <Select
              value={selectedProduct}
              onValueChange={setSelectedProduct}
              disabled={!selectedStore}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedStore ? 'Seleccionar producto' : 'Selecciona una tienda primero'} />
              </SelectTrigger>
              <SelectContent>
                {storeProducts.map((item) => (
                  <SelectItem key={item.productId} value={item.productId}>
                    {getProductName(item.productId)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Nueva cantidad</label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              disabled={!selectedItem}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Razon del ajuste</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar razon" />
              </SelectTrigger>
              <SelectContent>
                {ADJUSTMENT_REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Notas</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Notas adicionales sobre el ajuste..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full bg-cbd-green text-black hover:bg-cbd-green/90 gap-2"
          >
            <Save className="h-4 w-4" />
            {submitted ? 'Ajuste registrado!' : 'Registrar Ajuste'}
          </Button>
        </div>

        {/* Right: Current stock info */}
        <div>
          {selectedItem ? (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4 text-cbd-green" />
                  Info Stock Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-card/50 p-3">
                    <p className="text-xs text-muted-foreground">Cantidad Actual</p>
                    <p className="text-2xl font-bold text-foreground">{selectedItem.quantity}</p>
                  </div>
                  <div className="rounded-md bg-card/50 p-3">
                    <p className="text-xs text-muted-foreground">Estado</p>
                    <div className="mt-1">
                      <StockStatusBadge status={selectedItem.status} />
                    </div>
                  </div>
                  <div className="rounded-md bg-card/50 p-3">
                    <p className="text-xs text-muted-foreground">Stock Minimo</p>
                    <p className="text-lg font-semibold text-foreground">{selectedItem.minStock}</p>
                  </div>
                  <div className="rounded-md bg-card/50 p-3">
                    <p className="text-xs text-muted-foreground">Stock Maximo</p>
                    <p className="text-lg font-semibold text-foreground">{selectedItem.maxStock}</p>
                  </div>
                </div>

                {difference !== null && (
                  <div className={cn(
                    'rounded-md p-4 text-center',
                    difference > 0 ? 'bg-cbd-green/10' : difference < 0 ? 'bg-red-500/10' : 'bg-card/50'
                  )}>
                    <p className="text-xs text-muted-foreground mb-1">Diferencia</p>
                    <p className={cn(
                      'text-3xl font-bold',
                      difference > 0 ? 'text-cbd-green' : difference < 0 ? 'text-red-500' : 'text-muted-foreground'
                    )}>
                      {difference > 0 ? '+' : ''}{difference}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedItem.quantity} &rarr; {Number(newQuantity)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="glass border-border/50">
              <CardContent className="py-12 text-center">
                <Package className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Selecciona una tienda y producto para ver la info de stock
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </form>
  )
}
