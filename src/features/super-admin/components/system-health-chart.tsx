'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', cpu: 25, memory: 55, requests: 120 },
  { time: '02:00', cpu: 18, memory: 52, requests: 80 },
  { time: '04:00', cpu: 12, memory: 50, requests: 45 },
  { time: '06:00', cpu: 15, memory: 51, requests: 90 },
  { time: '08:00', cpu: 35, memory: 58, requests: 340 },
  { time: '10:00', cpu: 45, memory: 62, requests: 520 },
  { time: '12:00', cpu: 52, memory: 65, requests: 680 },
  { time: '14:00', cpu: 48, memory: 64, requests: 590 },
  { time: '16:00', cpu: 42, memory: 61, requests: 450 },
  { time: '18:00', cpu: 38, memory: 59, requests: 380 },
  { time: '20:00', cpu: 32, memory: 57, requests: 290 },
  { time: '22:00', cpu: 28, memory: 56, requests: 200 },
]

export function SystemHealthChart() {
  return (
    <div className="bg-cbd-dark border border-cbd-dark-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Salud del Sistema (24h)</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="time" stroke="#777" fontSize={12} />
            <YAxis stroke="#777" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0A0A',
                border: '1px solid #222',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area type="monotone" dataKey="cpu" stroke="#00FF66" fill="#00FF66" fillOpacity={0.1} name="CPU %" />
            <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} name="Memoria %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
