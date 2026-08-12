'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductDetail } from '@/features/products/components/product-detail'
import { getProductById } from '@/lib/mock-data/products'
import { use } from 'react'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Producto no encontrado</p>
        <p className="mt-1 text-sm text-muted-foreground">El producto que buscas no existe</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push('/dashboard/products')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard/products')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.sku}</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/products/${id}/edit`)}
          className="gap-2"
          variant="outline"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </div>

      {/* Detail content */}
      <ProductDetail product={product} />
    </div>
  )
}
