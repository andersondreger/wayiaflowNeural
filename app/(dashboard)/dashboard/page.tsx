import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Users, MessageSquare, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Buscar estatísticas do usuário
  const [instancesCount, leadsCount, chatsCount] = await Promise.all([
    prisma.evolutionInstance.count({
      where: { userId: session.user.id },
    }),
    prisma.lead.count({
      where: { userId: session.user.id },
    }),
    prisma.chat.count({
      where: {
        instance: {
          userId: session.user.id,
        },
      },
    }),
  ])

  const stats = [
    {
      title: 'Instâncias Ativas',
      value: instancesCount,
      icon: Bot,
      description: 'WhatsApp conectados',
      color: 'text-blue-500',
    },
    {
      title: 'Total de Leads',
      value: leadsCount,
      icon: Users,
      description: 'Leads cadastrados',
      color: 'text-green-500',
    },
    {
      title: 'Conversas',
      value: chatsCount,
      icon: MessageSquare,
      description: 'Conversas ativas',
      color: 'text-purple-500',
    },
    {
      title: 'Taxa de Conversão',
      value: '0%',
      icon: TrendingUp,
      description: 'Últimos 30 dias',
      color: 'text-yellow-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Visão Geral</h2>
        <p className="text-muted-foreground">
          Acompanhe suas métricas e performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <QuickActionCard
            title="Criar Instância"
            description="Conecte um novo WhatsApp"
            href="/dashboard/evolution"
          />
          <QuickActionCard
            title="Ver Atendimentos"
            description="Gerencie suas conversas"
            href="/dashboard/atendimento"
          />
          <QuickActionCard
            title="Adicionar Lead"
            description="Cadastre um novo lead"
            href="/dashboard/leads"
          />
        </CardContent>
      </Card>

      {/* Empty State para usuários novos */}
      {instancesCount === 0 && (
        <Card className="glass border-primary/50">
          <CardContent className="pt-6 text-center">
            <Bot className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Bem-vindo ao WayIA! 🎉
            </h3>
            <p className="text-muted-foreground mb-4">
              Comece criando sua primeira instância do WhatsApp
            </p>
            <a
              href="/dashboard/evolution"
              className="inline-flex items-center justify-center rounded-lg bg-neural px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Criar Primeira Instância
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function QuickActionCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-primary/50"
    >
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  )
}
