'use client'

import { LandingNav } from '@/features/landing/components/landing-nav'
import { LandingFooter } from '@/features/landing/components/landing-footer'
import { BlogHero } from '@/features/blog/components/blog-hero'
import { BlogPostList } from '@/features/blog/components/blog-post-list'
import { BlogSidebar } from '@/features/blog/components/blog-sidebar'
import { BlogSearch } from '@/features/blog/components/blog-search'

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-cbd-black">
      <LandingNav />

      <BlogHero />

      <div className="container mx-auto px-4 pb-16">
        {/* Search Bar */}
        <div className="max-w-md mb-8">
          <BlogSearch />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogPostList />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  )
}
