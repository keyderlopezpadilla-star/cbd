'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { mockProducts } from '@/lib/mock-data/products'
import { formatCurrency } from '@/lib/utils'
import { usePOSStore } from '@/stores/pos-store'
import { motion, AnimatePresence } from 'framer-motion'

export function ProductSearch() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const addItem = usePOSStore((state) => state.addItem)

  const filteredProducts = useMemo(() => {
    let products = mockProducts.filter((p) => p.isActive)

    if (search) {
      const query = search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory)
    }

    return products
  }, [search, selectedCategory])

  const handleAddProduct = (product: { id: string; name: string; price: number }) => {
    addItem(product)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar producto por nombre, SKU o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card/50 border-border/50"
        />
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
            selectedCategory === 'all'
              ? 'bg-cbd-green text-black'
              : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
          )}
        >
          Todos
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
              selectedCategory === cat.value
                ? 'bg-cbd-green text-black'
                : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[calc(100vh-380px)] overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.button
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleAddProduct({ id: product.id, name: product.name, price: product.price })}
              className="glass border border-border/30 hover:border-cbd-green/50 rounded-lg p-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full h-16 rounded-md bg-gradient-to-br from-cbd-green/10 to-cbd-green/5 flex items-center justify-center">
                  <span className="text-2xl">
                    {product.category === 'oils' && '🫙'}
                    {product.category === 'cosmetics' && '✨'}
                    {product.category === 'flowers' && '🌿'}
                    {product.category === 'capsules' && '💊'}
                    {product.category === 'creams' && '🧴'}
                    {product.category === 'wellness' && '🍵'}
                    {product.category === 'accessories' && '🔧'}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                    {product.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{product.sku}</p>
                </div>
                <p className="text-sm font-bold text-cbd-green">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No se encontraron productos</p>
            <p className="text-xs text-muted-foreground/70">Prueba con otro termino de busqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
