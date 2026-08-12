'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomerDetail } from '@/features/customers/components/customer-detail'
import { CustomerForm } from '@/features/customers/components/customer-form'
import { getCustomerById } from '@/lib/mock-data/customers'
import Link from 'next/link'

export default function CustomerProfilePage() {
  const params = useParams()
  const customerId = params.id as string
  const [customer, setCustomer] = useState(() => getCustomerById(customerId))
  const [isEditing, setIsEditing] = useState(false)

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">Cliente no encontrado</p>
        <Link href="/dashboard/customers">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Clientes
          </Button>
        </Link>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link href="/dashboard/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Editar Cliente</h1>
            <p className="text-sm text-muted-foreground">{customer.name}</p>
          </div>
        </motion.div>
        <CustomerForm
          customer={customer}
          onSubmit={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Perfil del Cliente</h1>
            <p className="text-sm text-muted-foreground">
              Informacion detallada y gestion del cliente
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="border-cbd-green/50 text-cbd-green hover:bg-cbd-green/10"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </motion.div>

      {/* Customer Detail */}
      <CustomerDetail customer={customer} />
    </div>
  )
}
