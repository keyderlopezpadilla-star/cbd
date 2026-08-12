'use client'

import { motion } from 'framer-motion'
import {
  ShoppingCart,
  TrendingUp,
  LineChart,
  AlertTriangle,
  BrainCircuit,
  Crown,
  Ticket,
  Users,
  BarChart3,
  Lightbulb,
} from 'lucide-react'
import { SUGGESTED_QUERIES } from '@/lib/mock-data/ai-assistant'

interface AISuggestedQueriesProps {
  onQuerySelect: (query: string) => void
}

const iconMap: Record<string, typeof ShoppingCart> = {
  ShoppingCart,
  TrendingUp,
  LineChart,
  AlertTriangle,
  BrainCircuit,
  Crown,
  Ticket,
  Users,
  BarChart3,
  Lightbulb,
}

const categoryColors: Record<string, string> = {
  Ventas: 'border-cbd-green/30 hover:border-cbd-green/60 hover:bg-cbd-green/5',
  Inventario: 'border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/5',
  Clientes: 'border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5',
  Rendimiento: 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5',
}

const categoryIconColors: Record<string, string> = {
  Ventas: 'text-cbd-green',
  Inventario: 'text-amber-400',
  Clientes: 'text-purple-400',
  Rendimiento: 'text-cyan-400',
}

export function AISuggestedQueries({ onQuerySelect }: AISuggestedQueriesProps) {
  // Group queries by category
  const categories = SUGGESTED_QUERIES.reduce<Record<string, typeof SUGGESTED_QUERIES>>((acc, query) => {
    if (!acc[query.category]) acc[query.category] = []
    acc[query.category].push(query)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">Consultas Sugeridas</h3>

      {Object.entries(categories).map(([category, queries]) => (
        <div key={category} className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-cbd-gray font-medium">{category}</p>
          <div className="space-y-1.5">
            {queries.map((query, i) => {
              const Icon = iconMap[query.icon] || Lightbulb
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onQuerySelect(query.text)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-200 text-left ${categoryColors[category] || 'border-white/10 hover:border-white/30'}`}
                >
                  <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${categoryIconColors[category] || 'text-cbd-gray'}`} />
                  <span className="text-xs text-cbd-gray group-hover:text-white">{query.text}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
