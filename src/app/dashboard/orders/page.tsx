'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderStats } from '@/features/orders/components/order-stats'
import { OrderList } from '@/features/orders/components/order-list'
import { OrderForm } from '@/features/orders/components/order-form'

export default function OrdersPage() {
  const [showNewOrder, setShowNewOrder] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            Gestion completa de pedidos, envios y seguimiento
          </p>
        </div>
        <Button
          onClick={() => setShowNewOrder(!showNewOrder)}
          className="bg-cbd-green text-black hover:bg-cbd-green-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showNewOrder ? 'Ver Pedidos' : 'Nuevo Pedido'}
        </Button>
      </div>

      {showNewOrder ? (
        <OrderForm
          onSubmit={(data) => {
            setShowNewOrder(false)
          }}
          onCancel={() => setShowNewOrder(false)}
        />
      ) : (
        <>
          {/* Stats */}
          <OrderStats />

          {/* Order List */}
          <OrderList />
        </>
      )}
    </div>
  )
}
