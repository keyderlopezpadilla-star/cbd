'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, LayoutGrid, Table as TableIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductTable } from '@/features/products/components/product-table'
import { ProductCard } from '@/features/products/components/product-card'
import { ProductFiltersBar, defaultFilters, type ProductFilters } from '@/features/products/components/product-filters'
import { mockProducts } from '@/lib/mock-data/products'
import { Product } from '@/types'
import { cn } from '@/lib/utils'

type ViewMode = 'table' | 'grid'

export default function ProductsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts]

    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search)
      )
    }

    // Category
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    // Active filter
    if (filters.activeFilter === 'active') {
      result = result.filter((p) => p.isActive)
    } else if (filters.activeFilter === 'inactive') {
      result = result.filter((p) => !p.isActive)
    }

    // Price range
    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin))
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax))
    }

    return result
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleView = (product: Product) => {
    router.push(`/dashboard/products/${product.id}`)
  }

  const handleEdit = (product: Product) => {
    router.push(`/dashboard/products/${product.id}/edit`)
  }

  const handleDelete = (product: Product) => {
    // Placeholder for delete functionality
    console.log('Delete product:', product.id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona tu catalogo de productos CBD ({filteredProducts.length} productos)
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'rounded-md p-2 transition-colors',
                viewMode === 'table'
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <TableIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-md p-2 transition-colors',
                viewMode === 'grid'
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <Button
            onClick={() => router.push('/dashboard/products/new')}
            className="bg-cbd-green text-black hover:bg-cbd-green/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ProductFiltersBar filters={filters} onFiltersChange={setFilters} />

      {/* Content */}
      {viewMode === 'table' ? (
        <ProductTable
          data={paginatedProducts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleView}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {paginatedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-16">
          <p className="text-sm text-muted-foreground">No se encontraron productos</p>
          <p className="text-xs text-muted-foreground mt-1">Ajusta los filtros o crea un nuevo producto</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredProducts.length)} de{' '}
            {filteredProducts.length} productos
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? 'bg-cbd-green text-black' : ''}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
