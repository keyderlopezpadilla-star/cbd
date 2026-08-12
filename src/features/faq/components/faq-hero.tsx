'use client'

import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

interface FAQHeroProps {
  onSearch: (query: string) => void
  searchQuery: string
}

export function FAQHero({ onSearch, searchQuery }: FAQHeroProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cbd-green/5 via-transparent to-transparent" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cbd-green/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cbd-green/20 mb-6">
            <HelpCircle className="h-8 w-8 text-cbd-green" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Preguntas <span className="text-gradient-green">Frecuentes</span>
          </h1>
          <p className="text-lg text-cbd-gray-light max-w-2xl mx-auto mb-10">
            Encuentra respuestas a las preguntas mas comunes sobre nuestros productos, pedidos, envios y todo lo relacionado con el CBD.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Buscar en las preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-12 px-5 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-cbd-gray focus:outline-none focus:border-cbd-green/50 transition-colors"
            />
            <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cbd-gray" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
