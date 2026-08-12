'use client'

import { useState } from 'react'
import { LayoutGrid, Image, FileText, HelpCircle, Layout, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CMSDashboard } from '@/features/cms/components/cms-dashboard'
import { BannerEditor } from '@/features/cms/components/banner-editor'
import { BlogEditor } from '@/features/cms/components/blog-editor'
import { FAQEditor } from '@/features/cms/components/faq-editor'
import { PageEditor } from '@/features/cms/components/page-editor'
import { SEOManager } from '@/features/cms/components/seo-manager'

type TabId = 'overview' | 'banners' | 'blog' | 'faq' | 'pages' | 'seo'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Vista General', icon: LayoutGrid },
  { id: 'banners', label: 'Banners', icon: Image },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'pages', label: 'Paginas', icon: Layout },
  { id: 'seo', label: 'SEO', icon: Search },
]

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestor de Contenidos</h1>
        <p className="text-sm text-muted-foreground">
          Administra banners, blog, FAQ, paginas estaticas y SEO de tu plataforma
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <CMSDashboard />}
      {activeTab === 'banners' && <BannerEditor />}
      {activeTab === 'blog' && <BlogEditor />}
      {activeTab === 'faq' && <FAQEditor />}
      {activeTab === 'pages' && <PageEditor />}
      {activeTab === 'seo' && <SEOManager />}
    </div>
  )
}
