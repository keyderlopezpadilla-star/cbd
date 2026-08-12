'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutTemplate, Copy, Check, Tag, Calendar, Rocket, GraduationCap, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CONTENT_TEMPLATES, getTemplatesByCategory, type ContentTemplate } from '@/lib/mock-data/ai-marketing'

type CategoryFilter = 'all' | 'seasonal' | 'product_launch' | 'loyalty' | 'educational'

const categories: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Todos', icon: LayoutTemplate },
  { id: 'seasonal', label: 'Estacional', icon: Calendar },
  { id: 'product_launch', label: 'Lanzamiento', icon: Rocket },
  { id: 'loyalty', label: 'Fidelidad', icon: Heart },
  { id: 'educational', label: 'Educativo', icon: GraduationCap },
]

function TemplateCard({ template }: { template: ContentTemplate }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(template.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const categoryIcons: Record<string, React.ElementType> = {
    seasonal: Calendar,
    product_launch: Rocket,
    loyalty: Heart,
    educational: GraduationCap,
  }

  const categoryColors: Record<string, string> = {
    seasonal: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    product_launch: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    loyalty: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
    educational: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  }

  const Icon = categoryIcons[template.category] || LayoutTemplate

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="glass border border-white/10 cursor-pointer hover:border-cbd-green/30 transition-all"
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-cbd-green/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-cbd-green" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{template.name}</h3>
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border', categoryColors[template.category])}>
                  {categories.find((c) => c.id === template.category)?.label}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-cbd-green" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </motion.button>
          </div>

          <p className="text-xs text-muted-foreground">{template.description}</p>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 pt-3"
            >
              <pre className="text-xs text-foreground whitespace-pre-wrap font-sans bg-white/5 rounded-lg p-3 border border-white/10">
                {template.content}
              </pre>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-1">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ContentTemplates() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const filteredTemplates = activeCategory === 'all'
    ? CONTENT_TEMPLATES
    : getTemplatesByCategory(activeCategory)

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                activeCategory === cat.id
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Templates info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} disponible{filteredTemplates.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-muted-foreground">
          Haz clic en un template para ver el contenido completo
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <LayoutTemplate className="h-12 w-12 mb-4 text-cbd-green/30" />
          <p className="text-sm">No hay templates en esta categoria</p>
        </div>
      )}
    </div>
  )
}
