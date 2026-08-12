'use client'

import { motion } from 'framer-motion'
import { Bot, AlertCircle } from 'lucide-react'
import { AIChatInterface } from '@/features/ai/components/ai-chat-interface'

export default function AIAssistantPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.15)]">
            <Bot className="h-5 w-5 text-cbd-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Asistente de Negocio IA</h1>
            <p className="text-sm text-cbd-gray">Consulta datos de ventas, inventario y rendimiento en tiempo real</p>
          </div>
        </div>

        {/* Disclaimer Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5">
          <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-[11px] text-amber-400 font-medium">
            Respuestas generadas con datos de ejemplo
          </span>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <AIChatInterface />
      </motion.div>
    </div>
  )
}
