'use client'

import { Minus, Plus, Trash2, ShoppingCart, Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, formatCurrency } from '@/lib/utils'
import { usePOSStore } from '@/stores/pos-store'
import { DEFAULT_TAX_RATE } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'

interface CartPanelProps {
  onCheckout: () => void
  onDiscount: () => void
}

export function CartPanel({ onCheckout, onDiscount }: CartPanelProps) {
  const {
    items,
    subtotal,
    discountAmount,
    taxAmount,
    total,
    cartDiscount,
    customerName,
    removeItem,
    updateQuantity,
  } = usePOSStore()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Cart Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/30">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-cbd-green" />
          <h3 className="font-semibold text-foreground">Carrito</h3>
          {itemCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-cbd-green/20 text-cbd-green text-xs font-medium">
              {itemCount}
            </span>
          )}
        </div>
        {customerName && (
          <span className="text-xs text-muted-foreground">
            Cliente: <span className="text-foreground">{customerName}</span>
          </span>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2 min-h-0">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.productId}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 p-2 rounded-lg bg-card/30 border border-border/20"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.productName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(item.price)} x {item.quantity}
                </p>
                {item.discount > 0 && (
                  <p className="text-xs text-cbd-green flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    -{formatCurrency(item.discount * item.quantity)} dto.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-medium text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="p-1 rounded-md hover:bg-cbd-green/10 text-muted-foreground hover:text-cbd-green transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors ml-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-right min-w-[70px]">
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(item.total)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Carrito vacio</p>
            <p className="text-xs text-muted-foreground/70">Selecciona productos para comenzar</p>
          </div>
        )}
      </div>

      {/* Cart Footer - Totals */}
      {items.length > 0 && (
        <div className="pt-3 border-t border-border/30 space-y-3">
          {/* Discount Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onDiscount}
            className="w-full border-dashed border-cbd-green/30 text-cbd-green hover:bg-cbd-green/10"
          >
            <Percent className="h-4 w-4 mr-2" />
            {cartDiscount ? `Descuento: ${cartDiscount.label}` : 'Aplicar descuento'}
          </Button>

          {/* Totals */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatCurrency(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-cbd-green">Descuento</span>
                <span className="text-cbd-green">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IVA ({DEFAULT_TAX_RATE}%)</span>
              <span className="text-foreground">{formatCurrency(taxAmount)}</span>
            </div>
            <Separator className="bg-border/30" />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-cbd-green">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={onCheckout}
            className="w-full bg-cbd-green hover:bg-cbd-green/90 text-black font-semibold h-12 text-base"
          >
            Cobrar {formatCurrency(total)}
          </Button>
        </div>
      )}
    </div>
  )
}
