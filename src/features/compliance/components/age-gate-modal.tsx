'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Calendar, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { AGE_GATE_SETTINGS } from '@/lib/mock-data/compliance'

type VerificationState = 'pending' | 'verified' | 'rejected'

export function AgeGateModal() {
  const [state, setState] = useState<VerificationState>('pending')
  const [isVisible, setIsVisible] = useState(true)
  const [dob, setDob] = useState('')
  const [dobError, setDobError] = useState('')
  const settings = AGE_GATE_SETTINGS

  const calculateAge = (dateString: string): number => {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleButtonVerification = () => {
    setState('verified')
    setTimeout(() => setIsVisible(false), 1000)
  }

  const handleDobVerification = () => {
    if (!dob) {
      setDobError('Por favor, introduce tu fecha de nacimiento')
      return
    }
    const age = calculateAge(dob)
    if (age >= settings.minimumAge) {
      setState('verified')
      setTimeout(() => setIsVisible(false), 1000)
    } else {
      setState('rejected')
    }
  }

  const handleReject = () => {
    setState('rejected')
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          {state === 'pending' && (
            <div className="space-y-6 text-center">
              {/* Logo / Icon */}
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cbd-green/10 border border-cbd-green/30">
                  <Shield className="h-8 w-8 text-cbd-green" />
                </div>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-xl font-bold text-foreground">Verificacion de Edad</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {settings.customMessage}
                </p>
              </div>

              {/* Verification Methods */}
              {settings.verificationMethod === 'button' && (
                <div className="space-y-3">
                  <Button
                    onClick={handleButtonVerification}
                    className="w-full bg-cbd-green text-black hover:bg-cbd-green/90 font-semibold h-12 text-base"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Soy mayor de {settings.minimumAge} anos
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="w-full border-white/20 text-foreground hover:bg-white/5 h-12"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Soy menor de {settings.minimumAge} anos
                  </Button>
                </div>
              )}

              {settings.verificationMethod === 'dob' && (
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <Label className="text-sm text-muted-foreground">Fecha de Nacimiento</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={dob}
                        onChange={(e) => {
                          setDob(e.target.value)
                          setDobError('')
                        }}
                        className="pl-10 bg-white/5 border-white/10 h-12"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {dobError && (
                      <p className="text-xs text-red-400">{dobError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleDobVerification}
                    className="w-full bg-cbd-green text-black hover:bg-cbd-green/90 font-semibold h-12 text-base"
                  >
                    Verificar Edad
                  </Button>
                </div>
              )}

              {/* DOB Option always available as alternative */}
              {settings.verificationMethod === 'button' && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    O verifica con tu fecha de nacimiento:
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={dob}
                        onChange={(e) => {
                          setDob(e.target.value)
                          setDobError('')
                        }}
                        className="pl-10 bg-white/5 border-white/10"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <Button
                      onClick={handleDobVerification}
                      variant="outline"
                      className="border-cbd-green/50 text-cbd-green hover:bg-cbd-green/10"
                    >
                      Verificar
                    </Button>
                  </div>
                  {dobError && (
                    <p className="text-xs text-red-400 mt-1">{dobError}</p>
                  )}
                </div>
              )}

              {/* Legal Notice */}
              <p className="text-[11px] text-muted-foreground">
                Al acceder a este sitio, confirmas que cumples con los requisitos de edad 
                establecidos por la legislacion vigente en tu pais de residencia.
              </p>
            </div>
          )}

          {state === 'verified' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center py-4"
            >
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-cbd-green/20"
                >
                  <CheckCircle className="h-8 w-8 text-cbd-green" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Verificacion Exitosa</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Bienvenido a nuestra tienda CBD
                </p>
              </div>
            </motion.div>
          )}

          {state === 'rejected' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center py-4"
            >
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-400/20">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Acceso Denegado</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Debes ser mayor de {settings.minimumAge} anos para acceder a este sitio.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Seras redirigido en breve...
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
