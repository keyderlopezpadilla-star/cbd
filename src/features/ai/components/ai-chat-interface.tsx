'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AIChatMessage } from './ai-chat-message'
import { AISuggestedQueries } from './ai-suggested-queries'
import { WELCOME_MESSAGE, getMockAIResponse, type AIMessage } from '@/lib/mock-data/ai-assistant'

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 mr-auto max-w-[85%]"
    >
      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-cbd-green/10 border border-cbd-green/30 shadow-[0_0_12px_rgba(0,255,102,0.15)]">
        <Bot className="h-4 w-4 text-cbd-green" />
      </div>
      <div className="glass border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1.5">
        <motion.span
          className="w-2 h-2 rounded-full bg-cbd-green/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          className="w-2 h-2 rounded-full bg-cbd-green/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
        />
        <motion.span
          className="w-2 h-2 rounded-full bg-cbd-green/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export function AIChatInterface() {
  const [messages, setMessages] = useState<AIMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const handleSend = useCallback((text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    // Add user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time (1-2 seconds)
    const delay = 1000 + Math.random() * 1000
    setTimeout(() => {
      const aiResponse = getMockAIResponse(messageText)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, delay)
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuerySelect = (query: string) => {
    handleSend(query)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass border border-cbd-green/20 rounded-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
          <div className="h-9 w-9 rounded-full bg-cbd-green/10 border border-cbd-green/30 flex items-center justify-center shadow-[0_0_16px_rgba(0,255,102,0.2)]">
            <Sparkles className="h-4 w-4 text-cbd-green" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Asistente IA</h3>
            <p className="text-[10px] text-cbd-green">En linea - Datos de ejemplo</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <AIChatMessage key={message.id} message={message} />
          ))}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Mobile Suggestions */}
        <div className="lg:hidden px-4 pb-2 overflow-x-auto">
          <div className="flex gap-2">
            {['Ventas de hoy', 'Stock critico', 'Recomendaciones'].map((q) => (
              <button
                key={q}
                onClick={() => handleQuerySelect(q)}
                className="whitespace-nowrap px-3 py-1.5 text-xs rounded-full border border-cbd-green/20 text-cbd-gray hover:text-white hover:border-cbd-green/40 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregunta algo sobre tu negocio..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-cbd-gray/50 focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className={cn(
                'h-10 w-10 rounded-xl flex items-center justify-center transition-all',
                input.trim() && !isTyping
                  ? 'bg-cbd-green text-black hover:bg-cbd-green/90'
                  : 'bg-white/5 text-cbd-gray/40 cursor-not-allowed'
              )}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Suggestions Sidebar - Desktop */}
      <div className="hidden lg:block w-80 glass border border-cbd-green/20 rounded-2xl p-5 overflow-y-auto">
        <AISuggestedQueries onQuerySelect={handleQuerySelect} />
      </div>
    </div>
  )
}
