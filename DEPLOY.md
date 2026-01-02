# 🚀 Guia de Deploy - WayIA

## Opção 1: Cloudflare Pages (Recomendado)

### Pré-requisitos:
- Conta GitHub
- Conta Cloudflare (gratuito)
- Banco de dados online (Supabase/Railway/Neon)

### Passo a Passo:

#### 1. Preparar o Repositório Git

```bash
cd /c/Users/Anderson/dyad-apps/wayia

# Inicializar Git
git init
git add .
git commit -m "feat: initial commit - WayIA SaaS complete"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU-USUARIO/wayia.git
git branch -M main
git push -u origin main
```

#### 2. Configurar Build

Crie `next.config.js` se ainda não existe:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  output: 'standalone', // Para Cloudflare
}

module.exports = nextConfig
```

#### 3. Deploy no Cloudflare Pages

1. Acesse: https://dash.cloudflare.com/
2. Vá em **Pages** → **Create a project**
3. Conecte seu repositório GitHub
4. Configure:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node version**: 18

#### 4. Configurar Variáveis de Ambiente

Em **Settings** → **Environment Variables**, adicione:

```env
DATABASE_URL=sua-connection-string
NEXTAUTH_URL=https://seu-dominio.pages.dev
NEXTAUTH_SECRET=seu-secret
GOOGLE_CLIENT_ID=seu-google-id
GOOGLE_CLIENT_SECRET=seu-google-secret
GITHUB_CLIENT_ID=seu-github-id
GITHUB_CLIENT_SECRET=seu-github-secret
EVOLUTION_API_URL=https://evo2.wayiaflow.com.br
EVOLUTION_API_KEY=d86920ba398e31464c46401214779885
N8N_URL=https://n8n.wayiaflow.com.br
N8N_API_KEY=sua-n8n-key
STRIPE_SECRET_KEY=sk_live_seu-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_live_seu-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_seu-webhook-secret
STRIPE_PRICE_ID=price_seu-price-id
NEXT_PUBLIC_APP_URL=https://seu-dominio.pages.dev
PREMIUM_PRICE_MONTHLY=89.90
```

#### 5. Atualizar OAuth Redirect URIs

**Google Console:**
- Authorized redirect URIs: `https://seu-dominio.pages.dev/api/auth/callback/google`

**GitHub OAuth:**
- Authorization callback URL: `https://seu-dominio.pages.dev/api/auth/callback/github`

#### 6. Atualizar Stripe Webhook

Em **Stripe Dashboard** → **Webhooks**:
- Endpoint URL: `https://seu-dominio.pages.dev/api/webhooks/stripe`

#### 7. Deploy!

```bash
git add .
git commit -m "feat: configure for production"
git push
```

Cloudflare vai fazer deploy automaticamente!

---

## Opção 2: Vercel (Alternativa)

### Passo a Passo:

1. Acesse: https://vercel.com
2. **Import Git Repository**
3. Selecione seu repositório `wayia`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
5. Adicione todas as **Environment Variables** (mesmas do Cloudflare)
6. Clique em **Deploy**

**Vantagens Vercel:**
- Deploy mais rápido
- Melhor integração com Next.js
- Analytics gratuito

**Vantagens Cloudflare:**
- CDN global mais rápido
- Mais barato em escala
- DDoS protection

---

## Opção 3: Railway (Mais Simples)

### Passo a Passo:

1. Acesse: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Selecione repositório `wayia`
4. Railway detecta Next.js automaticamente
5. Adicione variáveis de ambiente
6. Deploy!

**Railway já inclui:**
- PostgreSQL integrado (fácil)
- SSL automático
- Logs em tempo real

---

## ⚙️ Configuração Pós-Deploy

### 1. Rodar Migrations no Banco de Produção

```bash
# Localmente com DATABASE_URL de produção:
DATABASE_URL="sua-url-producao" npx prisma migrate deploy
```

### 2. Testar o Site

1. Acesse `https://seu-dominio`
2. Faça login (Google/GitHub)
3. Crie uma instância Evolution
4. Teste o Kanban
5. Teste checkout Stripe (modo teste primeiro!)

### 3. Ativar Stripe Live Mode

Quando estiver tudo ok:
1. Ative sua conta Stripe (forneça documentos)
2. Troque keys de teste para live:
   - `sk_test_` → `sk_live_`
   - `pk_test_` → `pk_live_`
3. Recrie webhook em produção
4. Atualize variáveis de ambiente

---

## 🔒 Segurança

### Checklist antes de ir para produção:

- [ ] Todas as secrets estão em variáveis de ambiente (não no código)
- [ ] Ativou HTTPS (automático Cloudflare/Vercel)
- [ ] Configurou CORS corretamente
- [ ] Testou todos os fluxos OAuth
- [ ] Testou webhooks Stripe
- [ ] Fez backup do banco de dados
- [ ] Configurou rate limiting (Cloudflare)
- [ ] Adicionou monitoring (Sentry recomendado)

---

## 📊 Monitoramento

### Ferramentas Recomendadas:

1. **Sentry** (erros): https://sentry.io
2. **LogRocket** (sessões): https://logrocket.com
3. **Vercel Analytics** (se usar Vercel)
4. **Cloudflare Analytics** (se usar Cloudflare)

---

## 🆘 Troubleshooting

### Erro ao fazer build:
```bash
# Limpe cache e reinstale
rm -rf .next node_modules
npm install
npm run build
```

### Prisma não conecta:
- Verifique `DATABASE_URL` nas env vars
- Certifique-se que o banco está público (ou whitelist IP da Cloudflare/Vercel)

### OAuth não funciona:
- Verifique redirect URIs nos consoles
- Confirme `NEXTAUTH_URL` está correto

### Webhooks Stripe falham:
- Use Stripe CLI para testar localmente: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Verifique `STRIPE_WEBHOOK_SECRET`

---

## 🎯 Próximos Passos Após Deploy

1. Configurar domínio customizado (wayia.com.br)
2. Adicionar analytics
3. Configurar backup automático do banco
4. Implementar sistema de notificações
5. Adicionar mais features Premium
6. Marketing e vendas!

---

**Qualquer dúvida, consulte a documentação oficial:**
- Next.js: https://nextjs.org/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages
- Vercel: https://vercel.com/docs
- Stripe: https://stripe.com/docs

Boa sorte com o lançamento do WayIA! 🚀
