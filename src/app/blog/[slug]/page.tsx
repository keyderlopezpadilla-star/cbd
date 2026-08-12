'use client'

import { use } from 'react'
import { LandingNav } from '@/features/landing/components/landing-nav'
import { LandingFooter } from '@/features/landing/components/landing-footer'
import { BlogPostDetail } from '@/features/blog/components/blog-post-detail'
import { getBlogPostBySlug } from '@/lib/mock-data/blog'

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return (
      <div className="relative min-h-screen bg-cbd-black">
        <LandingNav />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Articulo no encontrado</h1>
            <p className="text-cbd-gray-light mb-6">El articulo que buscas no existe o ha sido eliminado.</p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cbd-green text-black font-medium hover:bg-cbd-green/90 transition-colors"
            >
              Volver al blog
            </a>
          </div>
        </div>
        <LandingFooter />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-cbd-black">
      <LandingNav />
      <BlogPostDetail post={post} />
      <LandingFooter />
    </div>
  )
}
