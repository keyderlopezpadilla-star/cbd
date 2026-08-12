'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Star, Navigation, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { StoreLocation, getDirectionsUrl } from '@/lib/mock-data/store-locator'
import { useState } from 'react'

interface StoreLocatorCardProps {
  store: StoreLocation
  isSelected: boolean
  onSelect: () => void
  index: number
}

export function StoreLocatorCard({ store, isSelected, onSelect, index }: StoreLocatorCardProps) {
  const [showHours, setShowHours] = useState(false)

  const today = new Date().getDay()
  // Convert to our schedule format (Monday = 0 in our array, but getDay returns 0 for Sunday)
  const todayIndex = today === 0 ? 6 : today - 1
  const todaySchedule = store.hours[todayIndex]
  const isOpenNow = todaySchedule?.isOpen || false

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          'glass cursor-pointer transition-all duration-300 hover:border-cbd-green/30',
          isSelected ? 'border-cbd-green/50 shadow-lg shadow-cbd-green/10' : 'border-white/10'
        )}
        onClick={onSelect}
      >
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">{store.name.replace('CBD Premium ', '')}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {store.address}, {store.city}
              </p>
            </div>
            <Badge
              className={cn(
                'text-xs',
                isOpenNow
                  ? 'bg-cbd-green/20 text-cbd-green border-cbd-green/50'
                  : 'bg-red-500/20 text-red-400 border-red-500/50'
              )}
            >
              {isOpenNow ? 'Abierto' : 'Cerrado'}
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < Math.floor(store.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-white/20'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-white font-medium">{store.rating}</span>
            <span className="text-xs text-muted-foreground">({store.reviewCount} resenas)</span>
          </div>

          {/* Contact */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Phone className="h-3 w-3 text-cbd-green" />
              {store.phone}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Mail className="h-3 w-3 text-cbd-green" />
              {store.email}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5">
            {store.features.slice(0, 3).map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="text-[10px] border-white/10 text-muted-foreground"
              >
                {feature}
              </Badge>
            ))}
            {store.features.length > 3 && (
              <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                +{store.features.length - 3} mas
              </Badge>
            )}
          </div>

          {/* Hours Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowHours(!showHours)
            }}
            className="flex items-center gap-1 text-xs text-cbd-green hover:text-cbd-green/80 transition-colors"
          >
            <Clock className="h-3 w-3" />
            {showHours ? 'Ocultar horario' : 'Ver horario'}
            {showHours ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showHours && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-1 pl-5"
            >
              {store.hours.map((h, i) => (
                <div
                  key={h.day}
                  className={cn(
                    'flex items-center justify-between text-xs',
                    i === todayIndex ? 'text-cbd-green font-medium' : 'text-muted-foreground'
                  )}
                >
                  <span>{h.day}</span>
                  <span>{h.isOpen ? `${h.open} - ${h.close}` : 'Cerrado'}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Directions Button */}
          <Button
            asChild
            size="sm"
            className="w-full bg-cbd-green text-black hover:bg-cbd-green/90 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={getDirectionsUrl(store.latitude, store.longitude)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Como Llegar
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
