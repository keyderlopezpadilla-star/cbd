'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransferForm } from '@/features/transfers/components/transfer-form'

export default function NewTransferPage() {
  return (
    <div className="space-y-6">
      <Link href="/dashboard/transfers">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Volver a Transferencias
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Nueva Transferencia</h1>
        <p className="text-sm text-muted-foreground">
          Crea una solicitud de transferencia de stock entre tiendas
        </p>
      </div>

      <TransferForm />
    </div>
  )
}
