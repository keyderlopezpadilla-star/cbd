'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PlusCircle,
  Package,
  ArrowRightLeft,
  ShoppingCart,
  UserPlus,
  BarChart3,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface QuickAction {
  label: string
  icon: React.ElementType
  href: string
  color?: string
}

const quickActions: QuickAction[] = [
  {
    label: 'New Sale',
    icon: PlusCircle,
    href: '/dashboard/sales/new',
    color: 'text-cbd-green',
  },
  {
    label: 'Add Product',
    icon: Package,
    href: '/dashboard/products/new',
    color: 'text-blue-400',
  },
  {
    label: 'Transfer Stock',
    icon: ArrowRightLeft,
    href: '/dashboard/transfers/new',
    color: 'text-purple-400',
  },
  {
    label: 'New Order',
    icon: ShoppingCart,
    href: '/dashboard/orders/new',
    color: 'text-amber-400',
  },
  {
    label: 'Add Customer',
    icon: UserPlus,
    href: '/dashboard/customers/new',
    color: 'text-cyan-400',
  },
  {
    label: 'View Reports',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: 'text-pink-400',
  },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-cbd-green" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-lg',
                    'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cbd-green/30',
                    'transition-all duration-200 cursor-pointer group'
                  )}
                >
                  <Icon className={cn('h-6 w-6 group-hover:scale-110 transition-transform', action.color)} />
                  <span className="text-xs font-medium text-cbd-gray-light group-hover:text-white transition-colors text-center">
                    {action.label}
                  </span>
                </motion.a>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
