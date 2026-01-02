'use client'

import { useEffect, useState } from 'react'
import { X, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface QRCodeModalProps {
  instanceId: string
  instanceName: string
  open: boolean
  onClose: () => void
}

export function QRCodeModal({ instanceId, instanceName, open, onClose }: QRCodeModalProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchQRCode = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/evolution/${instanceId}/qr`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao obter QR Code')
      }

      setQrCode(data.base64)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao obter QR Code')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchQRCode()
    } else {
      setQrCode(null)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="glass w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Conectar WhatsApp</CardTitle>
              <CardDescription>{instanceName}</CardDescription>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex aspect-square items-center justify-center rounded-lg bg-white p-4">
            {loading ? (
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            ) : qrCode ? (
              <img
                src={qrCode}
                alt="QR Code"
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                QR Code indisponível
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold">Como conectar:</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Abra o WhatsApp no seu celular</li>
              <li>Toque em Mais opções → Aparelhos conectados</li>
              <li>Toque em Conectar um aparelho</li>
              <li>Aponte seu celular para esta tela para escanear o QR Code</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={fetchQRCode}
              disabled={loading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar QR
            </Button>
            <Button onClick={onClose} className="flex-1">
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
