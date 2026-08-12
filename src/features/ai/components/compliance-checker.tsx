'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, Search, RotateCcw, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BANNED_PHRASES, checkCompliance, type BannedPhrase } from '@/lib/mock-data/ai-marketing'

function ViolationCard({ violation }: { violation: BannedPhrase }) {
  const categoryColors: Record<string, string> = {
    medical_claim: 'text-red-400 border-red-400/30 bg-red-400/10',
    therapeutic: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    unapproved: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    misleading: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  }

  const categoryLabels: Record<string, string> = {
    medical_claim: 'Afirmacion Medica',
    therapeutic: 'Uso Terapeutico',
    unapproved: 'No Aprobado',
    misleading: 'Enganoso',
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
      <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-red-400">&quot;{violation.phrase}&quot;</span>
          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border', categoryColors[violation.category])}>
            {categoryLabels[violation.category]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-cbd-green" />
          <span className="text-xs text-muted-foreground">Alternativa: </span>
          <span className="text-xs text-cbd-green">&quot;{violation.suggestion}&quot;</span>
        </div>
      </div>
    </div>
  )
}

export function ComplianceChecker() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<{ score: number; violations: BannedPhrase[] } | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = () => {
    if (!text.trim()) return
    setIsChecking(true)
    setTimeout(() => {
      const result = checkCompliance(text)
      setResults(result)
      setIsChecking(false)
    }, 1000)
  }

  const handleReset = () => {
    setText('')
    setResults(null)
  }

  const highlightViolations = (content: string, violations: BannedPhrase[]) => {
    if (violations.length === 0) return content

    let highlighted = content
    violations.forEach((v) => {
      const regex = new RegExp(`(${v.phrase})`, 'gi')
      highlighted = highlighted.replace(regex, `【$1】`)
    })
    return highlighted
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-cbd-green" />
                Verificador de Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pega o escribe tu contenido de marketing para verificar que cumple con las regulaciones de publicidad CBD.
              </p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe o pega aqui tu texto de marketing CBD para verificar compliance..."
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all resize-none"
              />
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheck}
                  disabled={!text.trim() || isChecking}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                    !text.trim() || isChecking
                      ? 'bg-cbd-green/30 text-cbd-green/60 cursor-not-allowed'
                      : 'bg-cbd-green text-black hover:bg-cbd-green/90'
                  )}
                >
                  <Search className={cn('h-4 w-4', isChecking && 'animate-pulse')} />
                  {isChecking ? 'Analizando...' : 'Verificar Compliance'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="p-2.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass border border-white/10 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Resultados</CardTitle>
                {results && (
                  <div className={cn(
                    'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold',
                    results.score >= 90 ? 'text-green-400 bg-green-400/10 border border-green-400/30' :
                    results.score >= 60 ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30' :
                    'text-red-400 bg-red-400/10 border border-red-400/30'
                  )}>
                    {results.score}%
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!results && !isChecking && (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <ShieldCheck className="h-12 w-12 mb-4 text-cbd-green/30" />
                  <p className="text-sm text-center">
                    Introduce texto para verificar su conformidad con las regulaciones CBD
                  </p>
                </div>
              )}

              {isChecking && (
                <div className="flex flex-col items-center justify-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  >
                    <Search className="h-12 w-12 text-cbd-green" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-4">Analizando contenido...</p>
                </div>
              )}

              {results && !isChecking && (
                <div className="space-y-4">
                  {/* Score Summary */}
                  <div className={cn(
                    'p-4 rounded-lg border',
                    results.score >= 90 ? 'bg-green-500/10 border-green-500/30' :
                    results.score >= 60 ? 'bg-yellow-500/10 border-yellow-500/30' :
                    'bg-red-500/10 border-red-500/30'
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      {results.score >= 90 ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      )}
                      <span className="text-sm font-semibold text-foreground">
                        {results.score >= 90 ? 'Contenido Conforme' :
                         results.score >= 60 ? 'Requiere Revision' :
                         'No Conforme - Editar Antes de Publicar'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {results.violations.length === 0
                        ? 'No se encontraron frases prohibidas. El contenido cumple con las regulaciones.'
                        : `Se encontraron ${results.violations.length} violacion(es) que deben corregirse.`}
                    </p>
                  </div>

                  {/* Highlighted Text */}
                  {results.violations.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-2">Texto con violaciones marcadas:</p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {highlightViolations(text, results.violations).split(/【|】/).map((part, i) => {
                          const isViolation = results.violations.some(
                            (v) => v.phrase.toLowerCase() === part.toLowerCase()
                          )
                          return isViolation ? (
                            <span key={i} className="bg-red-500/30 text-red-300 px-1 rounded font-medium">
                              {part}
                            </span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        })}
                      </p>
                    </div>
                  )}

                  {/* Violations List */}
                  {results.violations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Violaciones Detectadas:</p>
                      {results.violations.map((v, i) => (
                        <ViolationCard key={i} violation={v} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Banned Phrases Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Referencia: Frases Prohibidas CBD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['medical_claim', 'therapeutic', 'unapproved', 'misleading'] as const).map((category) => {
                const labels: Record<string, string> = {
                  medical_claim: 'Afirmaciones Medicas',
                  therapeutic: 'Uso Terapeutico',
                  unapproved: 'No Aprobado',
                  misleading: 'Enganoso',
                }
                const colors: Record<string, string> = {
                  medical_claim: 'border-red-400/30',
                  therapeutic: 'border-orange-400/30',
                  unapproved: 'border-yellow-400/30',
                  misleading: 'border-purple-400/30',
                }
                const phrases = BANNED_PHRASES.filter((p) => p.category === category)
                return (
                  <div key={category} className={cn('rounded-lg border p-3 bg-white/5', colors[category])}>
                    <h4 className="text-xs font-semibold text-foreground mb-2">{labels[category]}</h4>
                    <div className="space-y-1">
                      {phrases.slice(0, 5).map((p, i) => (
                        <p key={i} className="text-xs text-muted-foreground">• {p.phrase}</p>
                      ))}
                      {phrases.length > 5 && (
                        <p className="text-xs text-cbd-green">+{phrases.length - 5} mas</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
