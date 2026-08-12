'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Store as StoreIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StoreForm } from '@/features/stores/components/store-form'

export default function NewStorePage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/dashboard/stores">
          <Button
            variant="ghost"
            className="text-cbd-gray-light hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Tiendas
          </Button>
        </Link>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <StoreIcon className="h-6 w-6 text-cbd-green" />
          Nueva Tienda
        </h1>
        <p className="text-cbd-gray-light mt-1">
          Registra una nueva tienda en la plataforma
        </p>
      </motion.div>

      {/* Store Form - Create Mode */}
      <StoreForm />
    </div>
  )
}
