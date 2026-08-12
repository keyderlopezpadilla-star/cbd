'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProductForm } from '@/features/products/components/product-form'

export default function NewProductPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // In a real app, this would call an API to create the product
    console.log('Creating product:', data)
    router.push('/dashboard/products')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/dashboard/products')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Nuevo Producto</h1>
          <p className="text-sm text-muted-foreground">
            Completa la informacion para crear un nuevo producto en el catalogo
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <ProductForm
            onSubmit={handleSubmit}
            onCancel={() => router.push('/dashboard/products')}
          />
        </CardContent>
      </Card>
    </div>
  )
}
