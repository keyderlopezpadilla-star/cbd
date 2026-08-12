'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, DollarSign, Calendar, Hash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { CURRENCY_OPTIONS, LANGUAGE_OPTIONS } from '@/lib/mock-data/settings'

const dateFormats = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/01/2024)' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (01/31/2024)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-01-31)' },
  { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (31.01.2024)' },
]

const numberFormats = [
  { value: 'dot-comma', label: '1.234,56 (punto miles, coma decimal)' },
  { value: 'comma-dot', label: '1,234.56 (coma miles, punto decimal)' },
  { value: 'space-comma', label: '1 234,56 (espacio miles, coma decimal)' },
]

export function CurrencyLanguage() {
  const [currency, setCurrency] = useState('EUR')
  const [language, setLanguage] = useState('es')
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY')
  const [numberFormat, setNumberFormat] = useState('dot-comma')

  const selectedCurrency = CURRENCY_OPTIONS.find((c) => c.code === currency)
  const selectedLanguage = LANGUAGE_OPTIONS.find((l) => l.code === language)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Currency */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-cbd-green" />
            Moneda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Moneda Principal</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="bg-black/20 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.code} value={opt.code}>
                    {opt.symbol} {opt.name} ({opt.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 rounded-lg bg-black/20 border border-white/5">
            <p className="text-sm text-muted-foreground mb-2">Vista previa de precios:</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 rounded bg-black/20">
                <p className="text-xs text-muted-foreground">Producto</p>
                <p className="text-lg font-bold text-white">
                  {selectedCurrency?.symbol}29,99
                </p>
              </div>
              <div className="text-center p-2 rounded bg-black/20">
                <p className="text-xs text-muted-foreground">Pedido</p>
                <p className="text-lg font-bold text-white">
                  {selectedCurrency?.symbol}156,80
                </p>
              </div>
              <div className="text-center p-2 rounded bg-black/20">
                <p className="text-xs text-muted-foreground">Mensual</p>
                <p className="text-lg font-bold text-white">
                  {selectedCurrency?.symbol}4.230,50
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-cbd-green" />
            Idioma
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Idioma de la Interfaz</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-lg border transition-colors text-left',
                    language === lang.code
                      ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
                      : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30'
                  )}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator className="border-white/10" />

          <div className="p-3 rounded-lg bg-cbd-green/5 border border-cbd-green/20">
            <p className="text-sm text-cbd-green">
              Idioma seleccionado: {selectedLanguage?.flag} {selectedLanguage?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Los cambios de idioma se aplicaran a toda la interfaz de administracion.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Format Preferences */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Hash className="h-5 w-5 text-cbd-green" />
            Formato de Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Formato de Fecha
            </Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger className="bg-black/20 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFormats.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Hash className="h-3 w-3" />
              Formato Numerico
            </Label>
            <Select value={numberFormat} onValueChange={setNumberFormat}>
              <SelectTrigger className="bg-black/20 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {numberFormats.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
