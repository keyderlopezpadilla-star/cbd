'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SupplierStats } from '@/features/suppliers/components/supplier-stats'
import { SupplierList } from '@/features/suppliers/components/supplier-list'
import { SupplierForm } from '@/features/suppliers/components/supplier-form'

export default function SuppliersPage() {
  const [showNewSupplier, setShowNewSupplier] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proveedores</h1>
          <p className="text-sm text-muted-foreground">
            Gestion de proveedores, evaluaciones y pedidos
          </p>
        </div>
        <Button
          onClick={() => setShowNewSupplier(!showNewSupplier)}
          className="bg-cbd-green text-black hover:bg-cbd-green-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showNewSupplier ? 'Ver Proveedores' : 'Nuevo Proveedor'}
        </Button>
      </div>

      {showNewSupplier ? (
        <SupplierForm
          onSubmit={() => {
            setShowNewSupplier(false)
          }}
          onCancel={() => setShowNewSupplier(false)}
        />
      ) : (
        <>
          {/* Stats */}
          <SupplierStats />

          {/* Supplier List */}
          <SupplierList />
        </>
      )}
    </div>
  )
}
