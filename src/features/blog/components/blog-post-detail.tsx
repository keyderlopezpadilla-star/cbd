'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Linkedin, Link as LinkIcon, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { BlogPost, getRelatedPosts } from '@/lib/mock-data/blog'
import { BlogPostCard } from './blog-post-card'

interface BlogPostDetailProps {
  post: BlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const relatedPosts = getRelatedPosts(post.id, 3)
  const paragraphs = post.content.split('\n\n')

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = post.title

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard?.writeText(url)
        break
    }
  }

  return (
    <article className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cbd-gray-light hover:text-cbd-green transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-cbd-green/20 text-cbd-green border-cbd-green/30">
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-cbd-gray">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min lectura
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-cbd-gray-light">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cbd-green/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-cbd-green" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.author.name}</p>
                      <p className="text-xs text-cbd-gray">{post.author.role}</p>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-8 bg-white/10" />
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Featured Image Placeholder */}
              <div className="relative h-64 md:h-80 rounded-xl bg-gradient-to-br from-cbd-green/20 to-cbd-green/5 border border-white/10 flex items-center justify-center mb-10">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cbd-green/20 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-8 w-8 text-cbd-green" />
                  </div>
                  <p className="text-sm text-cbd-gray">Imagen del articulo</p>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-10">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="text-cbd-gray-light leading-relaxed text-base mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-cbd-gray-light"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                <Share2 className="h-4 w-4 text-cbd-gray" />
                <span className="text-sm text-cbd-gray-light">Compartir:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cbd-green/20 transition-colors"
                >
                  <Twitter className="h-4 w-4 text-cbd-gray-light" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cbd-green/20 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-cbd-gray-light" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cbd-green/20 transition-colors"
                >
                  <LinkIcon className="h-4 w-4 text-cbd-gray-light" />
                </button>
              </div>

              <Separator className="my-10 bg-white/10" />

              {/* Author Bio */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-cbd-green/20 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-cbd-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{post.author.name}</h3>
                    <p className="text-sm text-cbd-green mb-2">{post.author.role}</p>
                    <p className="text-sm text-cbd-gray-light">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
              >
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-cbd-green" />
                  Contenido
                </h4>
                <ul className="space-y-2">
                  {paragraphs.map((paragraph, index) => (
                    <li key={index} className="text-xs text-cbd-gray-light hover:text-cbd-green transition-colors cursor-pointer">
                      Parrafo {index + 1}: {paragraph.substring(0, 40)}...
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Articulos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  )
}
