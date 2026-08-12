'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout, Plus, Edit2, Trash2, Eye, Clock, ArrowLeft, FileCode } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MOCK_PAGE_CONTENT, type PageContent } from '@/lib/mock-data/cms'

function PageForm({
  page,
  onClose,
}: {
  page?: PageContent
  onClose: () => void
}) {
  const [title, setTitle] = useState(page?.title || '')
  const [slug, setSlug] = useState(page?.slug || '')
  const [content, setContent] = useState(page?.content || '')
  const [status, setStatus] = useState<PageContent['status']>(page?.status || 'draft')
  const [showPreview, setShowPreview] = useState(false)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!page) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al listado
      </motion.button>

      <Card className="glass border border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {page ? 'Editar Pagina' : 'Nueva Pagina'}
            </CardTitle>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PageContent['status'])}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 transition-all"
            >
              <option value="draft" className="bg-gray-900">Borrador</option>
              <option value="published" className="bg-gray-900">Publicado</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Titulo</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Titulo de la pagina"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Slug (URL)</label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-de-la-pagina"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Contenido (Markdown)</label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={cn(
                  'text-xs px-2 py-1 rounded-md transition-colors',
                  showPreview ? 'bg-cbd-green text-black' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {showPreview ? 'Editor' : 'Preview'}
              </button>
            </div>
            {!showPreview ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Titulo&#10;&#10;Contenido de la pagina en Markdown..."
                rows={16}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none font-mono"
              />
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 min-h-[380px]">
                <div className="prose prose-invert prose-sm max-w-none">
                  {content.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-foreground">{line.slice(2)}</h1>
                    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-semibold text-foreground mt-4">{line.slice(3)}</h2>
                    if (line.startsWith('### ')) return <h3 key={i} className="text-base font-medium text-foreground mt-3">{line.slice(4)}</h3>
                    if (line.startsWith('- **')) {
                      const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/)
                      if (match) return <li key={i} className="text-sm text-muted-foreground ml-4"><strong className="text-foreground">{match[1]}</strong>: {match[2]}</li>
                    }
                    if (line.startsWith('- ')) return <li key={i} className="text-sm text-muted-foreground ml-4">{line.slice(2)}</li>
                    if (line.trim() === '') return <br key={i} />
                    return <p key={i} className="text-sm text-muted-foreground">{line}</p>
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-cbd-green text-black rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
            >
              {page ? 'Guardar Cambios' : 'Crear Pagina'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
            >
              Cancelar
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PageEditor() {
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<PageContent | undefined>(undefined)

  const handleEdit = (page: PageContent) => {
    setEditingPage(page)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingPage(undefined)
    setShowForm(true)
  }

  if (showForm) {
    return (
      <PageForm
        page={editingPage}
        onClose={() => { setShowForm(false); setEditingPage(undefined) }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {MOCK_PAGE_CONTENT.length} paginas | {MOCK_PAGE_CONTENT.filter((p) => p.status === 'published').length} publicadas
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreate}
          className="flex items-center gap-2 bg-cbd-green text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nueva Pagina
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_PAGE_CONTENT.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border border-white/10 hover:border-cbd-green/20 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-cbd-green/10 flex items-center justify-center">
                      <Layout className="h-5 w-5 text-cbd-green" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{page.title}</h3>
                      <p className="text-xs text-muted-foreground font-mono">/{page.slug}</p>
                    </div>
                  </div>
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full border',
                    page.status === 'published'
                      ? 'text-green-400 bg-green-400/10 border-green-400/30'
                      : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
                  )}>
                    {page.status === 'published' ? 'Publicada' : 'Borrador'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {page.updatedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCode className="h-3 w-3" />
                    {page.lastEditedBy}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(page)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                  >
                    <Edit2 className="h-3 w-3" />
                    Editar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    Ver
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Eliminar
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
