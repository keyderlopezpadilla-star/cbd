'use client'

import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

interface FAQSearchProps {
  query: string
  onSearch: (query: string) => void
  resultCount?: number
}

export function FAQSearch({ query, onSearch, resultCount }: FAQSearchProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cbd-gray" />
        <Input
          type="text"
          placeholder="Buscar preguntas..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-cbd-gray focus:border-cbd-green/50 h-10"
        />
        {query && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cbd-gray hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {query && resultCount !== undefined && (
        <p className="text-xs text-cbd-gray-light">
          {resultCount} {resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados'} para &quot;{query}&quot;
        </p>
      )}
    </div>
  )
}
