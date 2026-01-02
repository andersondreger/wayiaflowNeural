# 🚀 WayIA - Escalabilidade Imparável via Rede Neural

SaaS completo de automação e gestão de atendimento via WhatsApp, CRM integrado e workflows inteligentes.

## 📋 Sobre o Projeto

WayIA é uma plataforma profissional que permite:
- ✅ Gerenciamento completo de instâncias WhatsApp (Evolution API)
- ✅ Sistema Kanban de atendimento e gestão de leads
- ✅ CRM avançado com pipeline de vendas
- ✅ Automações via N8N integrado
- ✅ IA Neural Engine v3.0 (Premium)
- ✅ Pagamentos recorrentes via Stripe

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui
- **State**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animações**: Framer Motion

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: NextAuth.js v5
- **OAuth**: Google + GitHub

### Integrações
- **WhatsApp**: Evolution API
- **Workflows**: N8N
- **Pagamentos**: Stripe
- **Deploy**: Cloudflare + GitHub

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd wayia
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais.

4. Configure o banco de dados:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
wayia/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── (auth)/            # Páginas de autenticação
│   ├── (dashboard)/       # Páginas do dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   ├── dashboard/        # Componentes do dashboard
│   ├── auth/             # Componentes de auth
│   ├── evolution/        # Evolution API components
│   └── kanban/           # Sistema Kanban
├── lib/                  # Utilitários e configurações
│   ├── prisma/          # Prisma client
│   ├── auth/            # NextAuth config
│   ├── utils/           # Funções utilitárias
│   └── hooks/           # React hooks customizados
├── prisma/              # Schema do banco de dados
│   └── schema.prisma
├── types/               # TypeScript types
└── public/              # Arquivos estáticos
```

## 🎨 Planos e Preços

### Plano Gratuito
- ✅ Evolution API Manager
- ✅ Sistema de Atendimento Kanban
- ✅ Gestão básica de leads

### Plano Premium (R$ 89,90/mês)
- ✅ Tudo do plano gratuito
- ✅ CRM Avançado com automações
- ✅ N8N Mirror integrado
- ✅ WayIA Neural Engine v3.0
- ✅ Suporte prioritário

## 🔐 Autenticação

O projeto usa NextAuth.js v5 com suporte a:
- Google OAuth
- GitHub OAuth
- Sessões JWT

## 🗄️ Banco de Dados

Schema Prisma com models:
- User (usuários)
- Account (contas OAuth)
- Session (sessões)
- Subscription (assinaturas Stripe)
- EvolutionInstance (instâncias WhatsApp)
- Chat (conversas)
- Message (mensagens)
- Lead (leads/clientes)
- Activity (atividades do CRM)

## 📝 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linter ESLint
```

## 🌐 Deploy

### Cloudflare Pages
1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático em cada push

### Variáveis de Ambiente Necessárias
- `DATABASE_URL` - String de conexão PostgreSQL
- `NEXTAUTH_URL` - URL do app
- `NEXTAUTH_SECRET` - Secret para NextAuth
- `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`
- `EVOLUTION_API_URL` e `EVOLUTION_API_KEY`
- `N8N_URL` e `N8N_API_KEY`
- `STRIPE_SECRET_KEY` e outros do Stripe

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

## 📞 Suporte

Para suporte, entre em contato: wayia.com.br

---

**Desenvolvido com ❤️ usando Next.js 14 + TypeScript**
