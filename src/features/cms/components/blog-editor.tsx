'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, Edit2, Trash2, Eye, Clock, Tag, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES, type BlogPost } from '@/lib/mock-data/cms'

function BlogPostForm({
  post,
  onClose,
}: {
  post?: BlogPost
  onClose: () => void
}) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [category, setCategory] = useState(post?.category || BLOG_CATEGORIES[0])
  const [author, setAuthor] = useState(post?.author || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '')
  const [status, setStatus] = useState<BlogPost['status']>(post?.status || 'draft')
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || '')
  const [tagsInput, setTagsInput] = useState(post?.tags.join(', ') || '')
  const [showPreview, setShowPreview] = useState(false)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!post) {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">
                {post ? 'Editar Post' : 'Nuevo Post'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Titulo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Titulo del articulo"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-del-articulo"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Extracto</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve descripcion del articulo..."
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
                />
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
                    placeholder="# Titulo&#10;&#10;Escribe tu contenido en Markdown..."
                    rows={12}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none font-mono"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 min-h-[280px]">
                    <div className="prose prose-invert prose-sm max-w-none">
                      {content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-foreground">{line.slice(2)}</h1>
                        if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-semibold text-foreground mt-4">{line.slice(3)}</h2>
                        if (line.startsWith('### ')) return <h3 key={i} className="text-base font-medium text-foreground mt-3">{line.slice(4)}</h3>
                        if (line.startsWith('- ')) return <li key={i} className="text-sm text-muted-foreground ml-4">{line.slice(2)}</li>
                        if (line.startsWith('*') && line.endsWith('*')) return <em key={i} className="text-sm text-muted-foreground italic">{line.slice(1, -1)}</em>
                        if (line.trim() === '') return <br key={i} />
                        return <p key={i} className="text-sm text-muted-foreground">{line}</p>
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO Fields */}
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-sm">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Titulo SEO</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Titulo para motores de busqueda"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                />
                <p className="text-xs text-muted-foreground">{seoTitle.length}/60 caracteres</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Meta Descripcion</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Descripcion para motores de busqueda"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground">{seoDescription.length}/160 caracteres</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-sm">Publicacion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as BlogPost['status'])}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                >
                  <option value="draft" className="bg-gray-900">Borrador</option>
                  <option value="published" className="bg-gray-900">Publicado</option>
                  <option value="scheduled" className="bg-gray-900">Programado</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Autor</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Nombre del autor"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Imagen Destacada</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="/images/blog/imagen.jpg"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tags (separados por coma)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="aceite, guia, principiantes"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-cbd-green text-black rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
                >
                  {post ? 'Actualizar' : 'Publicar'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                >
                  Cancelar
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function BlogEditor() {
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined)

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingPost(undefined)
    setShowForm(true)
  }

  if (showForm) {
    return (
      <BlogPostForm
        post={editingPost}
        onClose={() => { setShowForm(false); setEditingPost(undefined) }}
      />
    )
  }

  const statusColors: Record<string, string> = {
    published: 'text-green-400 bg-green-400/10 border-green-400/30',
    draft: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    scheduled: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  }

  const statusLabels: Record<string, string> = {
    published: 'Publicado',
    draft: 'Borrador',
    scheduled: 'Programado',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {MOCK_BLOG_POSTS.length} articulos | {MOCK_BLOG_POSTS.filter((p) => p.status === 'published').length} publicados
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreate}
          className="flex items-center gap-2 bg-cbd-green text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo Post
        </motion.button>
      </div>

      <div className="space-y-3">
        {MOCK_BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border border-white/10 hover:border-cbd-green/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-cbd-green/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-cbd-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground truncate">{post.title}</h3>
                        <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border whitespace-nowrap', statusColors[post.status])}>
                          {statusLabels[post.status]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.updatedAt}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Por: {post.author}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(post)}
                      className="p-2 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
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
