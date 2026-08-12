'use client'

import { useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Clock, Wrench, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  MOCK_POINT_TRANSACTIONS,
  PointTransaction,
  PointTransactionType,
} from '@/lib/mock-data/loyalty'

const typeConfig: Record<
  PointTransactionType,
  { label: string; icon: typeof ArrowUpRight; color: string; bgColor: string }
> = {
  earned: {
    label: 'Ganados',
    icon: ArrowUpRight,
    color: 'text-cbd-green',
    bgColor: 'bg-cbd-green/10',
  },
  redeemed: {
    label: 'Canjeados',
    icon: ArrowDownRight,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  expired: {
    label: 'Expirados',
    icon: Clock,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  adjusted: {
    label: 'Ajustados',
    icon: Wrench,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
}

export function PointsHistory() {
  const [filter, setFilter] = useState<PointTransactionType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = MOCK_POINT_TRANSACTIONS.filter((tx) => {
    const matchesType = filter === 'all' || tx.type === filter
    const matchesSearch =
      searchQuery === '' ||
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Historial de Puntos
            </CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar cliente o descripcion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[220px] bg-background/50 border-border/50 text-sm"
              />
              <Filter className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={cn(
                'text-xs',
                filter === 'all'
                  ? 'bg-cbd-green text-black hover:bg-cbd-green-light'
                  : 'border-border/50'
              )}
            >
              Todos
            </Button>
            {(Object.entries(typeConfig) as [PointTransactionType, typeof typeConfig.earned][]).map(
              ([type, config]) => (
                <Button
                  key={type}
                  variant={filter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className={cn(
                    'text-xs',
                    filter === type
                      ? `${config.bgColor} ${config.color} border-transparent hover:opacity-80`
                      : 'border-border/50'
                  )}
                >
                  {config.label}
                </Button>
              )
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron transacciones
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TransactionRow({ transaction }: { transaction: PointTransaction }) {
  const config = typeConfig[transaction.type]
  const Icon = config.icon

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', config.bgColor)}>
          <Icon className={cn('h-4 w-4', config.color)} />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{transaction.customerName}</p>
          <p className="text-xs text-muted-foreground">{transaction.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={cn('text-sm font-semibold', config.color)}>
            {transaction.points > 0 ? '+' : ''}
            {transaction.points} pts
          </p>
          <p className="text-xs text-muted-foreground">
            Saldo: {transaction.balance.toLocaleString()}
          </p>
        </div>
        <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
          {formatDate(transaction.date)}
        </Badge>
      </div>
    </div>
  )
}
