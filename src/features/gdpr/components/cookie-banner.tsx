'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CONSENT_CATEGORIES, ConsentCategoryId } from '@/lib/mock-data/gdpr'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [consents, setConsents] = useState<Record<ConsentCategoryId, boolean>>({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
  })

  const handleAcceptAll = () => {
    setConsents({
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    })
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    setConsents({
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
    })
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    setIsVisible(false)
  }

  const toggleConsent = (id: ConsentCategoryId) => {
    if (id === 'essential') return
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl glass border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/20">
                  <Cookie className="h-5 w-5 text-cbd-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Preferencias de Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Utilizamos cookies para mejorar tu experiencia en nuestra plataforma.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    {CONSENT_CATEGORIES.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                              {category.name}
                            </span>
                            {category.required && (
                              <span className="text-[10px] font-medium uppercase tracking-wide text-cbd-green bg-cbd-green/10 px-1.5 py-0.5 rounded">
                                Requerida
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {category.description}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleConsent(category.id)}
                          disabled={category.required}
                          className={cn(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                            consents[category.id]
                              ? 'bg-cbd-green'
                              : 'bg-white/20',
                            category.required && 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          <span
                            className={cn(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              consents[category.id] ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto bg-cbd-green text-black hover:bg-cbd-green/90 font-medium"
              >
                <Shield className="h-4 w-4 mr-2" />
                Aceptar Todas
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-foreground hover:bg-white/5"
              >
                Rechazar No Esenciales
              </Button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-cbd-green transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Ocultar Opciones
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Personalizar
                  </>
                )}
              </button>
              {isExpanded && (
                <Button
                  onClick={handleSavePreferences}
                  variant="outline"
                  className="w-full sm:w-auto border-cbd-green/50 text-cbd-green hover:bg-cbd-green/10"
                >
                  Guardar Preferencias
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
