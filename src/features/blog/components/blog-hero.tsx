'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/mock-data/blog'

export function BlogHero() {
  const featuredPost = BLOG_POSTS[0]

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cbd-green/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cbd-green/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Blog <span className="text-gradient-green">CBD SaaS</span>
          </h1>
          <p className="text-lg text-cbd-gray-light max-w-2xl mx-auto">
            Articulos, guias y noticias sobre el mundo del CBD, bienestar y la industria del cannabis legal.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden group hover:border-cbd-green/30 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Placeholder */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-cbd-green/20 to-cbd-green/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-cbd-green/20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📝</span>
                    </div>
                    <p className="text-sm text-cbd-gray">Articulo Destacado</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-cbd-green/20 text-cbd-green border-cbd-green/30 hover:bg-cbd-green/30">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-xs text-cbd-gray">Destacado</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cbd-green transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-cbd-gray-light mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-cbd-gray">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime} min lectura
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-cbd-green text-sm font-medium group-hover:gap-2 transition-all">
                      Leer mas <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
