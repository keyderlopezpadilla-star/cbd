'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Upload, Clock, Globe, Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { STORE_CONFIG } from '@/lib/mock-data/settings'

const timezones = [
  'Europe/Madrid',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'America/New_York',
  'America/Los_Angeles',
  'Atlantic/Canary',
]

export function GeneralSettings() {
  const [config, setConfig] = useState(STORE_CONFIG)

  const updateConfig = (field: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Store Identity */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Store className="h-5 w-5 text-cbd-green" />
            Identidad de la Tienda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Nombre de la Tienda</Label>
            <Input
              value={config.name}
              onChange={(e) => updateConfig('name', e.target.value)}
              className="bg-black/20 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Descripcion</Label>
            <textarea
              value={config.description}
              onChange={(e) => updateConfig('description', e.target.value)}
              className="w-full h-24 rounded-md bg-black/20 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cbd-green/50 resize-none"
              placeholder="Descripcion de tu negocio..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center bg-black/20">
                {config.logo ? (
                  <img src={config.logo} alt="Logo" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="border-white/10">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Logo
                </Button>
                <p className="text-xs text-muted-foreground">PNG, JPG o SVG. Max 2MB.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Sitio Web</Label>
            <Input
              value={config.website}
              onChange={(e) => updateConfig('website', e.target.value)}
              className="bg-black/20 border-white/10"
              placeholder="https://www.ejemplo.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-cbd-green" />
            Informacion de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Phone className="h-3 w-3" />
                Telefono
              </Label>
              <Input
                value={config.phone}
                onChange={(e) => updateConfig('phone', e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Email
              </Label>
              <Input
                type="email"
                value={config.email}
                onChange={(e) => updateConfig('email', e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
          </div>

          <Separator className="border-white/10" />

          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              Direccion
            </Label>
            <Input
              value={config.address}
              onChange={(e) => updateConfig('address', e.target.value)}
              className="bg-black/20 border-white/10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Ciudad</Label>
              <Input
                value={config.city}
                onChange={(e) => updateConfig('city', e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Codigo Postal</Label>
              <Input
                value={config.postalCode}
                onChange={(e) => updateConfig('postalCode', e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Pais</Label>
              <Input
                value={config.country}
                onChange={(e) => updateConfig('country', e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timezone */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-cbd-green" />
            Zona Horaria
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Globe className="h-3 w-3" />
              Zona Horaria
            </Label>
            <Select value={config.timezone} onValueChange={(v) => updateConfig('timezone', v)}>
              <SelectTrigger className="bg-black/20 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="border-white/10" />

          <div className="space-y-3">
            <Label className="text-white">Horario Comercial</Label>
            <div className="space-y-2">
              {config.businessHours.map((schedule, index) => (
                <div key={schedule.day} className="flex items-center gap-3 p-2 rounded-lg bg-black/10">
                  <span className="text-sm text-white w-24">{schedule.day}</span>
                  <button
                    onClick={() => {
                      const updated = [...config.businessHours]
                      updated[index] = { ...updated[index], isOpen: !updated[index].isOpen }
                      setConfig((prev) => ({ ...prev, businessHours: updated }))
                    }}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      schedule.isOpen
                        ? 'bg-cbd-green/20 text-cbd-green'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {schedule.isOpen ? 'Abierto' : 'Cerrado'}
                  </button>
                  {schedule.isOpen && (
                    <>
                      <Input
                        type="time"
                        value={schedule.open}
                        onChange={(e) => {
                          const updated = [...config.businessHours]
                          updated[index] = { ...updated[index], open: e.target.value }
                          setConfig((prev) => ({ ...prev, businessHours: updated }))
                        }}
                        className="w-28 bg-black/20 border-white/10 text-xs"
                      />
                      <span className="text-muted-foreground text-xs">a</span>
                      <Input
                        type="time"
                        value={schedule.close}
                        onChange={(e) => {
                          const updated = [...config.businessHours]
                          updated[index] = { ...updated[index], close: e.target.value }
                          setConfig((prev) => ({ ...prev, businessHours: updated }))
                        }}
                        className="w-28 bg-black/20 border-white/10 text-xs"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
          Guardar Cambios
        </Button>
      </div>
    </motion.div>
  )
}
