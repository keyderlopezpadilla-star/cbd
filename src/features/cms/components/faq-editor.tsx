'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MOCK_FAQ_ENTRIES, FAQ_CATEGORIES, type FAQEntry } from '@/lib/mock-data/cms'

function FAQForm({
  faq,
  onClose,
}: {
  faq?: FAQEntry
  onClose: () => void
}) {
  const [question, setQuestion] = useState(faq?.question || '')
  const [answer, setAnswer] = useState(faq?.answer || '')
  const [category, setCategory] = useState(faq?.category || FAQ_CATEGORIES[0])
  const [isPublished, setIsPublished] = useState(faq?.isPublished ?? true)

  return (
    <Card className="glass border border-white/10">
      <CardHeader>
        <CardTitle className="text-lg">
          {faq ? 'Editar Pregunta' : 'Nueva Pregunta'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Pregunta</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Escribe la pregunta..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Respuesta</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Escribe la respuesta..."
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Estado</label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-cbd-green focus:ring-cbd-green/20"
              />
              <span className="text-sm text-foreground">Publicada</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-cbd-green text-black rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
          >
            {faq ? 'Guardar Cambios' : 'Crear Pregunta'}
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

export function FAQEditor() {
  const [showForm, setShowForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQEntry | undefined>(undefined)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const handleEdit = (faq: FAQEntry) => {
    setEditingFaq(faq)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingFaq(undefined)
    setShowForm(true)
  }

  if (showForm) {
    return (
      <FAQForm
        faq={editingFaq}
        onClose={() => { setShowForm(false); setEditingFaq(undefined) }}
      />
    )
  }

  const filteredFaqs = selectedCategory === 'all'
    ? MOCK_FAQ_ENTRIES
    : MOCK_FAQ_ENTRIES.filter((f) => f.category === selectedCategory)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {filteredFaqs.length} preguntas | {filteredFaqs.filter((f) => f.isPublished).length} publicadas
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 transition-all"
          >
            <option value="all" className="bg-gray-900">Todas las categorias</option>
            {FAQ_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreate}
            className="flex items-center gap-2 bg-cbd-green text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nueva Pregunta
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredFaqs.sort((a, b) => a.order - b.order).map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass border border-white/10 hover:border-cbd-green/20 transition-colors">
              <CardContent className="p-0">
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-cbd-green flex-shrink-0" />
                      <h3 className="text-sm font-medium text-foreground truncate">{faq.question}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1 ml-6">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                        {faq.category}
                      </span>
                      <span className="text-xs text-muted-foreground">Orden: {faq.order}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {faq.isPublished ? (
                      <Eye className="h-4 w-4 text-cbd-green" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    {expandedId === faq.id ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-4 pb-4 border-t border-white/5"
                  >
                    <p className="text-sm text-muted-foreground mt-3 ml-7">
                      {faq.answer}
                    </p>
                    <div className="flex items-center gap-2 mt-3 ml-7">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); handleEdit(faq) }}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                      >
                        <Edit2 className="h-3 w-3" />
                        Editar
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
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
