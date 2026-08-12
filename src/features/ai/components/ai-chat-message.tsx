'use client'

import { motion } from 'framer-motion'
import { Bot, TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AIResponseChart } from './ai-response-chart'
import type { AIMessage, MetricCard } from '@/lib/mock-data/ai-assistant'

interface AIChatMessageProps {
  message: AIMessage
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return 'ahora'
  if (diffMin < 60) return `hace ${diffMin} min`
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return `hace ${diffHrs}h`
  return `hace ${Math.floor(diffHrs / 24)}d`
}

function formatContent(content: string): JSX.Element {
  // Simple markdown-like formatting: **bold**, *italic*
  const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i} className="italic text-cbd-gray">{part.slice(1, -1)}</em>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function MetricCardGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="glass border border-white/10 rounded-lg p-3"
        >
          <p className="text-[10px] text-cbd-gray uppercase tracking-wider">{metric.label}</p>
          <p className="text-sm font-bold text-white mt-0.5">{metric.value}</p>
          <div className="flex items-center gap-1 mt-1">
            {metric.trend === 'up' && <TrendingUp className="h-3 w-3 text-cbd-green" />}
            {metric.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-400" />}
            {metric.trend === 'neutral' && <Minus className="h-3 w-3 text-cbd-gray" />}
            <span className={cn(
              'text-[10px]',
              metric.trend === 'up' && 'text-cbd-green',
              metric.trend === 'down' && 'text-red-400',
              metric.trend === 'neutral' && 'text-cbd-gray'
            )}>
              {metric.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function RecommendationList({ recommendations }: { recommendations: string[] }) {
  return (
    <div className="mt-3 space-y-2">
      {recommendations.map((rec, i) => (
        <div key={i} className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-cbd-green mt-0.5 flex-shrink-0" />
          <p className="text-xs text-cbd-gray leading-relaxed">{rec}</p>
        </div>
      ))}
    </div>
  )
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex gap-3 max-w-[85%]',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      {/* Avatar */}
      <div className={cn(
        'flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center',
        isUser
          ? 'bg-cbd-green/20 text-cbd-green'
          : 'bg-cbd-green/10 border border-cbd-green/30 shadow-[0_0_12px_rgba(0,255,102,0.15)]'
      )}>
        {isUser ? (
          <span className="text-xs font-bold">TU</span>
        ) : (
          <Bot className="h-4 w-4 text-cbd-green" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        'rounded-2xl px-4 py-3 max-w-full',
        isUser
          ? 'bg-cbd-green/10 border border-cbd-green/20'
          : 'glass border border-white/10'
      )}>
        <p className={cn(
          'text-sm leading-relaxed',
          isUser ? 'text-white' : 'text-cbd-gray'
        )}>
          {formatContent(message.content)}
        </p>

        {/* Metrics */}
        {message.metrics && message.metrics.length > 0 && (
          <MetricCardGrid metrics={message.metrics} />
        )}

        {/* Chart */}
        {message.chartData && (
          <AIResponseChart
            type={message.chartData.type}
            data={message.chartData.data}
            dataKeys={message.chartData.dataKeys}
          />
        )}

        {/* Recommendations */}
        {message.recommendations && message.recommendations.length > 0 && (
          <RecommendationList recommendations={message.recommendations} />
        )}

        {/* Timestamp */}
        <p className={cn(
          'text-[10px] mt-2',
          isUser ? 'text-cbd-green/60 text-right' : 'text-white/30'
        )}>
          {formatRelativeTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  )
}
