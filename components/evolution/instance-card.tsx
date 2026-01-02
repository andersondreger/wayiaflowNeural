'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, Trash2, QrCode, RefreshCw } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { QRCodeModal } from './qr-code-modal'
import { toast } from 'sonner'

interface InstanceCardProps {
  instance: {
    id: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    status: string
    createdAt: Date
  }
  onDelete: () => void
  onRefresh: () => void
}

export function InstanceCard({ instance, onDelete, onRefresh }: InstanceCardProps) {
  const [showQR, setShowQR] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta instância?')) {
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/evolution/${instance.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Erro ao deletar')

      toast.success('Instância deletada com sucesso')
      onDelete()
    } catch (error) {
      toast.error('Erro ao deletar instância')
    } finally {
      setIsDeleting(false)
    }
  }

  const statusColors = {
    connected: 'bg-green-500',
    disconnected: 'bg-red-500',
    connecting: 'bg-yellow-500',
  }

  const statusLabels = {
    connected: 'Conectado',
    disconnected: 'Desconectado',
    connecting: 'Conectando...',
  }

  return (
    <>
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{instance.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {instance.phoneNumber || 'Não conectado'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                statusColors[instance.status as keyof typeof statusColors] || statusColors.disconnected
              }`}
            />
            <span className="text-sm font-medium">
              {statusLabels[instance.status as keyof typeof statusLabels] || 'Desconectado'}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2 text-sm">
            <p className="text-muted-foreground">
              Criado em: {formatDate(instance.createdAt)}
            </p>
            <p className="text-muted-foreground truncate">
              ID: {instance.instanceId}
            </p>
          </div>

          <div className="flex gap-2">
            {instance.status !== 'connected' && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setShowQR(true)}
              >
                <QrCode className="mr-2 h-4 w-4" />
                Conectar
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <QRCodeModal
        instanceId={instance.id}
        instanceName={instance.name}
        open={showQR}
        onClose={() => setShowQR(false)}
      />
    </>
  )
}
