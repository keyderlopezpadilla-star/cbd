'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Globe, Image, Tag, ExternalLink, Edit2, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MOCK_SEO_METADATA, type SEOMetadata } from '@/lib/mock-data/cms'

function SEOPreview({ meta }: { meta: SEOMetadata }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
      <p className="text-xs text-muted-foreground mb-2">Vista previa en buscador:</p>
      <div className="space-y-1">
        <p className="text-sm text-blue-400 hover:underline cursor-pointer">
          {meta.metaTitle || 'Sin titulo'}
        </p>
        <p className="text-xs text-green-400">{meta.canonical || 'https://cbdsaas.com'}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {meta.metaDescription || 'Sin descripcion'}
        </p>
      </div>
    </div>
  )
}

function SEOEditForm({
  meta,
  onClose,
}: {
  meta: SEOMetadata
  onClose: () => void
}) {
  const [metaTitle, setMetaTitle] = useState(meta.metaTitle)
  const [metaDescription, setMetaDescription] = useState(meta.metaDescription)
  const [keywords, setKeywords] = useState(meta.keywords.join(', '))
  const [ogTitle, setOgTitle] = useState(meta.ogTitle)
  const [ogDescription, setOgDescription] = useState(meta.ogDescription)
  const [ogImage, setOgImage] = useState(meta.ogImage)
  const [canonical, setCanonical] = useState(meta.canonical)

  return (
    <Card className="glass border border-white/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-cbd-green" />
          SEO: {meta.pageTitle} ({meta.route})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic SEO */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Meta Tags Basicos</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Meta Titulo</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Titulo para motores de busqueda"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{metaTitle.length}/60 caracteres</p>
                <div className={cn(
                  'h-1.5 w-16 rounded-full',
                  metaTitle.length <= 60 ? 'bg-green-400' : 'bg-red-400'
                )} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Meta Descripcion</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Descripcion para motores de busqueda"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{metaDescription.length}/160 caracteres</p>
                <div className={cn(
                  'h-1.5 w-16 rounded-full',
                  metaDescription.length <= 160 ? 'bg-green-400' : 'bg-red-400'
                )} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Keywords (separadas por coma)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="CBD, aceite, bienestar..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">URL Canonica</label>
              <input
                type="text"
                value={canonical}
                onChange={(e) => setCanonical(e.target.value)}
                placeholder="https://cbdsaas.com/pagina"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Open Graph */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Open Graph (Redes Sociales)</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">OG Titulo</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="Titulo para redes sociales"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">OG Descripcion</label>
              <textarea
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                placeholder="Descripcion para redes sociales"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">OG Imagen</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="/images/og/pagina.jpg"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
              />
            </div>

            {/* OG Preview */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">Vista previa en redes:</p>
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-cbd-green/10 to-transparent flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <div className="p-3 bg-white/5">
                  <p className="text-xs text-muted-foreground uppercase">cbdsaas.com</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{ogTitle || 'Sin titulo'}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{ogDescription || 'Sin descripcion'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Preview */}
        <SEOPreview meta={{ ...meta, metaTitle, metaDescription, canonical }} />

        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 bg-cbd-green text-black rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
          >
            <Save className="h-4 w-4" />
            Guardar SEO
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
  )
}

export function SEOManager() {
  const [editingMeta, setEditingMeta] = useState<SEOMetadata | null>(null)

  if (editingMeta) {
    return (
      <SEOEditForm
        meta={editingMeta}
        onClose={() => setEditingMeta(null)}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {MOCK_SEO_METADATA.length} rutas con SEO configurado
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_SEO_METADATA.map((meta, index) => (
          <motion.div
            key={meta.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border border-white/10 hover:border-cbd-green/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-cbd-green/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-cbd-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground">{meta.pageTitle}</h3>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground font-mono">
                          {meta.route}
                        </span>
                      </div>
                      <p className="text-xs text-blue-400 truncate">{meta.metaTitle}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{meta.metaDescription}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {meta.keywords.slice(0, 4).map((kw) => (
                          <span
                            key={kw}
                            className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {kw}
                          </span>
                        ))}
                        {meta.keywords.length > 4 && (
                          <span className="text-[10px] text-cbd-green">+{meta.keywords.length - 4}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingMeta(meta)}
                      className="p-2 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
