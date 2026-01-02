# 🛠️ Guia de Setup - WayIA

## 1. Banco de Dados PostgreSQL

### Opção 1: PostgreSQL Local

1. Instale o PostgreSQL: https://www.postgresql.org/download/

2. Crie o banco de dados:
```bash
psql -U postgres
CREATE DATABASE wayia;
\q
```

3. Configure a string de conexão no `.env`:
```env
DATABASE_URL="postgresql://postgres:sua-senha@localhost:5432/wayia"
```

### Opção 2: PostgreSQL na Nuvem (Recomendado)

**Supabase (Gratuito):**
1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Copie a string de conexão "URI" em Project Settings > Database
4. Cole no `.env`:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

**Railway:**
1. Acesse: https://railway.app
2. New Project > Deploy PostgreSQL
3. Copie a `DATABASE_URL` das variáveis
4. Cole no `.env`

**Neon (Gratuito):**
1. Acesse: https://neon.tech
2. Crie um novo projeto
3. Copie a connection string
4. Cole no `.env`

## 2. Rodar Migrations do Prisma

```bash
npx prisma migrate dev --name init
```

Este comando vai:
- ✅ Criar todas as tabelas no banco
- ✅ Gerar o Prisma Client
- ✅ Aplicar o schema

## 3. Visualizar o Banco (Opcional)

```bash
npx prisma studio
```

Abre uma interface visual em `http://localhost:5555`

## 4. Autenticação OAuth

### Google OAuth

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto
3. Ative a API "Google+ API"
4. Credentials > Create Credentials > OAuth Client ID
5. Application type: Web application
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copie Client ID e Client Secret para o `.env`:

```env
GOOGLE_CLIENT_ID="seu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu-client-secret"
```

### GitHub OAuth

1. Acesse: https://github.com/settings/developers
2. New OAuth App
3. Homepage URL: `http://localhost:3000`
4. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copie Client ID e gere um Client Secret
6. Cole no `.env`:

```env
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"
```

## 5. NextAuth Secret

Gere um secret seguro:

```bash
openssl rand -base64 32
```

Cole no `.env`:
```env
NEXTAUTH_SECRET="resultado-do-comando-acima"
NEXTAUTH_URL="http://localhost:3000"
```

## 6. Evolution API

Você já tem a Evolution API rodando em: `https://evo2.wayiaflow.com.br/`

Para obter a API Key:
1. Acesse o dashboard da Evolution API
2. Settings ou API Keys
3. Copie a key
4. Cole no `.env`:

```env
EVOLUTION_API_URL="https://evo2.wayiaflow.com.br"
EVOLUTION_API_KEY="sua-evolution-api-key"
```

## 7. N8N Integration

Você já tem N8N em: `https://n8n.wayiaflow.com.br/`

Para integração:
1. Acesse Settings no N8N
2. API > API Key
3. Gere uma nova API key
4. Cole no `.env`:

```env
N8N_URL="https://n8n.wayiaflow.com.br"
N8N_API_KEY="sua-n8n-api-key"
```

## 8. Stripe (Pagamentos)

### Passo 1: Criar Conta
1. Acesse: https://dashboard.stripe.com/register
2. Complete o cadastro

### Passo 2: Obter API Keys (Modo Teste)
1. No Dashboard, vá em Developers > API keys
2. Copie:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

3. Cole no `.env`:
```env
STRIPE_PUBLISHABLE_KEY="pk_test_sua-key"
STRIPE_SECRET_KEY="sk_test_sua-key"
```

### Passo 3: Criar Produto e Preço
1. Products > Add Product
2. Nome: "WayIA Premium"
3. Descrição: "Plano Premium com CRM, N8N e IA"
4. Pricing: Recurring > Monthly > R$ 89,90
5. Salve e copie o Price ID (começa com `price_`)
6. Cole no `.env`:

```env
STRIPE_PRICE_ID="price_seu-id-aqui"
```

### Passo 4: Configurar Webhook
1. Developers > Webhooks > Add endpoint
2. Endpoint URL: `http://localhost:3000/api/webhooks/stripe` (desenvolvimento)
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copie o Signing secret (whsec_...)
5. Cole no `.env`:

```env
STRIPE_WEBHOOK_SECRET="whsec_seu-secret"
```

### Para Produção (depois):
1. Ative sua conta Stripe (forneça documentos)
2. Troque as keys de teste (pk_test_, sk_test_) pelas de produção (pk_live_, sk_live_)
3. Atualize o webhook endpoint para sua URL de produção

## 9. Arquivo .env Completo

Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

Preencha TODAS as variáveis conforme as instruções acima.

## 10. Rodar o Projeto

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 11. Testar

1. ✅ Crie uma conta (Google ou GitHub OAuth)
2. ✅ Acesse o dashboard
3. ✅ Crie uma instância Evolution
4. ✅ Teste o Kanban
5. ✅ Tente assinar o plano Premium (modo teste Stripe)

## 🆘 Problemas Comuns

### Erro no Prisma Client
```bash
npx prisma generate
```

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Verifique a string de conexão no `.env`
- Teste a conexão: `npx prisma db push`

### OAuth não funciona
- Verifique as Redirect URIs nos consoles do Google/GitHub
- Certifique-se que `NEXTAUTH_URL` está correto

### Stripe não processa
- Verifique se está usando as keys de TEST
- Use cartões de teste: https://stripe.com/docs/testing

---

**Precisa de ajuda?** Abra uma issue ou entre em contato!
