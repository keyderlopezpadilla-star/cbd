'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomerStats } from '@/features/customers/components/customer-stats'
import { CustomerSegmentation } from '@/features/customers/components/customer-segmentation'
import { CustomerList } from '@/features/customers/components/customer-list'
import { CustomerForm } from '@/features/customers/components/customer-form'

export default function CustomersPage() {
  const [showNewCustomer, setShowNewCustomer] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            Gestion de clientes, segmentacion y cumplimiento GDPR
          </p>
        </div>
        <Button
          onClick={() => setShowNewCustomer(!showNewCustomer)}
          className="bg-cbd-green text-black hover:bg-cbd-green-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showNewCustomer ? 'Ver Clientes' : 'Nuevo Cliente'}
        </Button>
      </div>

      {showNewCustomer ? (
        <CustomerForm
          onSubmit={() => {
            setShowNewCustomer(false)
          }}
          onCancel={() => setShowNewCustomer(false)}
        />
      ) : (
        <>
          {/* Stats */}
          <CustomerStats />

          {/* Segmentation */}
          <CustomerSegmentation />

          {/* Customer List */}
          <CustomerList />
        </>
      )}
    </div>
  )
}
