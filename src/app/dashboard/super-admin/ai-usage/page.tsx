'use client'

import { motion } from 'framer-motion'
import { Brain, MessageSquare, TrendingUp, DollarSign, Zap } from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const aiStats = [
  { label: 'Total Queries (mes)', value: '45,231', change: '+12.3%', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Coste Total', value: '€2,847', change: '+8.7%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Queries/Dia (avg)', value: '1,508', change: '+5.2%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Tokens Consumidos', value: '12.4M', change: '+15.1%', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
]

const dailyTrendData = [
  { date: '1 Nov', queries: 1200, cost: 84 },
  { date: '5 Nov', queries: 1450, cost: 101 },
  { date: '10 Nov', queries: 1380, cost: 97 },
  { date: '15 Nov', queries: 1650, cost: 115 },
  { date: '20 Nov', queries: 1520, cost: 106 },
  { date: '25 Nov', queries: 1780, cost: 125 },
  { date: '30 Nov', queries: 1620, cost: 113 },
]

const costByFeature = [
  { name: 'Asistente AI', value: 1245, color: '#22C55E' },
  { name: 'Predicciones', value: 876, color: '#3B82F6' },
  { name: 'Marketing', value: 432, color: '#A855F7' },
  { name: 'Analisis', value: 294, color: '#F59E0B' },
]

const usageByOrg = [
  { org: 'CBD Madrid', queries: 12500, cost: 875 },
  { org: 'GreenLeaf', queries: 8900, cost: 623 },
  { org: 'CBD Express', queries: 7200, cost: 504 },
  { org: 'NaturaCBD', queries: 5800, cost: 406 },
  { org: 'HempStore', queries: 4100, cost: 287 },
  { org: 'Otros', queries: 6731, cost: 152 },
]

export default function AIUsagePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cbd-green/10 flex items-center justify-center">
            <Brain className="h-5 w-5 text-cbd-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Uso de AI</h1>
            <p className="text-sm text-cbd-gray-light">
              Estadisticas de uso, costes y tendencias de funciones AI
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {aiStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-green-400">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-cbd-gray-light mt-1">{stat.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Trend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2 bg-cbd-dark border border-cbd-dark-border rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Tendencia Diaria</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="queries"
                  stroke="#22C55E"
                  fill="#22C55E"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Coste por Funcionalidad</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costByFeature}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {costByFeature.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [`€${value}`, 'Coste']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {costByFeature.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-cbd-gray-light">{item.name}</span>
                </div>
                <span className="text-white font-medium">&euro;{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Usage by Organization */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Uso por Organizacion</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageByOrg} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis type="number" stroke="#666" fontSize={12} />
              <YAxis type="category" dataKey="org" stroke="#666" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #222',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="queries" fill="#22C55E" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
