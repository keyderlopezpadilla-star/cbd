'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Globe, Twitter, Linkedin, ExternalLink } from 'lucide-react'

interface OGData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
}

interface OpenGraphPreviewProps {
  initialData?: Partial<OGData>
  className?: string
}

type Platform = 'facebook' | 'twitter' | 'linkedin'

export function OpenGraphPreview({ initialData, className }: OpenGraphPreviewProps) {
  const [data, setData] = useState<OGData>({
    title: initialData?.title || 'CBD SaaS Platform - Gestion Integral de Tiendas CBD',
    description:
      initialData?.description ||
      'Plataforma SaaS premium para la gestion integral de tiendas CBD en Espana.',
    image: initialData?.image || 'https://cbdsaas.com/images/og-default.jpg',
    url: initialData?.url || 'https://cbdsaas.com',
    siteName: initialData?.siteName || 'CBD SaaS Platform',
  })

  const [activePlatform, setActivePlatform] = useState<Platform>('facebook')

  const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
    { id: 'facebook', label: 'Facebook', icon: <Globe className="h-4 w-4" /> },
    { id: 'twitter', label: 'Twitter', icon: <Twitter className="h-4 w-4" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  ]

  return (
    <Card className={cn('border-white/10 bg-cbd-dark', className)}>
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-cbd-green" />
          Vista Previa Open Graph
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-cbd-gray-light mb-1 block">Titulo</label>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="bg-cbd-black border-white/10 text-white"
              placeholder="Titulo de la pagina"
            />
          </div>
          <div>
            <label className="text-sm text-cbd-gray-light mb-1 block">Descripcion</label>
            <Input
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="bg-cbd-black border-white/10 text-white"
              placeholder="Descripcion de la pagina"
            />
          </div>
          <div>
            <label className="text-sm text-cbd-gray-light mb-1 block">URL de Imagen</label>
            <Input
              value={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
              className="bg-cbd-black border-white/10 text-white"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="text-sm text-cbd-gray-light mb-1 block">URL</label>
            <Input
              value={data.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              className="bg-cbd-black border-white/10 text-white"
              placeholder="https://cbdsaas.com/..."
            />
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors min-h-[44px]',
                activePlatform === platform.id
                  ? 'bg-cbd-green/20 text-cbd-green border border-cbd-green/30'
                  : 'text-cbd-gray-light hover:text-white hover:bg-white/5'
              )}
            >
              {platform.icon}
              {platform.label}
            </button>
          ))}
        </div>

        {/* Preview Cards */}
        <div className="mt-4">
          {activePlatform === 'facebook' && (
            <FacebookPreview data={data} />
          )}
          {activePlatform === 'twitter' && (
            <TwitterPreview data={data} />
          )}
          {activePlatform === 'linkedin' && (
            <LinkedInPreview data={data} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function FacebookPreview({ data }: { data: OGData }) {
  return (
    <div className="max-w-[500px] border border-gray-300 rounded-sm overflow-hidden bg-white">
      <div className="w-full h-[260px] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">{data.image ? '1200x630 imagen' : 'Sin imagen'}</span>
      </div>
      <div className="p-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {new URL(data.url).hostname}
        </p>
        <h3 className="text-base font-semibold text-gray-900 mt-1 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {data.description}
        </p>
      </div>
    </div>
  )
}

function TwitterPreview({ data }: { data: OGData }) {
  return (
    <div className="max-w-[500px] border border-gray-300 rounded-xl overflow-hidden bg-white">
      <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">{data.image ? '1200x628 imagen' : 'Sin imagen'}</span>
      </div>
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {data.description}
        </p>
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {new URL(data.url).hostname}
        </p>
      </div>
    </div>
  )
}

function LinkedInPreview({ data }: { data: OGData }) {
  return (
    <div className="max-w-[500px] border border-gray-300 rounded-sm overflow-hidden bg-white">
      <div className="w-full h-[260px] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">{data.image ? '1200x627 imagen' : 'Sin imagen'}</span>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {new URL(data.url).hostname}
        </p>
      </div>
    </div>
  )
}
