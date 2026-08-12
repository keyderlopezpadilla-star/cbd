'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQItem } from '@/lib/mock-data/faq'

interface FAQAccordionProps {
  items: FAQItem[]
  categoryName?: string
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium text-white pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={cn('h-4 w-4', isOpen ? 'text-cbd-green' : 'text-cbd-gray')} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 border-t border-white/5">
              <p className="text-sm text-cbd-gray-light leading-relaxed pt-3">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQAccordion({ items, categoryName }: FAQAccordionProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-cbd-gray-light">No se encontraron preguntas.</p>
      </div>
    )
  }

  return (
    <div>
      {categoryName && (
        <h2 className="text-lg font-semibold text-white mb-4">{categoryName}</h2>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <FAQAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
