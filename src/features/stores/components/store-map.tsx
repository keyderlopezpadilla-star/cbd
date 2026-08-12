'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Store } from '@/types'

interface StoreMapProps {
  stores: Store[]
}

// Map stores to relative positions on a simplified Spain map
// Spain roughly spans: lat 36-43.5, lon -9.3 to 3.3
function getRelativePosition(lat: number | null, lon: number | null) {
  if (lat === null || lon === null) return { x: 50, y: 50 }

  const minLat = 36
  const maxLat = 43.5
  const minLon = -9.3
  const maxLon = 3.3

  const x = ((lon - minLon) / (maxLon - minLon)) * 100
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100

  // Clamp to 5-95% to keep markers inside container
  return {
    x: Math.max(5, Math.min(95, x)),
    y: Math.max(5, Math.min(95, y)),
  }
}

export function StoreMap({ stores }: StoreMapProps) {
  const router = useRouter()

  return (
    <Card className="glass border-cbd-green/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-cbd-green" />
          Mapa de Tiendas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[300px] rounded-lg bg-cbd-black/80 border border-cbd-green/10 overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FF66" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Simplified Spain outline */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 15 20 Q 30 15, 50 18 Q 70 15, 85 22 Q 90 35, 88 50 Q 85 65, 75 75 Q 60 85, 45 82 Q 30 80, 20 70 Q 12 55, 10 40 Q 12 30, 15 20 Z"
              fill="none"
              stroke="#00FF66"
              strokeWidth="0.5"
            />
          </svg>

          {/* Store markers */}
          {stores.map((store, index) => {
            const pos = getRelativePosition(store.latitude, store.longitude)
            return (
              <motion.div
                key={store.id}
                className="absolute group cursor-pointer"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.3 }}
                onClick={() => router.push(`/dashboard/stores/${store.id}`)}
              >
                {/* Pulse ring */}
                {store.isActive && (
                  <span className="absolute -inset-2 rounded-full bg-cbd-green/20 animate-ping" />
                )}

                {/* Marker dot */}
                <div
                  className={cn(
                    'relative w-4 h-4 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150',
                    store.isActive
                      ? 'bg-cbd-green border-cbd-green shadow-[0_0_8px_rgba(0,255,102,0.5)]'
                      : 'bg-red-500 border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.3)]'
                  )}
                />

                {/* Label tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="glass-strong px-2 py-1 rounded text-xs text-white whitespace-nowrap font-medium">
                    {store.name}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Legend */}
          <div className="absolute bottom-3 right-3 flex items-center gap-4 text-xs text-cbd-gray-light">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cbd-green" />
              <span>Activa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Inactiva</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
