'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StockAlerts } from '@/features/inventory/components/stock-alerts'
import { mockInventoryItems } from '@/lib/mock-data/inventory'

export default function AlertsPage() {
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
          <h1 className="text-2xl font-bold text-foreground">Alertas de Stock</h1>
          <p className="text-sm text-muted-foreground">
            Productos que requieren atencion inmediata
          </p>
        </div>
      </div>

      {/* Full Alerts */}
      <StockAlerts items={mockInventoryItems} />
    </div>
  )
}
