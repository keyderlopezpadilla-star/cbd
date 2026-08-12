'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Search, ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, formatCurrency } from '@/lib/utils'
import { mockProducts } from '@/lib/mock-data/products'
import { getCustomers } from '@/lib/mock-data/orders'
import { MOCK_STORES } from '@/lib/mock-data/stores'

interface OrderFormItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

interface OrderFormData {
  customerId: string
  storeId: string
  items: OrderFormItem[]
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  notes: string
}

interface OrderFormProps {
  onSubmit?: (data: OrderFormData) => void
  onCancel?: () => void
}

export function OrderForm({ onSubmit, onCancel }: OrderFormProps) {
  const customers = getCustomers()
  const [productSearch, setProductSearch] = useState('')
  const [showProductSearch, setShowProductSearch] = useState(false)

  const [formData, setFormData] = useState<OrderFormData>({
    customerId: '',
    storeId: '',
    items: [],
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Espana',
    },
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredProducts = mockProducts.filter(
    (p) =>
      p.isActive &&
      (p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase()))
  )

  const addProduct = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return

    const existingIndex = formData.items.findIndex((i) => i.productId === productId)
    if (existingIndex >= 0) {
      const updated = [...formData.items]
      updated[existingIndex].quantity += 1
      updated[existingIndex].total = updated[existingIndex].quantity * updated[existingIndex].price
      setFormData({ ...formData, items: updated })
    } else {
      setFormData({
        ...formData,
        items: [
          ...formData.items,
          {
            productId: product.id,
            productName: product.name,
            quantity: 1,
            price: product.price,
            total: product.price,
          },
        ],
      })
    }
    setProductSearch('')
    setShowProductSearch(false)
  }

  const removeProduct = (index: number) => {
    const updated = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: updated })
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return
    const updated = [...formData.items]
    updated[index].quantity = quantity
    updated[index].total = quantity * updated[index].price
    setFormData({ ...formData, items: updated })
  }

  const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.21
  const shipping = subtotal >= 50 ? 0 : 4.99
  const total = subtotal + tax + shipping

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.customerId) newErrors.customerId = 'Selecciona un cliente'
    if (!formData.storeId) newErrors.storeId = 'Selecciona una tienda'
    if (formData.items.length === 0) newErrors.items = 'Anade al menos un producto'
    if (!formData.shippingAddress.street) newErrors.street = 'Direccion requerida'
    if (!formData.shippingAddress.city) newErrors.city = 'Ciudad requerida'
    if (!formData.shippingAddress.postalCode) newErrors.postalCode = 'Codigo postal requerido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate() && onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Customer & Products */}
          <div className="space-y-6">
            {/* Customer Selection */}
            <Card className="glass border-cbd-green/20">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-white">
                  Datos del Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Cliente</Label>
                  <select
                    id="customer"
                    value={formData.customerId}
                    onChange={(e) =>
                      setFormData({ ...formData, customerId: e.target.value })
                    }
                    className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">Seleccionar cliente...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} - {c.email}
                      </option>
                    ))}
                  </select>
                  {errors.customerId && (
                    <p className="text-xs text-red-400">{errors.customerId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store">Tienda</Label>
                  <select
                    id="store"
                    value={formData.storeId}
                    onChange={(e) =>
                      setFormData({ ...formData, storeId: e.target.value })
                    }
                    className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">Seleccionar tienda...</option>
                    {MOCK_STORES.filter((s) => s.isActive).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.storeId && (
                    <p className="text-xs text-red-400">{errors.storeId}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card className="glass border-cbd-green/20">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-cbd-green" />
                  Productos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar producto por nombre o SKU..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value)
                      setShowProductSearch(e.target.value.length > 0)
                    }}
                    onFocus={() => productSearch.length > 0 && setShowProductSearch(true)}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                  {showProductSearch && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-border/50 bg-card shadow-lg max-h-48 overflow-y-auto">
                      {filteredProducts.slice(0, 8).map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addProduct(product.id)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-muted/20 transition-colors flex justify-between items-center"
                        >
                          <span className="text-foreground">{product.name}</span>
                          <span className="text-cbd-green font-medium">
                            {formatCurrency(product.price)}
                          </span>
                        </button>
                      ))}
                      {filteredProducts.length === 0 && (
                        <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                          No se encontraron productos
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {errors.items && (
                  <p className="text-xs text-red-400">{errors.items}</p>
                )}

                {/* Items List */}
                {formData.items.length > 0 && (
                  <div className="space-y-2">
                    {formData.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-border/20 bg-muted/5 p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(item.price)} / ud.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium text-foreground w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <span className="text-sm font-medium text-foreground w-20 text-right">
                          {formatCurrency(item.total)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-300"
                          onClick={() => removeProduct(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <Separator className="bg-border/30" />
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IVA (21%)</span>
                        <span className="text-foreground">{formatCurrency(tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Envio</span>
                        <span className="text-foreground">
                          {shipping === 0 ? 'Gratis' : formatCurrency(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-base pt-1">
                        <span className="text-white">Total</span>
                        <span className="text-cbd-green">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Address */}
          <div className="space-y-6">
            <Card className="glass border-cbd-green/20">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-white">
                  Direccion de Envio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Direccion</Label>
                  <Input
                    id="street"
                    placeholder="Calle, numero, piso..."
                    value={formData.shippingAddress.street}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, street: e.target.value },
                      })
                    }
                    className="bg-background/50 border-border/50"
                  />
                  {errors.street && (
                    <p className="text-xs text-red-400">{errors.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      placeholder="Ciudad"
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, city: e.target.value },
                        })
                      }
                      className="bg-background/50 border-border/50"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-400">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Codigo Postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="28001"
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, postalCode: e.target.value },
                        })
                      }
                      className="bg-background/50 border-border/50"
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-red-400">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">Provincia</Label>
                    <Input
                      id="state"
                      placeholder="Provincia"
                      value={formData.shippingAddress.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, state: e.target.value },
                        })
                      }
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pais</Label>
                    <Input
                      id="country"
                      value={formData.shippingAddress.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, country: e.target.value },
                        })
                      }
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="glass border-cbd-green/20">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-white">
                  Notas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Notas internas sobre el pedido..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground min-h-[100px] resize-none"
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                className="bg-cbd-green text-black hover:bg-cbd-green-light"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Pedido
              </Button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
