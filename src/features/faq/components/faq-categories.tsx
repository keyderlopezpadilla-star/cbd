'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ShoppingCart, Package, Truck, RotateCcw, User, Leaf } from 'lucide-react'
import { FAQ_CATEGORIES, getCategoryQuestionCount } from '@/lib/mock-data/faq'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Package,
  Truck,
  RotateCcw,
  User,
  Leaf,
}

interface FAQCategoriesProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function FAQCategories({ activeCategory, onCategoryChange }: FAQCategoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <h3 className="text-sm font-semibold text-white mb-4">Categorias</h3>

      {/* Mobile Tabs */}
      <div className="flex flex-wrap gap-2 lg:hidden">
        <button
          onClick={() => onCategoryChange('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeCategory === 'all'
              ? 'bg-cbd-green text-black'
              : 'bg-white/5 text-cbd-gray-light border border-white/10 hover:border-cbd-green/30'
          )}
        >
          Todas
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat.id
                ? 'bg-cbd-green text-black'
                : 'bg-white/5 text-cbd-gray-light border border-white/10 hover:border-cbd-green/30'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block space-y-1">
        <button
          onClick={() => onCategoryChange('all')}
          className={cn(
            'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all',
            activeCategory === 'all'
              ? 'bg-cbd-green/10 border border-cbd-green/30 text-cbd-green'
              : 'text-cbd-gray-light hover:bg-white/5 hover:text-white'
          )}
        >
          <span className="font-medium">Todas las categorias</span>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
            {FAQ_CATEGORIES.reduce((acc, cat) => acc + getCategoryQuestionCount(cat.id), 0)}
          </span>
        </button>

        {FAQ_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon]
          const count = getCategoryQuestionCount(cat.id)

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all',
                activeCategory === cat.id
                  ? 'bg-cbd-green/10 border border-cbd-green/30 text-cbd-green'
                  : 'text-cbd-gray-light hover:bg-white/5 hover:text-white'
              )}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span className="font-medium">{cat.name}</span>
              </span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{count}</span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
