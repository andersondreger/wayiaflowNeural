'use client'

import { useState } from 'react'
import { Crown, Check, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PremiumPage() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar checkout')
      }

      // Redirecionar para o checkout do Stripe
      window.location.href = data.url
    } catch (error: any) {
      toast.error(error.message || 'Erro ao processar pagamento')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-neural p-4">
          <Crown className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">
          Desbloqueie Todo o Potencial
        </h1>
        <p className="text-xl text-muted-foreground">
          Upgrade para Premium e escale seu negócio
        </p>
      </div>

      {/* Plano Premium */}
      <Card className="glass border-primary/50">
        <CardHeader className="text-center pb-8">
          <div className="mb-2 text-primary font-semibold">PLANO PREMIUM</div>
          <CardTitle className="text-5xl font-bold">
            R$ 89,90
            <span className="text-lg text-muted-foreground font-normal">/mês</span>
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Cancele quando quiser. Sem taxas ocultas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {premiumFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleCheckout}
            disabled={loading}
            size="lg"
            className="w-full text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Crown className="mr-2 h-5 w-5" />
                Assinar Agora
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Pagamento seguro processado pelo Stripe. Seus dados estão protegidos.
          </p>
        </CardContent>
      </Card>

      {/* Comparação */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Plano Gratuito</CardTitle>
            <CardDescription>Recursos básicos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {freeFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <CardTitle>Plano Premium</CardTitle>
            </div>
            <CardDescription>Recursos avançados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {freeFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            {premiumOnlyFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Crown className="h-4 w-4 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const premiumFeatures = [
  {
    title: 'CRM Avançado com Automações',
    description: 'Pipeline de vendas completo, relatórios detalhados e automações de follow-up',
  },
  {
    title: 'N8N Mirror - Workflows Ilimitados',
    description: 'Editor visual integrado com 300+ integrações para automatizar qualquer processo',
  },
  {
    title: 'WayIA Neural Engine v3.0',
    description: 'IA avançada para atendimento automático e qualificação de leads',
  },
  {
    title: 'Suporte Prioritário',
    description: 'Atendimento preferencial e tempo de resposta mais rápido',
  },
  {
    title: 'Integrações Ilimitadas',
    description: 'Conecte quantas instâncias e ferramentas quiser sem limites',
  },
  {
    title: 'Analytics Avançado',
    description: 'Relatórios detalhados, métricas de conversão e insights de performance',
  },
]

const freeFeatures = [
  'Evolution API Manager',
  'Sistema Kanban de Atendimento',
  'Gestão Básica de Leads',
  'Conexão com WhatsApp',
]

const premiumOnlyFeatures = [
  'CRM Avançado',
  'N8N Workflows',
  'IA Neural Engine',
  'Suporte Prioritário',
  'Analytics Avançado',
]
