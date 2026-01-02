import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Listar leads do usuário
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const leads = await prisma.lead.findMany({
      where: { userId: session.user.id },
      include: {
        chat: {
          include: {
            instance: true,
          },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(leads)
  } catch (error: any) {
    console.error('Erro ao listar leads:', error)
    return NextResponse.json({ error: 'Erro ao listar leads' }, { status: 500 })
  }
}

// POST - Criar novo lead
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { chatId, name, phone, email, status, tags, notes } = body

    if (!chatId || !name || !phone) {
      return NextResponse.json(
        { error: 'ChatId, nome e telefone são obrigatórios' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        userId: session.user.id,
        chatId,
        name,
        phone,
        email,
        status: status || 'NEW',
        tags: tags || [],
        notes,
      },
      include: {
        chat: {
          include: {
            instance: true,
          },
        },
      },
    })

    // Criar atividade
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: 'lead_created',
        description: `Lead ${name} foi criado`,
      },
    })

    return NextResponse.json(lead)
  } catch (error: any) {
    console.error('Erro ao criar lead:', error)
    return NextResponse.json({ error: 'Erro ao criar lead' }, { status: 500 })
  }
}
