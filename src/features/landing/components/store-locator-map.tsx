'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StoreLocation } from '@/lib/mock-data/store-locator'

interface StoreLocatorMapProps {
  stores: StoreLocation[]
  selectedStoreId: string | null
  onSelectStore: (id: string) => void
}

// Map boundaries for Spain (approximate viewport)
const MAP_BOUNDS = {
  minLat: 36.0,
  maxLat: 43.5,
  minLng: -9.5,
  maxLng: 4.5,
}

function latLngToPosition(lat: number, lng: number) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
}

export function StoreLocatorMap({ stores, selectedStoreId, onSelectStore }: StoreLocatorMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10"
    >
      {/* Map Background - Styled placeholder for Google Maps/Mapbox */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        {/* Grid overlay to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Simulated landmass shape for Spain */}
        <div className="absolute inset-[10%] rounded-[40%] bg-white/[0.03] border border-white/[0.05]" />

        {/* Map label */}
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-muted-foreground">
              Mapa interactivo - Preparado para Google Maps / Mapbox
            </p>
          </div>
        </div>

        {/* Scale indicator */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
          <div className="w-16 h-0.5 bg-white/40" />
          <span className="text-xs text-white/40">~200km</span>
        </div>

        {/* Store Markers */}
        {stores.map((store) => {
          const { x, y } = latLngToPosition(store.latitude, store.longitude)
          const isSelected = selectedStoreId === store.id
          return (
            <button
              key={store.id}
              onClick={() => onSelectStore(store.id)}
              className="absolute transform -translate-x-1/2 -translate-y-full group z-20"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Pin */}
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={cn(
                  'relative flex flex-col items-center',
                  isSelected ? 'z-30' : 'z-20'
                )}
              >
                {/* Tooltip */}
                <div
                  className={cn(
                    'absolute bottom-full mb-2 px-2 py-1 rounded bg-black/80 backdrop-blur-sm border whitespace-nowrap transition-opacity',
                    isSelected
                      ? 'opacity-100 border-cbd-green/50'
                      : 'opacity-0 group-hover:opacity-100 border-white/20'
                  )}
                >
                  <p className="text-xs font-medium text-white">{store.name.replace('CBD Premium ', '')}</p>
                  <p className="text-[10px] text-muted-foreground">{store.city}</p>
                </div>

                {/* Marker Icon */}
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center transition-all shadow-lg',
                    isSelected
                      ? 'bg-cbd-green text-black scale-125 shadow-cbd-green/50'
                      : 'bg-white/90 text-gray-800 group-hover:bg-cbd-green group-hover:text-black group-hover:scale-110'
                  )}
                >
                  <MapPin className="h-4 w-4" />
                </div>

                {/* Pulse effect for selected */}
                {isSelected && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-cbd-green/30 animate-ping" />
                )}

                {/* Pin point */}
                <div
                  className={cn(
                    'w-2 h-2 rotate-45 -mt-1',
                    isSelected ? 'bg-cbd-green' : 'bg-white/90'
                  )}
                />
              </motion.div>
            </button>
          )
        })}
      </div>

      {/* Map Controls Placeholder */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button className="h-8 w-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white text-lg font-light">
          +
        </button>
        <button className="h-8 w-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white text-lg font-light">
          -
        </button>
      </div>
    </motion.div>
  )
}
