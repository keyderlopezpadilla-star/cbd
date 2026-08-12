'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MOCK_CALENDAR_EVENTS, CalendarEvent } from '@/lib/mock-data/marketing'

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const eventTypeLabels: Record<string, string> = {
  campaign: 'Campana',
  coupon: 'Cupon',
  flash_sale: 'Flash Sale',
  event: 'Evento',
}

export function PromotionalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const navigateMonth = (direction: number) => {
    const newDate = new Date(year, month + direction, 1)
    setCurrentDate(newDate)
  }

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startOffset = (firstDay.getDay() + 6) % 7 // Monday start
    const daysInMonth = lastDay.getDate()

    const days: { date: number | null; events: CalendarEvent[] }[] = []

    // Empty cells before first day
    for (let i = 0; i < startOffset; i++) {
      days.push({ date: null, events: [] })
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day)
      const dayEvents = MOCK_CALENDAR_EVENTS.filter((event) => {
        const eventStart = new Date(event.date)
        const eventEnd = event.endDate ? new Date(event.endDate) : eventStart

        // Check if this day falls within the event range
        const dayStart = new Date(year, month, day)
        const dayEnd = new Date(year, month, day, 23, 59, 59)

        return eventStart <= dayEnd && eventEnd >= dayStart
      })
      days.push({ date: day, events: dayEvents })
    }

    return days
  }, [year, month])

  const today = new Date()
  const isToday = (day: number | null) =>
    day !== null &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-cbd-green" />
            Calendario Promocional
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-white min-w-[140px] text-center">
              {MONTHS[month]} {year}
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#00FF66]" />
              <span className="text-[10px] text-muted-foreground">Campana</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#EC4899]" />
              <span className="text-[10px] text-muted-foreground">Cupon</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[10px] text-muted-foreground">Flash Sale</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
              <span className="text-[10px] text-muted-foreground">Evento</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-white/5 rounded-lg overflow-hidden">
            {/* Day Headers */}
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="bg-black/30 p-2 text-center">
                <span className="text-[10px] font-medium text-muted-foreground uppercase">{day}</span>
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((dayData, index) => (
              <div
                key={index}
                className={cn(
                  'min-h-[80px] p-1.5 bg-black/20 border border-transparent transition-colors',
                  dayData.date !== null && 'hover:border-cbd-green/20',
                  isToday(dayData.date) && 'border-cbd-green/40 bg-cbd-green/5'
                )}
              >
                {dayData.date !== null && (
                  <>
                    <span className={cn(
                      'text-xs font-medium',
                      isToday(dayData.date) ? 'text-cbd-green' : 'text-white/70'
                    )}>
                      {dayData.date}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {dayData.events.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="text-[9px] px-1 py-0.5 rounded truncate"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayData.events.length > 3 && (
                        <span className="text-[9px] text-muted-foreground px-1">
                          +{dayData.events.length - 3} mas
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Upcoming Events List */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-medium text-white mb-2">Proximos Eventos</h4>
            <div className="space-y-2">
              {MOCK_CALENDAR_EVENTS.filter((e) => new Date(e.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-1.5 px-2 rounded bg-black/10"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <span className="text-xs text-white">{event.title}</span>
                    </div>
                    <Badge className="text-[9px] bg-black/30 text-muted-foreground border-white/10">
                      {eventTypeLabels[event.type]}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
