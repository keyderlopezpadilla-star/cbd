'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { recentActivityData, ActivityItem } from '@/lib/mock-data/dashboard'
import {
  ShoppingBag,
  AlertTriangle,
  ArrowRightLeft,
  UserPlus,
  CreditCard,
  Activity,
} from 'lucide-react'
import { motion } from 'framer-motion'

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'sale':
      return <CreditCard className="h-4 w-4 text-cbd-green" />
    case 'stock_alert':
      return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case 'order':
      return <ShoppingBag className="h-4 w-4 text-blue-400" />
    case 'transfer':
      return <ArrowRightLeft className="h-4 w-4 text-purple-400" />
    case 'customer':
      return <UserPlus className="h-4 w-4 text-cyan-400" />
    default:
      return <Activity className="h-4 w-4 text-cbd-gray-light" />
  }
}

function getRelativeTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="glass border-cbd-green/20 h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-cbd-green" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivityData.slice(0, 6).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="flex items-start gap-3 group"
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-cbd-gray-light truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-cbd-gray whitespace-nowrap">
                  {getRelativeTime(activity.timestamp)}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
