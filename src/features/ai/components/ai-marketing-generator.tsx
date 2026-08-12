'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Mail, FileText, Megaphone, Wand2, Copy, Check, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  TONE_OPTIONS,
  AUDIENCE_OPTIONS,
  MOCK_GENERATED_CONTENT,
  checkCompliance,
  type GeneratedContent,
} from '@/lib/mock-data/ai-marketing'

type GeneratorTab = 'campaign' | 'email' | 'product_description'

const generatorTabs: { id: GeneratorTab; label: string; icon: React.ElementType }[] = [
  { id: 'campaign', label: 'Campana', icon: Megaphone },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'product_description', label: 'Descripcion Producto', icon: FileText },
]

function ComplianceBadge({ score }: { score: number }) {
  const color = score >= 90 ? 'text-green-400 border-green-400/30 bg-green-400/10' :
    score >= 60 ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
    'text-red-400 border-red-400/30 bg-red-400/10'

  const label = score >= 90 ? 'Conforme' : score >= 60 ? 'Revisar' : 'No Conforme'

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border', color)}>
      {score < 60 && <AlertTriangle className="h-3 w-3" />}
      {label} ({score}%)
    </span>
  )
}

export function AIMarketingGenerator() {
  const [activeTab, setActiveTab] = useState<GeneratorTab>('campaign')
  const [productName, setProductName] = useState('')
  const [tone, setTone] = useState('profesional')
  const [audience, setAudience] = useState('todos')
  const [additionalContext, setAdditionalContext] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const mockResults = MOCK_GENERATED_CONTENT.filter((c) => c.type === activeTab)
      const result = mockResults[0] || MOCK_GENERATED_CONTENT[0]
      setGeneratedContent({
        ...result,
        title: productName || result.title,
        tone,
        targetAudience: AUDIENCE_OPTIONS.find((a) => a.id === audience)?.label || audience,
      })
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'campaign': return 'Ej: Campana Verano 2024, Lanzamiento Aceite Premium...'
      case 'email': return 'Ej: Newsletter Enero, Bienvenida Nuevos Clientes...'
      case 'product_description': return 'Ej: Aceite CBD Full Spectrum 20%, Crema Facial CBD...'
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case 'campaign': return 'Generador de Campanas'
      case 'email': return 'Generador de Emails'
      case 'product_description': return 'Generador de Descripciones'
    }
  }

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit">
        {generatorTabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setGeneratedContent(null) }}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-cbd-green" />
                {getTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product/Campaign Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {activeTab === 'campaign' ? 'Nombre de la Campana' :
                   activeTab === 'email' ? 'Asunto del Email' : 'Nombre del Producto'}
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                />
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tono</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                >
                  {TONE_OPTIONS.map((t) => (
                    <option key={t.id} value={t.id} className="bg-gray-900">{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Audiencia Objetivo</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
                >
                  {AUDIENCE_OPTIONS.map((a) => (
                    <option key={a.id} value={a.id} className="bg-gray-900">{a.label}</option>
                  ))}
                </select>
              </div>

              {/* Additional Context */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Contexto Adicional</label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Describe detalles adicionales, ofertas especiales, caracteristicas a destacar..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className={cn(
                  'w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                  isGenerating
                    ? 'bg-cbd-green/30 text-cbd-green cursor-wait'
                    : 'bg-cbd-green text-black hover:bg-cbd-green/90'
                )}
              >
                <Wand2 className={cn('h-4 w-4', isGenerating && 'animate-spin')} />
                {isGenerating ? 'Generando contenido...' : 'Generar con IA'}
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Generated Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Resultado</CardTitle>
                {generatedContent && <ComplianceBadge score={generatedContent.complianceScore} />}
              </div>
            </CardHeader>
            <CardContent>
              {!generatedContent && !isGenerating && (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 text-cbd-green/30" />
                  <p className="text-sm text-center">
                    Configura los parametros y haz clic en &quot;Generar con IA&quot; para crear contenido
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center justify-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-12 w-12 text-cbd-green" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-4">Generando contenido optimizado...</p>
                </div>
              )}

              {generatedContent && !isGenerating && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">{generatedContent.title}</h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="p-2 rounded-md hover:bg-white/5 transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-cbd-green" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </motion.button>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {generatedContent.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
                      Tono: {generatedContent.tone}
                    </span>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
                      Audiencia: {generatedContent.targetAudience}
                    </span>
                  </div>

                  {generatedContent.violations.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Violaciones de compliance detectadas:
                      </p>
                      <ul className="space-y-1">
                        {generatedContent.violations.map((v, i) => (
                          <li key={i} className="text-xs text-red-300">• &quot;{v}&quot;</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Generations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Generaciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_GENERATED_CONTENT.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cbd-green/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-cbd-green/10 flex items-center justify-center">
                      {item.type === 'campaign' && <Megaphone className="h-4 w-4 text-cbd-green" />}
                      {item.type === 'email' && <Mail className="h-4 w-4 text-cbd-green" />}
                      {item.type === 'product_description' && <FileText className="h-4 w-4 text-cbd-green" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.createdAt} - {item.tone}</p>
                    </div>
                  </div>
                  <ComplianceBadge score={item.complianceScore} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
