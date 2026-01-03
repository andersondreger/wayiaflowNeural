import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createInstance } from '@/lib/evolution'

// GET - Listar instâncias do usuário
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const instances = await prisma.evolutionInstance.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(instances)
  } catch (error: any) {
    console.error('Erro ao listar instâncias:', error)
    return NextResponse.json(
      { error: 'Erro ao listar instâncias' },
      { status: 500 }
    )
  }
}

// POST - Criar nova instância
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Nome da instância é obrigatório' },
        { status: 400 }
      )
    }

    // Gerar um instanceId único
    const instanceId = `${session.user.id}_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`

    // Criar instância na Evolution API
    const evolutionResponse = await createInstance({
      instanceName: instanceId,
      qrcode: true,
    })

    // Salvar no banco de dados
    const instance = await prisma.evolutionInstance.create({
      data: {
        name,
        instanceId,
        userId: session.user.id,
        qrCode: evolutionResponse.qrcode?.base64,
        status: 'disconnected',
      },
    })

    return NextResponse.json({
      ...instance,
      qrCodeData: evolutionResponse.qrcode,
    })
  } catch (error: any) {
    console.error('Erro ao criar instância:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao criar instância' },
      { status: 500 }
    )
  }
}
