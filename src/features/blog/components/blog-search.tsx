'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { searchBlogPosts, BlogPost } from '@/lib/mock-data/blog'

export function BlogSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim().length >= 2) {
      setResults(searchBlogPosts(value))
    } else {
      setResults([])
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cbd-gray" />
        <Input
          type="text"
          placeholder="Buscar articulos..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-cbd-gray focus:border-cbd-green/50 h-10"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cbd-gray hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isFocused && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-cbd-black-secondary/95 backdrop-blur-xl shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {results.length > 0 ? (
              <ul className="divide-y divide-white/5">
                {results.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <p className="text-sm text-white font-medium line-clamp-1">{post.title}</p>
                      <p className="text-xs text-cbd-gray mt-1 line-clamp-1">{post.excerpt}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-cbd-green">{post.category}</span>
                        <span className="text-xs text-cbd-gray">•</span>
                        <span className="text-xs text-cbd-gray">{post.readTime} min</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-cbd-gray-light">No se encontraron resultados para &quot;{query}&quot;</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
