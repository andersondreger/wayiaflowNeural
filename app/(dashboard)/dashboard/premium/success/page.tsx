import Link from 'next/link'
import { CheckCircle, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <Card className="glass border-green-500/50 max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-500/20 p-4 mx-auto">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl">
            Bem-vindo ao Premium! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Sua assinatura foi ativada com sucesso. Agora você tem acesso a todos os recursos premium do WayIA!
          </p>

          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-sm">
              <Crown className="h-4 w-4 text-primary" />
              <span>CRM Avançado desbloqueado</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Crown className="h-4 w-4 text-primary" />
              <span>N8N Workflows disponível</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Crown className="h-4 w-4 text-primary" />
              <span>WayIA Neural Engine ativado</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/dashboard" className="block">
              <Button className="w-full">
                Ir para o Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/workflows" className="block">
              <Button variant="outline" className="w-full">
                Explorar Workflows
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Você receberá um e-mail de confirmação em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
