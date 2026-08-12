'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Folder, Clock, Tag, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_TAGS } from '@/lib/mock-data/blog'

export function BlogSidebar() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const recentPosts = BLOG_POSTS.slice(0, 4)

  const categoryCount = BLOG_CATEGORIES.map((cat) => ({
    name: cat,
    count: BLOG_POSTS.filter((p) => p.category === cat).length,
  }))

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Folder className="h-4 w-4 text-cbd-green" />
          Categorias
        </h3>
        <ul className="space-y-2">
          {categoryCount.map((cat) => (
            <li key={cat.name}>
              <Link
                href={`/blog?category=${cat.name}`}
                className="flex items-center justify-between text-sm text-cbd-gray-light hover:text-cbd-green transition-colors py-1"
              >
                <span>{cat.name}</span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-cbd-green" />
          Articulos Recientes
        </h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <p className="text-sm text-cbd-gray-light group-hover:text-cbd-green transition-colors line-clamp-2 mb-1">
                  {post.title}
                </p>
                <p className="text-xs text-cbd-gray">
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              </Link>
              <Separator className="mt-3 bg-white/5" />
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4 text-cbd-green" />
          Tags Populares
        </h3>
        <div className="flex flex-wrap gap-2">
          {BLOG_TAGS.slice(0, 12).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-white/10 text-cbd-gray-light hover:border-cbd-green/30 hover:text-cbd-green cursor-pointer text-xs"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-cbd-green/20 bg-cbd-green/5 backdrop-blur-sm p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <Mail className="h-4 w-4 text-cbd-green" />
          Newsletter
        </h3>
        <p className="text-xs text-cbd-gray-light mb-4">
          Recibe los ultimos articulos y novedades directamente en tu email.
        </p>

        {subscribed ? (
          <div className="text-center py-2">
            <p className="text-sm text-cbd-green font-medium">Suscripcion exitosa!</p>
            <p className="text-xs text-cbd-gray-light mt-1">Gracias por suscribirte.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-cbd-gray text-sm h-9"
              required
            />
            <Button
              type="submit"
              size="sm"
              className="w-full bg-cbd-green hover:bg-cbd-green/90 text-black font-medium"
            >
              Suscribirme
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </form>
        )}
      </motion.div>
    </aside>
  )
}
