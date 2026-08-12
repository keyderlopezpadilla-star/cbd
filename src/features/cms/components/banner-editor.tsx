'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Link2, Monitor } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MOCK_BANNERS, BANNER_POSITIONS, type Banner } from '@/lib/mock-data/cms'

function BannerForm({
  banner,
  onClose,
}: {
  banner?: Banner
  onClose: () => void
}) {
  const [title, setTitle] = useState(banner?.title || '')
  const [subtitle, setSubtitle] = useState(banner?.subtitle || '')
  const [imageUrl, setImageUrl] = useState(banner?.imageUrl || '')
  const [ctaText, setCtaText] = useState(banner?.ctaText || '')
  const [ctaLink, setCtaLink] = useState(banner?.ctaLink || '')
  const [position, setPosition] = useState(banner?.position || 'hero')
  const [isActive, setIsActive] = useState(banner?.isActive ?? true)
  const [startDate, setStartDate] = useState(banner?.startDate || '')
  const [endDate, setEndDate] = useState(banner?.endDate || '')

  return (
    <Card className="glass border border-white/10">
      <CardHeader>
        <CardTitle className="text-lg">
          {banner ? 'Editar Banner' : 'Nuevo Banner'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Titulo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titulo del banner"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subtitulo</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitulo del banner"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">URL de Imagen</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/banners/ejemplo.jpg"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Texto CTA</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Ej: Comprar Ahora"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Enlace CTA</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder="/productos/nueva-coleccion"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Posicion</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as Banner['position'])}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            >
              {BANNER_POSITIONS.map((pos) => (
                <option key={pos} value={pos} className="bg-gray-900">
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Fecha Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Fecha Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cbd-green/40 focus:ring-1 focus:ring-cbd-green/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-cbd-green focus:ring-cbd-green/20"
            />
            <span className="text-sm text-foreground">Banner activo</span>
          </label>
        </div>

        {/* Preview */}
        {title && (
          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <p className="text-xs text-muted-foreground mb-2">Vista previa:</p>
            <div className="bg-gradient-to-r from-cbd-green/20 to-transparent rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
              {ctaText && (
                <span className="inline-block mt-3 px-4 py-1.5 bg-cbd-green text-black text-xs font-medium rounded-md">
                  {ctaText}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-cbd-green text-black rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
          >
            {banner ? 'Guardar Cambios' : 'Crear Banner'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
          >
            Cancelar
          </motion.button>
        </div>
      </CardContent>
    </Card>
  )
}

export function BannerEditor() {
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | undefined>(undefined)

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingBanner(undefined)
    setShowForm(true)
  }

  if (showForm) {
    return (
      <BannerForm
        banner={editingBanner}
        onClose={() => { setShowForm(false); setEditingBanner(undefined) }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {MOCK_BANNERS.length} banners | {MOCK_BANNERS.filter((b) => b.isActive).length} activos
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreate}
          className="flex items-center gap-2 bg-cbd-green text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-cbd-green/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo Banner
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MOCK_BANNERS.map((banner, index) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border border-white/10 hover:border-cbd-green/20 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-cbd-green/10 flex items-center justify-center">
                      <Image className="h-5 w-5 text-cbd-green" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{banner.title}</h3>
                      <p className="text-xs text-muted-foreground">{banner.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {banner.isActive ? (
                      <Eye className="h-4 w-4 text-cbd-green" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    <Monitor className="h-3 w-3" />
                    {banner.position}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    {banner.ctaText}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {banner.startDate}{banner.endDate ? ` - ${banner.endDate}` : ' - Sin fin'}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(banner)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                  >
                    <Edit2 className="h-3 w-3" />
                    Editar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Eliminar
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
