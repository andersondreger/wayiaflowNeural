import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getQRCode } from '@/lib/evolution'

// GET - Obter QR Code
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const instance = await prisma.evolutionInstance.findUnique({
      where: { id: params.id },
    })

    if (!instance) {
      return NextResponse.json({ error: 'Instância não encontrada' }, { status: 404 })
    }

    if (instance.userId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    // Obter QR Code da Evolution API
    const qrCode = await getQRCode(instance.instanceId)

    // Atualizar no banco
    await prisma.evolutionInstance.update({
      where: { id: params.id },
      data: { qrCode: qrCode.base64 },
    })

    return NextResponse.json(qrCode)
  } catch (error: any) {
    console.error('Erro ao obter QR Code:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao obter QR Code' },
      { status: 500 }
    )
  }
}
