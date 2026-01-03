import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { deleteInstance as deleteEvolutionInstance } from '@/lib/evolution'

// DELETE - Deletar instância
export async function DELETE(
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

    // Deletar da Evolution API
    try {
      await deleteEvolutionInstance(instance.instanceId)
    } catch (error) {
      console.error('Erro ao deletar da Evolution API:', error)
      // Continua mesmo se falhar na API
    }

    // Deletar do banco
    await prisma.evolutionInstance.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Erro ao deletar instância:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar instância' },
      { status: 500 }
    )
  }
}
