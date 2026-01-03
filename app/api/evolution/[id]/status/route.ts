import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getConnectionState } from '@/lib/evolution'

// GET - Verificar status da conexão
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

    // Obter status da Evolution API
    const connectionState = await getConnectionState(instance.instanceId)

    // Mapear status
    let status = 'disconnected'
    if (connectionState.state === 'open') {
      status = 'connected'
    } else if (connectionState.state === 'connecting') {
      status = 'connecting'
    }

    // Atualizar no banco
    await prisma.evolutionInstance.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json({
      status,
      state: connectionState.state,
    })
  } catch (error: any) {
    console.error('Erro ao verificar status:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao verificar status' },
      { status: 500 }
    )
  }
}
