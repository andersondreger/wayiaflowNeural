import Link from 'next/link'
import { ArrowRight, Bot, Zap, Shield, LineChart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-neural">WayIA</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm bg-neural text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Começar Grátis
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Escalabilidade <span className="text-neural">Imparável</span>
            <br />
            via Rede Neural
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Automatize seu atendimento no WhatsApp, gerencie leads e escale seu negócio
            com ferramentas de IA e automação profissional.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-neural text-white rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Começar Agora <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 glass glass-hover text-white rounded-lg font-semibold"
            >
              Ver Recursos
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="glass glass-hover p-6 rounded-xl">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass glass-hover p-12 rounded-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para escalar seu atendimento?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comece gratuitamente. Sem cartão de crédito.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex px-8 py-4 bg-neural text-white rounded-lg font-semibold items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Criar Conta Grátis <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 WayIA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: Bot,
    title: 'Evolution API',
    description: 'Gerencie instâncias do WhatsApp com facilidade e total controle.',
  },
  {
    icon: Zap,
    title: 'Automação Inteligente',
    description: 'Workflows personalizados com N8N e IA avançada.',
  },
  {
    icon: LineChart,
    title: 'CRM Completo',
    description: 'Pipeline de vendas, relatórios e gestão de leads profissional.',
  },
  {
    icon: Shield,
    title: 'Seguro e Confiável',
    description: 'Proteção de dados com criptografia e compliance LGPD.',
  },
]
