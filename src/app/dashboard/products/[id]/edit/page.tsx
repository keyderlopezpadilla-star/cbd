'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProductForm } from '@/features/products/components/product-form'
import { getProductById } from '@/lib/mock-data/products'
import { use } from 'react'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProductPageProps) {
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

  const handleSubmit = (data: any) => {
    // In a real app, this would call an API to update the product
    console.log('Updating product:', id, data)
    router.push(`/dashboard/products/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/dashboard/products/${id}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Editar Producto</h1>
          <p className="text-sm text-muted-foreground">
            {product.name} - {product.sku}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/dashboard/products/${id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
