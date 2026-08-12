'use client'

import { useState } from 'react'
import { Monitor, Receipt } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProductSearch } from './product-search'
import { CartPanel } from './cart-panel'
import { PaymentDialog } from './payment-dialog'
import { DiscountSelector } from './discount-selector'
import { TicketPreview } from './ticket-preview'
import { usePOSStore } from '@/stores/pos-store'
import { motion, AnimatePresence } from 'framer-motion'

type POSView = 'terminal' | 'payment' | 'discount' | 'ticket'

export function POSTerminal() {
  const [currentView, setCurrentView] = useState<POSView>('terminal')
  const [lastSaleNumber, setLastSaleNumber] = useState<string | null>(null)
  const clearCart = usePOSStore((state) => state.clearCart)

  const handleCheckout = () => {
    setCurrentView('payment')
  }

  const handleDiscount = () => {
    setCurrentView('discount')
  }

  const handlePaymentComplete = (saleNumber: string) => {
    setLastSaleNumber(saleNumber)
    setCurrentView('ticket')
  }

  const handlePaymentCancel = () => {
    setCurrentView('terminal')
  }

  const handleCloseDiscount = () => {
    setCurrentView('terminal')
  }

  const handleNewSale = () => {
    clearCart()
    setLastSaleNumber(null)
    setCurrentView('terminal')
  }

  return (
    <div className="h-[calc(100vh-220px)] min-h-[600px]">
      <AnimatePresence mode="wait">
        {/* Main Terminal View */}
        {currentView === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full"
          >
            {/* Product Search - Left Panel (2/3) */}
            <div className="lg:col-span-2 glass border border-border/30 rounded-xl p-4 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-5 w-5 text-cbd-green" />
                <h2 className="font-semibold text-foreground">Terminal de Venta</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <ProductSearch />
              </div>
            </div>

            {/* Cart - Right Panel (1/3) */}
            <div className="glass border border-border/30 rounded-xl p-4 flex flex-col">
              <CartPanel onCheckout={handleCheckout} onDiscount={handleDiscount} />
            </div>
          </motion.div>
        )}

        {/* Payment View */}
        {currentView === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-md mx-auto glass border border-border/30 rounded-xl p-6"
          >
            <PaymentDialog
              onComplete={handlePaymentComplete}
              onCancel={handlePaymentCancel}
            />
          </motion.div>
        )}

        {/* Discount View */}
        {currentView === 'discount' && (
          <motion.div
            key="discount"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-md mx-auto glass border border-border/30 rounded-xl p-6"
          >
            <DiscountSelector onClose={handleCloseDiscount} />
          </motion.div>
        )}

        {/* Ticket Preview View */}
        {currentView === 'ticket' && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-lg mx-auto space-y-4"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Receipt className="h-5 w-5 text-cbd-green" />
              <h3 className="font-semibold text-foreground">Ticket de Venta</h3>
            </div>
            <TicketPreview saleNumber={lastSaleNumber || undefined} />
            <div className="flex justify-center">
              <button
                onClick={handleNewSale}
                className="px-6 py-2.5 rounded-lg bg-cbd-green hover:bg-cbd-green/90 text-black font-semibold text-sm transition-colors"
              >
                Nueva Venta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
