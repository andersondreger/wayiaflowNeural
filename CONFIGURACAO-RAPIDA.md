# 🚀 Configuração Rápida - Supabase + Stripe

## 📦 PARTE 1: Configurar Supabase (Banco de Dados)

### Passo 1: Criar Conta no Supabase

1. Acesse: **https://supabase.com**
2. Clique em **"Start your project"**
3. Faça login com GitHub (mais rápido)

### Passo 2: Criar Novo Projeto

1. Clique em **"New Project"**
2. Preencha:
   - **Name**: `wayia` (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte (ANOTE ESSA SENHA!)
   - **Region**: `South America (São Paulo)` (mais próximo do Brasil)
   - **Pricing Plan**: `Free` (perfeito para começar)

3. Clique em **"Create new project"**
4. Aguarde 2-3 minutos (ele está criando seu banco)

### Passo 3: Obter String de Conexão

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Clique em **"Database"**
3. Role até a seção **"Connection string"**
4. Selecione a aba **"URI"**
5. Copie a string que aparece (algo como):
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
   ```

6. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou no Passo 2

### Passo 4: Adicionar no .env

1. Abra o arquivo `.env` na raiz do projeto `wayia`
2. Encontre a linha:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/wayia"
   ```

3. Substitua pela sua string do Supabase:
   ```env
   DATABASE_URL="postgresql://postgres.xxxxxxxxxxxx:SUA-SENHA-AQUI@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
   ```

### Passo 5: Rodar Migrations

Abra o terminal e execute:

```bash
cd /c/Users/Anderson/dyad-apps/wayia
npx prisma migrate dev --name init
```

**O que vai acontecer:**
- ✅ Prisma vai conectar no Supabase
- ✅ Criar todas as tabelas (User, Lead, EvolutionInstance, etc.)
- ✅ Gerar o Prisma Client

**Sucesso!** Se aparecer mensagens verdes, o banco está configurado! 🎉

---

## 💳 PARTE 2: Configurar Stripe (Pagamentos)

### Passo 1: Criar Conta Stripe

1. Acesse: **https://dashboard.stripe.com/register**
2. Preencha:
   - Email
   - Nome completo
   - País: **Brasil**
   - Senha

3. Clique em **"Create account"**
4. **IMPORTANTE**: Use o modo **TESTE** por enquanto (já vem ativado)

### Passo 2: Obter API Keys (Modo Teste)

1. No Dashboard, vá em **"Developers"** (menu superior)
2. Clique em **"API keys"** (menu lateral)
3. Você verá duas keys:

   **Publishable key** (começa com `pk_test_`):
   ```
   pk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   **Secret key** (começa com `sk_test_`) - clique em "Reveal live key":
   ```
   sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Copie ambas** e guarde em lugar seguro

### Passo 3: Criar Produto Premium

1. No menu lateral, clique em **"Products"**
2. Clique em **"Add product"**
3. Preencha:
   - **Name**: `WayIA Premium`
   - **Description**: `Plano Premium com CRM, N8N e IA`

4. Em **"Pricing"**:
   - Selecione: **"Recurring"**
   - **Billing period**: `Monthly`
   - **Price**: `89.90`
   - **Currency**: `BRL` (Real Brasileiro)

5. Clique em **"Add pricing"**
6. Clique em **"Save product"**

### Passo 4: Obter Price ID

1. Você será redirecionado para a página do produto
2. Na seção **"Pricing"**, você verá o preço que acabou de criar
3. Clique no preço (ex: "R$ 89,90/month")
4. Na URL do navegador, copie o ID que começa com `price_`:
   ```
   price_1xxxxxxxxxxxxxxxxxxxxxx
   ```
5. **Copie esse Price ID**

### Passo 5: Configurar Webhook

1. No menu lateral, clique em **"Webhooks"**
2. Clique em **"Add endpoint"**
3. Em **"Endpoint URL"**, coloque:
   ```
   http://localhost:3000/api/webhooks/stripe
   ```
   *(Por enquanto vamos usar localhost para testar)*

4. Clique em **"Select events"**
5. Encontre e selecione estes 4 eventos:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_failed`

6. Clique em **"Add events"**
7. Clique em **"Add endpoint"**

### Passo 6: Obter Webhook Secret

1. Você será redirecionado para a página do webhook
2. Na seção **"Signing secret"**, clique em **"Reveal"**
3. Copie o secret (começa com `whsec_`):
   ```
   whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Passo 7: Adicionar Tudo no .env

Abra o arquivo `.env` e atualize:

```env
# Stripe
STRIPE_SECRET_KEY="sk_test_SUA-SECRET-KEY-AQUI"
STRIPE_PUBLISHABLE_KEY="pk_test_SUA-PUBLISHABLE-KEY-AQUI"
STRIPE_WEBHOOK_SECRET="whsec_SEU-WEBHOOK-SECRET-AQUI"
STRIPE_PRICE_ID="price_SEU-PRICE-ID-AQUI"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PREMIUM_PRICE_MONTHLY=89.90
```

---

## ✅ VERIFICAÇÃO FINAL

Seu arquivo `.env` deve estar assim:

```env
# Database
DATABASE_URL="postgresql://postgres.xxxx:SENHA@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

# NextAuth (vamos configurar depois)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# Google OAuth (vamos configurar depois)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub OAuth (vamos configurar depois)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Evolution API (JÁ ESTÁ CONFIGURADO!)
EVOLUTION_API_URL="https://evo2.wayiaflow.com.br"
EVOLUTION_API_KEY="d86920ba398e31464c46401214779885"

# N8N (vamos configurar depois)
N8N_URL="https://n8n.wayiaflow.com.br"
N8N_API_KEY=""

# Stripe (JÁ ESTÁ CONFIGURADO!)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID="price_..."

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PREMIUM_PRICE_MONTHLY=89.90
```

---

## 🧪 TESTAR AGORA!

### 1. Inicie o Projeto

```bash
cd /c/Users/Anderson/dyad-apps/wayia
npm run dev
```

### 2. Acesse no Navegador

```
http://localhost:3000
```

### 3. Teste o Stripe (SEM OAuth por enquanto)

**Para testar o checkout sem fazer login primeiro:**

Abra outro terminal e crie um usuário de teste direto no banco:

```bash
npx prisma studio
```

Isso vai abrir uma interface visual em `http://localhost:5555`

1. Clique em **"User"**
2. Clique em **"Add record"**
3. Preencha:
   - `email`: seu-email@gmail.com
   - `name`: Seu Nome
   - `role`: FREE_USER

4. Clique em **"Save 1 change"**

**Agora você pode:**
1. Ir para `http://localhost:3000/dashboard/premium`
2. Clicar em **"Assinar Agora"**
3. Será redirecionado para o Stripe Checkout

### 4. Testar Pagamento (Modo Teste)

Use estes cartões de teste do Stripe:

**Cartão que funciona:**
- Número: `4242 4242 4242 4242`
- Data: Qualquer data futura (ex: `12/25`)
- CVC: Qualquer 3 números (ex: `123`)
- CEP: Qualquer (ex: `12345`)

**Outros cartões de teste:**
- Pagamento recusado: `4000 0000 0000 0002`
- Requer autenticação 3D: `4000 0025 0000 3155`

### 5. Verificar se Funcionou

Depois de "pagar" com o cartão de teste:
1. Você será redirecionado para `/dashboard/premium/success`
2. No Prisma Studio, atualize a tabela **"Subscription"**
3. Você verá uma nova subscription com `status: ACTIVE`
4. O usuário agora tem acesso Premium!

---

## 🎯 PRÓXIMOS PASSOS

Agora você tem:
- ✅ Banco de dados funcionando (Supabase)
- ✅ Pagamentos funcionando (Stripe)
- ✅ Evolution API configurada

**Ainda falta configurar:**
- ⏳ OAuth (Google + GitHub) para login real
- ⏳ NextAuth Secret
- ⏳ N8N API Key

Quer que eu te ajude a configurar o OAuth agora? Ou prefere testar o sistema primeiro?

---

## 🆘 PROBLEMAS COMUNS

### "Failed to connect to database"
- Verifique se copiou a senha corretamente no DATABASE_URL
- Certifique-se que não tem espaços extras na string

### "Invalid API Key" no Stripe
- Confirme que copiou as keys certas (TEST, não LIVE)
- Verifique se não tem espaços ou aspas extras no .env

### Webhook não funciona
- Por enquanto é normal, webhook só funciona quando o site está público
- Para testar local, use Stripe CLI (vou te mostrar se quiser)

### "Prisma Client not found"
- Execute: `npx prisma generate`
