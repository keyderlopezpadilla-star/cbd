'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle } from 'lucide-react'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Introduce un email valido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres'),
  orderNumber: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>
type FormErrors = Partial<Record<keyof ContactFormData, string>>

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = contactSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 rounded-xl border border-cbd-green/20 bg-cbd-green/5"
      >
        <CheckCircle className="h-12 w-12 text-cbd-green mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Mensaje Enviado</h3>
        <p className="text-cbd-gray-light max-w-md mx-auto">
          Hemos recibido tu mensaje. Nuestro equipo te respondera en un plazo de 24-48 horas laborables.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false)
            setFormData({ name: '', email: '', subject: '', message: '', orderNumber: '' })
          }}
          variant="outline"
          className="mt-6 border-cbd-green/30 text-cbd-green hover:bg-cbd-green/10"
        >
          Enviar otro mensaje
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Contactanos</h2>
        <p className="text-sm text-cbd-gray-light mb-6">
          No encontraste la respuesta que buscabas? Envianos tu consulta y te responderemos lo antes posible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-cbd-gray-light">
                Nombre *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`bg-white/5 border-white/10 text-white placeholder:text-cbd-gray h-10 ${
                  errors.name ? 'border-red-500/50' : 'focus:border-cbd-green/50'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-cbd-gray-light">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`bg-white/5 border-white/10 text-white placeholder:text-cbd-gray h-10 ${
                  errors.email ? 'border-red-500/50' : 'focus:border-cbd-green/50'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm text-cbd-gray-light">
                Asunto *
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Motivo de tu consulta"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className={`bg-white/5 border-white/10 text-white placeholder:text-cbd-gray h-10 ${
                  errors.subject ? 'border-red-500/50' : 'focus:border-cbd-green/50'
                }`}
              />
              {errors.subject && (
                <p className="text-xs text-red-400">{errors.subject}</p>
              )}
            </div>

            {/* Order Number */}
            <div className="space-y-2">
              <Label htmlFor="orderNumber" className="text-sm text-cbd-gray-light">
                Numero de pedido (opcional)
              </Label>
              <Input
                id="orderNumber"
                type="text"
                placeholder="ORD-2024-XXXX"
                value={formData.orderNumber}
                onChange={(e) => handleChange('orderNumber', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-cbd-gray focus:border-cbd-green/50 h-10"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm text-cbd-gray-light">
              Mensaje *
            </Label>
            <textarea
              id="message"
              placeholder="Describe tu consulta con el mayor detalle posible..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={5}
              className={`w-full rounded-md bg-white/5 border text-white placeholder:text-cbd-gray px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-cbd-green/50 ${
                errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-cbd-green/50'
              }`}
            />
            {errors.message && (
              <p className="text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cbd-green hover:bg-cbd-green/90 text-black font-medium h-11"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                />
                Enviando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensaje
              </span>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
