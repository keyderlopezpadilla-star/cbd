'use client'

import { useState } from 'react'
import { Banknote, CreditCard, Wallet, CheckCircle2, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn, formatCurrency } from '@/lib/utils'
import { usePOSStore } from '@/stores/pos-store'
import { PaymentMethod, PAYMENT_METHODS, generateSaleNumber } from '@/lib/mock-data/sales'
import { motion, AnimatePresence } from 'framer-motion'

interface PaymentDialogProps {
  onComplete: (saleNumber: string) => void
  onCancel: () => void
}

const PAYMENT_ICONS = {
  cash: Banknote,
  card: CreditCard,
  mixed: Wallet,
}

const QUICK_CASH_AMOUNTS = [5, 10, 20, 50, 100, 200]

export function PaymentDialog({ onComplete, onCancel }: PaymentDialogProps) {
  const {
    total,
    paymentMethod,
    cashReceived,
    cashAmount,
    cardAmount,
    setPaymentMethod,
    setCashReceived,
    setCashAmount,
    setCardAmount,
  } = usePOSStore()

  const [step, setStep] = useState<'method' | 'details' | 'complete'>('method')
  const [processingPayment, setProcessingPayment] = useState(false)

  const change = paymentMethod === 'cash' ? Math.max(0, cashReceived - total) : 0
  const mixedTotal = cashAmount + cardAmount
  const mixedValid = paymentMethod === 'mixed' ? mixedTotal >= total : true

  const handleSelectMethod = (method: PaymentMethod) => {
    setPaymentMethod(method)
    if (method === 'card') {
      setStep('details')
    } else {
      setStep('details')
    }
  }

  const handleProcessPayment = () => {
    if (paymentMethod === 'cash' && cashReceived < total) return
    if (paymentMethod === 'mixed' && !mixedValid) return

    setProcessingPayment(true)
    // Simulate processing
    setTimeout(() => {
      setProcessingPayment(false)
      setStep('complete')
    }, 1500)
  }

  const handleComplete = () => {
    const saleNumber = generateSaleNumber()
    onComplete(saleNumber)
  }

  const canProcess =
    (paymentMethod === 'cash' && cashReceived >= total) ||
    paymentMethod === 'card' ||
    (paymentMethod === 'mixed' && mixedValid)

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {/* Step 1: Payment Method Selection */}
        {step === 'method' && (
          <motion.div
            key="method"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">Seleccionar metodo de pago</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Total a cobrar: <span className="text-cbd-green font-bold">{formatCurrency(total)}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = PAYMENT_ICONS[method.value]
                return (
                  <button
                    key={method.value}
                    onClick={() => handleSelectMethod(method.value)}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border transition-all',
                      'hover:border-cbd-green/50 hover:bg-cbd-green/5',
                      paymentMethod === method.value
                        ? 'border-cbd-green bg-cbd-green/10'
                        : 'border-border/50'
                    )}
                  >
                    <div className="p-3 rounded-lg bg-cbd-green/10">
                      <Icon className="h-6 w-6 text-cbd-green" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {method.value === 'cash' && 'Pago en efectivo con calculo de cambio'}
                        {method.value === 'card' && 'Pago con tarjeta de credito/debito'}
                        {method.value === 'mixed' && 'Combinacion de efectivo y tarjeta'}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full"
            >
              Cancelar
            </Button>
          </motion.div>
        )}

        {/* Step 2: Payment Details */}
        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">
                {paymentMethod === 'cash' && 'Pago en Efectivo'}
                {paymentMethod === 'card' && 'Pago con Tarjeta'}
                {paymentMethod === 'mixed' && 'Pago Mixto'}
              </h3>
              <p className="text-2xl font-bold text-cbd-green mt-1">{formatCurrency(total)}</p>
            </div>

            <Separator className="bg-border/30" />

            {/* Cash Payment */}
            {paymentMethod === 'cash' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Efectivo recibido</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={cashReceived || ''}
                    onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                    className="mt-1.5 bg-card/50 border-border/50 text-lg font-semibold h-12"
                    autoFocus
                  />
                </div>

                {/* Quick Cash Amounts */}
                <div>
                  <Label className="text-xs text-muted-foreground">Cantidades rapidas</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1.5">
                    {QUICK_CASH_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setCashReceived(amount)}
                        className={cn(
                          'p-2 rounded-lg border text-sm font-medium transition-all',
                          cashReceived === amount
                            ? 'border-cbd-green bg-cbd-green/10 text-cbd-green'
                            : 'border-border/50 text-muted-foreground hover:border-cbd-green/50'
                        )}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                    <button
                      onClick={() => setCashReceived(total)}
                      className="p-2 rounded-lg border border-cbd-green/50 text-sm font-medium text-cbd-green bg-cbd-green/5 hover:bg-cbd-green/10 transition-all"
                    >
                      Exacto
                    </button>
                  </div>
                </div>

                {/* Change */}
                {cashReceived >= total && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-cbd-green/10 border border-cbd-green/20"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Cambio a devolver</span>
                      <span className="text-xl font-bold text-cbd-green">{formatCurrency(change)}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Card Payment */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="p-6 rounded-xl border border-border/30 bg-card/30 text-center">
                  <CreditCard className="h-12 w-12 text-cbd-green mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Acerque la tarjeta al terminal de pago
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Se cobrara {formatCurrency(total)} en la tarjeta
                  </p>
                </div>
              </div>
            )}

            {/* Mixed Payment */}
            {paymentMethod === 'mixed' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Efectivo</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={cashAmount || ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0
                      setCashAmount(val)
                      setCardAmount(Math.max(0, total - val))
                    }}
                    className="mt-1.5 bg-card/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Tarjeta</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={cardAmount || ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0
                      setCardAmount(val)
                      setCashAmount(Math.max(0, total - val))
                    }}
                    className="mt-1.5 bg-card/50 border-border/50"
                  />
                </div>
                <div className="p-3 rounded-lg bg-card/30 border border-border/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total parcial</span>
                    <span className={cn('font-medium', mixedValid ? 'text-cbd-green' : 'text-destructive')}>
                      {formatCurrency(mixedTotal)} / {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep('method')}
                className="flex-1"
              >
                Atras
              </Button>
              <Button
                onClick={handleProcessPayment}
                disabled={!canProcess || processingPayment}
                className="flex-1 bg-cbd-green hover:bg-cbd-green/90 text-black font-semibold"
              >
                {processingPayment ? 'Procesando...' : 'Confirmar Pago'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment Complete */}
        {step === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 text-center"
          >
            <div className="py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <CheckCircle2 className="h-16 w-16 text-cbd-green mx-auto" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mt-4">Pago completado</h3>
              <p className="text-sm text-muted-foreground mt-1">
                La venta se ha registrado correctamente
              </p>
              <p className="text-2xl font-bold text-cbd-green mt-2">{formatCurrency(total)}</p>
              {paymentMethod === 'cash' && change > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Cambio devuelto: <span className="font-semibold text-foreground">{formatCurrency(change)}</span>
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleComplete}
                className="flex-1"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Imprimir Ticket
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 bg-cbd-green hover:bg-cbd-green/90 text-black font-semibold"
              >
                Nueva Venta
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
