'use client'

import { Store, Receipt, Calendar, User, Hash } from 'lucide-react'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { usePOSStore } from '@/stores/pos-store'
import { DEFAULT_TAX_RATE } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'

interface TicketPreviewProps {
  saleNumber?: string
  storeName?: string
  storeAddress?: string
  employeeName?: string
}

export function TicketPreview({
  saleNumber = 'VTA-2024-XXXX',
  storeName = 'CBD Madrid Centro',
  storeAddress = 'Calle Gran Via 42, 28013 Madrid',
  employeeName = 'Carlos Martinez',
}: TicketPreviewProps) {
  const {
    items,
    subtotal,
    discountAmount,
    taxAmount,
    total,
    cartDiscount,
    customerName,
    paymentMethod,
  } = usePOSStore()

  const now = new Date()

  return (
    <div className="max-w-sm mx-auto bg-white text-black rounded-lg p-6 font-mono text-sm shadow-xl">
      {/* Store Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Store className="h-4 w-4" />
          <span className="font-bold text-base">{storeName}</span>
        </div>
        <p className="text-xs text-gray-600">{storeAddress}</p>
        <p className="text-xs text-gray-600">CIF: B12345678</p>
        <p className="text-xs text-gray-600">Tel: +34 912 345 678</p>
      </div>

      <div className="border-t border-dashed border-gray-300 my-3" />

      {/* Sale Info */}
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-1.5">
          <Hash className="h-3 w-3 text-gray-500" />
          <span className="text-gray-600">Ticket:</span>
          <span className="font-semibold">{saleNumber}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-gray-500" />
          <span className="text-gray-600">Fecha:</span>
          <span>{formatDateTime(now)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="h-3 w-3 text-gray-500" />
          <span className="text-gray-600">Empleado:</span>
          <span>{employeeName}</span>
        </div>
        {customerName && (
          <div className="flex items-center gap-1.5">
            <User className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600">Cliente:</span>
            <span>{customerName}</span>
          </div>
        )}
      </div>

      <div className="border-t border-dashed border-gray-300 my-3" />

      {/* Items */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-gray-600 uppercase">
          <span>Producto</span>
          <span>Importe</span>
        </div>
        {items.map((item) => (
          <div key={item.productId} className="space-y-0.5">
            <div className="flex justify-between">
              <span className="text-xs flex-1 pr-2 truncate">{item.productName}</span>
              <span className="text-xs font-medium whitespace-nowrap">{formatCurrency(item.total)}</span>
            </div>
            <div className="text-[10px] text-gray-500">
              {item.quantity} x {formatCurrency(item.price)}
              {item.discount > 0 && (
                <span className="ml-2 text-green-700">(-{formatCurrency(item.discount)}/ud)</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-300 my-3" />

      {/* Totals */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-green-700">
              Descuento{cartDiscount ? ` (${cartDiscount.label})` : ''}
            </span>
            <span className="text-green-700">-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Base imponible</span>
          <span>{formatCurrency(subtotal - discountAmount)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">IVA ({DEFAULT_TAX_RATE}%)</span>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
        <div className="border-t border-gray-300 my-1" />
        <div className="flex justify-between text-base font-bold">
          <span>TOTAL</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300 my-3" />

      {/* Payment Method */}
      <div className="text-center text-xs">
        <p className="text-gray-600">
          Forma de pago:{' '}
          <span className="font-semibold">
            {paymentMethod === 'cash' && 'Efectivo'}
            {paymentMethod === 'card' && 'Tarjeta'}
            {paymentMethod === 'mixed' && 'Mixto'}
            {!paymentMethod && '-'}
          </span>
        </p>
      </div>

      <div className="border-t border-dashed border-gray-300 my-3" />

      {/* Footer */}
      <div className="text-center text-[10px] text-gray-500 space-y-0.5">
        <p>Gracias por su compra</p>
        <p>CBD SaaS Platform - www.cbdsaas.es</p>
        <p>Conserve este ticket para devoluciones (30 dias)</p>
      </div>

      {/* Barcode representation */}
      <div className="mt-4 flex items-center justify-center">
        <div className="flex gap-[1px]">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="bg-black"
              style={{
                width: Math.random() > 0.5 ? '2px' : '1px',
                height: '30px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
