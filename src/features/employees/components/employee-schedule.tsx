'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Employee, Schedule } from '@/lib/mock-data/employees'
import { Clock } from 'lucide-react'

interface EmployeeScheduleProps {
  employee: Employee
}

const DAYS: { key: keyof Schedule; label: string }[] = [
  { key: 'monday', label: 'Lunes' },
  { key: 'tuesday', label: 'Martes' },
  { key: 'wednesday', label: 'Miercoles' },
  { key: 'thursday', label: 'Jueves' },
  { key: 'friday', label: 'Viernes' },
  { key: 'saturday', label: 'Sabado' },
  { key: 'sunday', label: 'Domingo' },
]

export function EmployeeSchedule({ employee }: EmployeeScheduleProps) {
  const schedule = employee.schedule

  const totalHours = DAYS.reduce((total, day) => {
    const shift = schedule[day.key]
    if (!shift) return total
    const start = parseInt(shift.start.split(':')[0])
    const end = parseInt(shift.end.split(':')[0])
    return total + (end - start)
  }, 0)

  const workDays = DAYS.filter((day) => schedule[day.key] !== null).length

  return (
    <Card className="glass border-cbd-green/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Horario Semanal</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{workDays} dias/semana</span>
            <span>{totalHours}h/semana</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Headers */}
          {DAYS.map((day) => (
            <div key={day.key} className="text-center">
              <p className="text-xs font-medium text-muted-foreground mb-2">{day.label.slice(0, 3)}</p>
            </div>
          ))}

          {/* Time slots visualization */}
          {DAYS.map((day) => {
            const shift = schedule[day.key]
            return (
              <div key={`slot-${day.key}`} className="text-center">
                {shift ? (
                  <div className="bg-cbd-green/10 border border-cbd-green/30 rounded-lg p-2">
                    <Clock className="h-3 w-3 text-cbd-green mx-auto mb-1" />
                    <p className="text-xs text-cbd-green font-medium">{shift.start}</p>
                    <p className="text-[10px] text-muted-foreground">a</p>
                    <p className="text-xs text-cbd-green font-medium">{shift.end}</p>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-lg p-2 min-h-[72px] flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">Libre</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Timeline view */}
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-white mb-3">Vista Detallada</p>
          {DAYS.map((day) => {
            const shift = schedule[day.key]
            return (
              <div key={`detail-${day.key}`} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-20">{day.label}</span>
                {shift ? (
                  <div className="flex-1 relative h-6">
                    <div className="absolute inset-0 bg-white/5 rounded-full" />
                    <div
                      className="absolute top-0 h-full bg-cbd-green/20 border border-cbd-green/40 rounded-full flex items-center justify-center"
                      style={{
                        left: `${((parseInt(shift.start.split(':')[0]) - 6) / 18) * 100}%`,
                        width: `${((parseInt(shift.end.split(':')[0]) - parseInt(shift.start.split(':')[0])) / 18) * 100}%`,
                      }}
                    >
                      <span className="text-[10px] text-cbd-green font-medium">
                        {shift.start} - {shift.end}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 relative h-6">
                    <div className="absolute inset-0 bg-white/5 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">Dia libre</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
