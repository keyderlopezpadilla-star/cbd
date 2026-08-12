'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransferDetail } from '@/features/transfers/components/transfer-detail'
import { getTransferById, getTransferTimeline } from '@/lib/mock-data/transfers'

interface TransferDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TransferDetailPage({ params }: TransferDetailPageProps) {
  const { id } = use(params)
  const transfer = getTransferById(id)
  const timeline = getTransferTimeline(id)

  if (!transfer) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/transfers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Volver a Transferencias
          </Button>
        </Link>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Transferencia no encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/transfers">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Volver a Transferencias
        </Button>
      </Link>
      <TransferDetail transfer={transfer} timeline={timeline} />
    </div>
  )
}
