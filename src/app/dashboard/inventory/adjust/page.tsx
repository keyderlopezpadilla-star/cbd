'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InventoryAdjustmentForm } from '@/features/inventory/components/inventory-adjustment-form'

export default function AdjustPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/inventory">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ajuste de Inventario</h1>
          <p className="text-sm text-muted-foreground">
            Registra ajustes manuales de stock con razon y trazabilidad
          </p>
        </div>
      </div>

      {/* Adjustment Form */}
      <InventoryAdjustmentForm />
    </div>
  )
}
