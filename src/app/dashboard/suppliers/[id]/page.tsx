'use client'

import { use } from 'react'
import { SupplierDetail } from '@/features/suppliers/components/supplier-detail'
import { getSupplierById } from '@/lib/mock-data/suppliers'
import { notFound } from 'next/navigation'

export default function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const supplier = getSupplierById(id)

  if (!supplier) {
    notFound()
  }

  return <SupplierDetail supplier={supplier} />
}
