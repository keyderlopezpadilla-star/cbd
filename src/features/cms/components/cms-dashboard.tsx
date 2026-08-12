'use client'

import { motion } from 'framer-motion'
import { Image, FileText, HelpCircle, Layout, Search, PenTool, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MOCK_BANNERS,
  MOCK_BLOG_POSTS,
  MOCK_FAQ_ENTRIES,
  MOCK_PAGE_CONTENT,
  MOCK_SEO_METADATA,
} from '@/lib/mock-data/cms'

interface ContentStat {
  label: string
  count: number
  icon: React.ElementType
  description: string
  lastEdited: string
  color: string
}

export function CMSDashboard() {
  const stats: ContentStat[] = [
    {
      label: 'Banners',
      count: MOCK_BANNERS.length,
      icon: Image,
      description: `${MOCK_BANNERS.filter((b) => b.isActive).length} activos`,
      lastEdited: MOCK_BANNERS.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.updatedAt || '-',
      color: 'text-blue-400',
    },
    {
      label: 'Blog Posts',
      count: MOCK_BLOG_POSTS.length,
      icon: FileText,
      description: `${MOCK_BLOG_POSTS.filter((p) => p.status === 'published').length} publicados`,
      lastEdited: MOCK_BLOG_POSTS.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.updatedAt || '-',
      color: 'text-purple-400',
    },
    {
      label: 'FAQ',
      count: MOCK_FAQ_ENTRIES.length,
      icon: HelpCircle,
      description: `${MOCK_FAQ_ENTRIES.filter((f) => f.isPublished).length} publicadas`,
      lastEdited: MOCK_FAQ_ENTRIES.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.updatedAt || '-',
      color: 'text-amber-400',
    },
    {
      label: 'Paginas',
      count: MOCK_PAGE_CONTENT.length,
      icon: Layout,
      description: `${MOCK_PAGE_CONTENT.filter((p) => p.status === 'published').length} publicadas`,
      lastEdited: MOCK_PAGE_CONTENT.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.updatedAt || '-',
      color: 'text-green-400',
    },
    {
      label: 'SEO',
      count: MOCK_SEO_METADATA.length,
      icon: Search,
      description: `${MOCK_SEO_METADATA.length} rutas configuradas`,
      lastEdited: MOCK_SEO_METADATA.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.updatedAt || '-',
      color: 'text-cyan-400',
    },
  ]

  const recentActivity = [
    { action: 'Banner actualizado', item: 'Nueva Coleccion Primavera 2024', date: '2024-02-20', type: 'banner' },
    { action: 'Blog publicado', item: 'Guia Completa: Como Elegir tu Aceite CBD', date: '2024-01-10', type: 'blog' },
    { action: 'FAQ editada', item: 'Cuanto tarda el envio?', date: '2024-01-10', type: 'faq' },
    { action: 'Pagina editada', item: 'Sobre Nosotros', date: '2024-01-05', type: 'page' },
    { action: 'SEO actualizado', item: 'Blog - Meta Description', date: '2024-01-12', type: 'seo' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass border border-white/10 hover:border-cbd-green/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{stat.count}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{stat.label}</h3>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Editado: {stat.lastEdited}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="glass border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PenTool className="h-5 w-5 text-cbd-green" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cbd-green/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-cbd-green" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.item}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
