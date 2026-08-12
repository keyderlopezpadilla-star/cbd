'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Clock,
  CheckCircle,
  Archive,
  Edit3,
  Eye,
  Plus,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PRIVACY_POLICY_VERSIONS, PrivacyPolicyVersion, PolicyStatus } from '@/lib/mock-data/gdpr'

const statusConfig: Record<PolicyStatus, { label: string; icon: React.ElementType; color: string }> = {
  draft: { label: 'Borrador', icon: Edit3, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  published: { label: 'Publicada', icon: CheckCircle, color: 'text-cbd-green bg-cbd-green/10 border-cbd-green/30' },
  archived: { label: 'Archivada', icon: Archive, color: 'text-muted-foreground bg-white/5 border-white/20' },
}

export function PrivacyPolicyEditor() {
  const [policies] = useState<PrivacyPolicyVersion[]>(PRIVACY_POLICY_VERSIONS)
  const [selectedPolicy, setSelectedPolicy] = useState<PrivacyPolicyVersion | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [editTitle, setEditTitle] = useState('')

  const currentPolicy = policies.find((p) => p.status === 'published')
  const draftPolicy = policies.find((p) => p.status === 'draft')

  const handleEdit = (policy: PrivacyPolicyVersion) => {
    setSelectedPolicy(policy)
    setEditContent(policy.content)
    setEditTitle(policy.title)
    setIsEditing(true)
  }

  const handleView = (policy: PrivacyPolicyVersion) => {
    setSelectedPolicy(policy)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Current Policy Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/10">
                <CheckCircle className="h-5 w-5 text-cbd-green" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Politica Activa</p>
                <p className="text-xs text-muted-foreground">
                  {currentPolicy ? `v${currentPolicy.version} - Efectiva desde ${currentPolicy.effectiveDate}` : 'Sin politica publicada'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
                <Edit3 className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Borrador</p>
                <p className="text-xs text-muted-foreground">
                  {draftPolicy ? `v${draftPolicy.version} - Fecha prevista: ${draftPolicy.effectiveDate}` : 'Sin borrador'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Version History */}
        <Card className="glass border border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-cbd-green" />
              Historial de Versiones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {policies.map((policy, index) => {
              const status = statusConfig[policy.status]
              const StatusIcon = status.icon
              return (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'rounded-lg border p-3 cursor-pointer transition-colors',
                    selectedPolicy?.id === policy.id
                      ? 'border-cbd-green/50 bg-cbd-green/5'
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  )}
                  onClick={() => handleView(policy)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">v{policy.version}</span>
                    <Badge variant="outline" className={cn('text-[10px]', status.color)}>
                      <StatusIcon className="h-2.5 w-2.5 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{policy.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {policy.effectiveDate}
                  </p>
                  <div className="flex gap-1 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleView(policy)
                      }}
                      className="h-7 text-xs hover:bg-white/10"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    {policy.status !== 'archived' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(policy)
                        }}
                        className="h-7 text-xs hover:bg-cbd-green/10 text-cbd-green"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>
                </motion.div>
              )
            })}

            <Separator className="bg-white/10" />

            <Button variant="outline" className="w-full border-white/20 text-foreground hover:bg-white/5">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Version
            </Button>
          </CardContent>
        </Card>

        {/* Editor / Viewer */}
        <Card className="glass border border-white/10 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-cbd-green" />
                {isEditing ? 'Editor' : 'Vista Previa'}
              </CardTitle>
              {selectedPolicy && !isEditing && selectedPolicy.status !== 'archived' && (
                <Button
                  size="sm"
                  onClick={() => handleEdit(selectedPolicy)}
                  className="bg-cbd-green text-black hover:bg-cbd-green/90"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedPolicy ? (
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Titulo</Label>
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Contenido (Markdown)</Label>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-[400px] rounded-lg bg-white/5 border border-white/10 p-4 text-sm text-foreground font-mono resize-none focus:outline-none focus:ring-2 focus:ring-cbd-green/50"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button className="bg-cbd-green text-black hover:bg-cbd-green/90">
                        Guardar Borrador
                      </Button>
                      <Button variant="outline" className="border-cbd-green/50 text-cbd-green hover:bg-cbd-green/10">
                        Publicar
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className={cn('text-xs', statusConfig[selectedPolicy.status].color)}>
                        {statusConfig[selectedPolicy.status].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Creada por: {selectedPolicy.createdBy}
                      </span>
                    </div>
                    {selectedPolicy.changes.length > 0 && (
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3 mb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Cambios en esta version:</p>
                        <ul className="space-y-1">
                          {selectedPolicy.changes.map((change, i) => (
                            <li key={i} className="text-xs text-foreground flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-cbd-green" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="prose prose-invert prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed bg-transparent border-0 p-0">
                        {selectedPolicy.content}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <FileText className="h-12 w-12 mb-3 opacity-50" />
                <p className="text-sm">Selecciona una version del historial para ver o editar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
