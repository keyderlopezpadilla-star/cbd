'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/lib/mock-data/blog'

interface BlogPostCardProps {
  post: BlogPost
  index?: number
}

export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <article className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-cbd-green/30 transition-all duration-300 h-full flex flex-col">
          {/* Image Placeholder */}
          <div className="relative h-48 bg-gradient-to-br from-cbd-green/10 to-transparent flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-cbd-green/20 flex items-center justify-center">
              <span className="text-lg">🌿</span>
            </div>
            <Badge className="absolute top-3 left-3 bg-cbd-green/20 text-cbd-green border-cbd-green/30 text-xs">
              {post.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cbd-green transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-cbd-gray-light mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cbd-green/20 flex items-center justify-center">
                  <User className="h-3 w-3 text-cbd-green" />
                </div>
                <span className="text-xs text-cbd-gray">{post.author.name}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-cbd-gray">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
