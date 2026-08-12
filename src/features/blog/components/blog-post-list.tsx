'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/mock-data/blog'
import { BlogPostCard } from './blog-post-card'

const POSTS_PER_PAGE = 6

export function BlogPostList() {
  const [activeCategory, setActiveCategory] = useState<string>('Todos')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = ['Todos', ...BLOG_CATEGORIES]

  const filteredPosts = activeCategory === 'Todos'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === activeCategory)

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === category
                  ? 'bg-cbd-green text-black'
                  : 'bg-white/5 text-cbd-gray-light border border-white/10 hover:border-cbd-green/30 hover:text-white'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cbd-gray-light">No se encontraron articulos en esta categoria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-white/10 text-cbd-gray-light hover:text-white hover:border-cbd-green/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-8 h-8 rounded-full text-sm font-medium transition-all',
                  currentPage === page
                    ? 'bg-cbd-green text-black'
                    : 'text-cbd-gray-light hover:text-white'
                )}
              >
                {page}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-white/10 text-cbd-gray-light hover:text-white hover:border-cbd-green/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
