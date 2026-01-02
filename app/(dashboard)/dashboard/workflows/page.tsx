'use client'

import { useState } from 'react'
import { getServerSession } from 'next-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Workflow, Crown, Lock } from 'lucide-react'
import Link from 'next/link'

export default function WorkflowsPage() {
  const [showIframe, setShowIframe] = useState(false)

  // Simulando verificação de premium (em produção virá do session)
  const isPremium = false // TODO: Pegar do session

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Workflows</h2>
          <p className="text-muted-foreground">
            Automações avançadas com N8N
          </p>
        </div>

        <Card className="glass border-yellow-500/50">
          <CardContent className="pt-6 text-center">
            <div className="mb-4 rounded-full bg-yellow-500/20 p-4 inline-block">
              <Crown className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Recurso Premium
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Acesse o editor de workflows N8N, crie automações ilimitadas e integre com centenas de serviços.
            </p>

            <div className="space-y-4 max-w-md mx-auto mb-6">
              <div className="flex items-start gap-3 text-left">
                <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Editor Visual de Workflows</p>
                  <p className="text-sm text-muted-foreground">Interface drag-and-drop intuitiva</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">300+ Integrações</p>
                  <p className="text-sm text-muted-foreground">Conecte com qualquer ferramenta</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Automações Ilimitadas</p>
                  <p className="text-sm text-muted-foreground">Sem limites de workflows ou execuções</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Sincronização com WayIA</p>
                  <p className="text-sm text-muted-foreground">Integração direta com Evolution API e CRM</p>
                </div>
              </div>
            </div>

            <Link href="/dashboard/premium">
              <Button size="lg" className="gap-2">
                <Crown className="h-5 w-5" />
                Assinar Premium - R$ 89,90/mês
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se for premium, mostra o N8N
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Workflows N8N</h2>
          <p className="text-muted-foreground">
            Editor de automações avançadas
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open('https://n8n.wayiaflow.com.br', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Abrir em Nova Aba
          </Button>
          <Button onClick={() => setShowIframe(!showIframe)}>
            {showIframe ? 'Ocultar' : 'Mostrar'} Editor
          </Button>
        </div>
      </div>

      {showIframe ? (
        <div className="flex-1 rounded-lg overflow-hidden border border-white/10">
          <iframe
            src="https://n8n.wayiaflow.com.br"
            className="w-full h-full min-h-[800px]"
            title="N8N Workflow Editor"
          />
        </div>
      ) : (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Bem-vindo ao Editor N8N</CardTitle>
            <CardDescription>
              Crie automações poderosas para seu negócio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Clique em "Mostrar Editor" para começar a criar seus workflows.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <Workflow className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Automações de WhatsApp</h4>
                <p className="text-sm text-muted-foreground">
                  Responda mensagens automaticamente e qualifique leads
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <Workflow className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Integração com CRM</h4>
                <p className="text-sm text-muted-foreground">
                  Sincronize leads e atividades automaticamente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
