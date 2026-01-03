import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PATCH - Atualizar lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 })
    }

    if (lead.userId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const body = await request.json()
    const { status, name, phone, email, tags, notes, value } = body

    // Criar atividade se o status mudou
    if (status && status !== lead.status) {
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          type: 'status_changed',
          description: `Status alterado de ${lead.status} para ${status}`,
        },
      })
    }

    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        status,
        name,
        phone,
        email,
        tags,
        notes,
        value,
      },
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
    })

    return NextResponse.json(updatedLead)
  } catch (error: any) {
    console.error('Erro ao atualizar lead:', error)
    return NextResponse.json({ error: 'Erro ao atualizar lead' }, { status: 500 })
  }
}

// DELETE - Deletar lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 })
    }

    if (lead.userId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    await prisma.lead.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro ao deletar lead:', error)
    return NextResponse.json({ error: 'Erro ao deletar lead' }, { status: 500 })
  }
}
