'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { LandingNav } from '@/features/landing/components/landing-nav'
import { LandingFooter } from '@/features/landing/components/landing-footer'
import { FAQHero } from '@/features/faq/components/faq-hero'
import { FAQAccordion } from '@/features/faq/components/faq-accordion'
import { FAQCategories } from '@/features/faq/components/faq-categories'
import { ContactForm } from '@/features/faq/components/contact-form'
import { FAQ_CATEGORIES, FAQ_ITEMS, getFAQsByCategory, searchFAQs } from '@/lib/mock-data/faq'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = useMemo(() => {
    if (searchQuery.trim().length >= 2) {
      return searchFAQs(searchQuery)
    }
    if (activeCategory === 'all') {
      return FAQ_ITEMS
    }
    return getFAQsByCategory(activeCategory)
  }, [searchQuery, activeCategory])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim().length >= 2) {
      setActiveCategory('all')
    }
  }

  // Group items by category when showing all
  const groupedItems = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery.trim().length >= 2) {
      return null
    }
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      items: getFAQsByCategory(cat.id),
    }))
  }, [activeCategory, searchQuery])

  return (
    <div className="relative min-h-screen bg-cbd-black">
      <LandingNav />

      <FAQHero onSearch={handleSearch} searchQuery={searchQuery} />

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <FAQCategories
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {searchQuery.trim().length >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-cbd-gray-light mb-6"
              >
                {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'} para &quot;{searchQuery}&quot;
              </motion.p>
            )}

            {groupedItems ? (
              // Grouped by category view
              <div className="space-y-10">
                {groupedItems.map((group) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <FAQAccordion items={group.items} categoryName={group.name} />
                  </motion.div>
                ))}
              </div>
            ) : (
              // Filtered view (by category or search)
              <FAQAccordion items={filteredItems} />
            )}
          </div>
        </div>

        {/* Contact Form Section */}
        <Separator className="my-16 bg-white/10" />

        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>

      <LandingFooter />
    </div>
  )
}
