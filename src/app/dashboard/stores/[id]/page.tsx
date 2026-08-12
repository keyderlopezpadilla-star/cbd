'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StoreDetail } from '@/features/stores/components/store-detail'
import { getStoreById } from '@/lib/mock-data/stores'

export default function StoreDetailPage() {
  const params = useParams()
  const router = useRouter()
  const storeId = params.id as string
  const store = getStoreById(storeId)

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <p className="text-cbd-gray-light text-lg">Tienda no encontrada</p>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/stores')}
          className="border-cbd-green/20 text-cbd-gray-light hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Tiendas
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/stores')}
          className="text-cbd-gray-light hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Tiendas
        </Button>
      </motion.div>

      {/* Store Detail */}
      <StoreDetail store={store} />
    </div>
  )
}
