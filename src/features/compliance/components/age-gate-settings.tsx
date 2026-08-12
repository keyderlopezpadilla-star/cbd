'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Settings,
  Monitor,
  Calendar,
  Link2,
  FileText,
  ToggleLeft,
  ToggleRight,
  Plus,
  X,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { AGE_GATE_SETTINGS, VerificationMethod } from '@/lib/mock-data/compliance'

const verificationMethods: { value: VerificationMethod; label: string; description: string }[] = [
  { value: 'button', label: 'Boton Simple', description: 'El usuario confirma ser mayor de edad con un clic' },
  { value: 'dob', label: 'Fecha de Nacimiento', description: 'El usuario debe introducir su fecha de nacimiento' },
  { value: 'id_upload', label: 'Documento de Identidad', description: 'Verificacion mediante DNI o pasaporte (requiere integracion)' },
]

export function AgeGateSettings() {
  const [settings, setSettings] = useState(AGE_GATE_SETTINGS)
  const [newExemptPage, setNewExemptPage] = useState('')

  const toggleEnabled = () => {
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }))
  }

  const toggleShowOnEveryVisit = () => {
    setSettings((prev) => ({ ...prev, showOnEveryVisit: !prev.showOnEveryVisit }))
  }

  const addExemptPage = () => {
    if (newExemptPage && !settings.exemptPages.includes(newExemptPage)) {
      setSettings((prev) => ({
        ...prev,
        exemptPages: [...prev.exemptPages, newExemptPage],
      }))
      setNewExemptPage('')
    }
  }

  const removeExemptPage = (page: string) => {
    setSettings((prev) => ({
      ...prev,
      exemptPages: prev.exemptPages.filter((p) => p !== page),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card className="glass border border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                settings.enabled ? 'bg-cbd-green/10' : 'bg-white/5'
              )}>
                <Shield className={cn('h-5 w-5', settings.enabled ? 'text-cbd-green' : 'text-muted-foreground')} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Verificacion de Edad {settings.enabled ? 'Activa' : 'Desactivada'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {settings.enabled
                    ? 'Los visitantes deben verificar su edad antes de acceder'
                    : 'Los visitantes pueden acceder sin verificacion'}
                </p>
              </div>
            </div>
            <button onClick={toggleEnabled}>
              {settings.enabled ? (
                <ToggleRight className="h-8 w-8 text-cbd-green" />
              ) : (
                <ToggleLeft className="h-8 w-8 text-muted-foreground" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="glass border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-cbd-green" />
              Configuracion General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Metodo de Verificacion</Label>
              <Select
                value={settings.verificationMethod}
                onValueChange={(value: VerificationMethod) =>
                  setSettings((prev) => ({ ...prev, verificationMethod: value }))
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {verificationMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {verificationMethods.find((m) => m.value === settings.verificationMethod)?.description}
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Edad Minima</Label>
              <Input
                type="number"
                value={settings.minimumAge}
                onChange={(e) => setSettings((prev) => ({ ...prev, minimumAge: parseInt(e.target.value) || 18 }))}
                className="bg-white/5 border-white/10"
                min={16}
                max={21}
              />
              <p className="text-xs text-muted-foreground">
                Espana: 18 anos | USA: 21 anos (algunos estados)
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Recordar durante (dias)</Label>
              <Input
                type="number"
                value={settings.rememberDays}
                onChange={(e) => setSettings((prev) => ({ ...prev, rememberDays: parseInt(e.target.value) || 30 }))}
                className="bg-white/5 border-white/10"
                min={1}
                max={365}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Mostrar en cada visita</p>
                <p className="text-xs text-muted-foreground">Ignorar cookies de recordatorio</p>
              </div>
              <button onClick={toggleShowOnEveryVisit}>
                {settings.showOnEveryVisit ? (
                  <ToggleRight className="h-6 w-6 text-cbd-green" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-muted-foreground" />
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Redirect & Exempt Pages */}
        <div className="space-y-6">
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Link2 className="h-5 w-5 text-cbd-green" />
                Redireccion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">URL de redireccion para menores</Label>
                <Input
                  value={settings.redirectUrl}
                  onChange={(e) => setSettings((prev) => ({ ...prev, redirectUrl: e.target.value }))}
                  className="bg-white/5 border-white/10"
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  Los usuarios que no superen la verificacion seran redirigidos aqui
                </p>
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Mensaje personalizado</Label>
                <textarea
                  value={settings.customMessage}
                  onChange={(e) => setSettings((prev) => ({ ...prev, customMessage: e.target.value }))}
                  className="w-full h-20 rounded-lg bg-white/5 border border-white/10 p-3 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-cbd-green/50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-cbd-green" />
                Paginas Exentas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Estas paginas no requieren verificacion de edad
              </p>
              <div className="flex gap-2">
                <Input
                  value={newExemptPage}
                  onChange={(e) => setNewExemptPage(e.target.value)}
                  placeholder="/ruta-de-pagina"
                  className="bg-white/5 border-white/10"
                />
                <Button
                  onClick={addExemptPage}
                  variant="outline"
                  className="border-cbd-green/50 text-cbd-green hover:bg-cbd-green/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.exemptPages.map((page) => (
                  <Badge
                    key={page}
                    variant="outline"
                    className="border-white/20 text-foreground flex items-center gap-1 pr-1"
                  >
                    {page}
                    <button
                      onClick={() => removeExemptPage(page)}
                      className="ml-1 hover:text-red-400 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview */}
      <Card className="glass border border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Vista previa del modal de edad</span>
            </div>
            <Button className="bg-cbd-green text-black hover:bg-cbd-green/90">
              Guardar Configuracion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
