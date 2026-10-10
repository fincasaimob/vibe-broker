# Diagnóstico: Por que a página está em branco?

## Causa Raiz

A página está em branco porque:

### 1️⃣ Variáveis de Ambiente Não Estão no Vercel

O Vercel **não lê** o arquivo `.env.production`. Você precisa:

```
❌ ERRADO: Colocar variáveis em arquivo .env.production
✅ CORRETO: Configurar no Vercel Dashboard > Settings > Environment Variables
```

**Como o Vercel carrega variáveis:**

```
┌─────────────────────────────────────────────┐
│     VERCEL DASHBOARD                        │
│   (Settings > Environment Variables)        │
│  ✓ SUPABASE_URL                             │
│  ✓ SUPABASE_PUBLISHABLE_KEY                 │
│  ✓ ADMIN_PASSWORD                           │
│  ✓ ADMIN_SESSION_SECRET                     │
└────────────────┬────────────────────────────┘
                 ↓
         VERCEL BUILD PROCESS
                 ↓
         ✓ npm install
         ✓ npm run build (com variáveis)
                 ↓
         ✓ Deployed para vibe-broker.vercel.app
```

### 2️⃣ Por Que a Página Fica em Branco Sem as Variáveis?

Sequência de eventos:

```
1. Usuário acessa: https://vibe-broker.vercel.app
                    ↓
2. HTML carrega (do __root.tsx)
                    ↓
3. React inicia renderização
                    ↓
4. Index component tenta fazer: useSuspenseQuery(contentQuery)
                    ↓
5. Suspense aguarda dados de: getSiteContent()
                    ↓
6. getSiteContent() tenta conectar ao Supabase:
   - Precisa de: SUPABASE_URL (undefined ❌)
   - Precisa de: SUPABASE_PUBLISHABLE_KEY (undefined ❌)
                    ↓
7. Falha ao conectar → Erro ou hang
                    ↓
8. LoadingFallback renderiza... MAS
   - Se há erro antes de Suspense render, fica branco
   - Se Suspense renderiza spinner, você vê "Carregando..."
```

## ✅ Solução: 3 Passos Simples

### Passo 1: Acessar Vercel Dashboard

```
https://vercel.com/dashboard/projects/vibe-broker
```

### Passo 2: Settings → Environment Variables

Adicionar 4 variáveis:

```env
SUPABASE_URL=https://zibjvjhalbvvahxcqhpo.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_WX-H00xdUbiPyKRgXxiEMg_HuhH2EWH
ADMIN_PASSWORD=vibe2024seguro
ADMIN_SESSION_SECRET=abc123def456ghi789jkl012mno345pqr
```

Marcar **todas 3 colunas**: Production + Preview + Development

### Passo 3: Redeploy

```
Dashboard → Deployments → (último deployment)
→ Clique no menu (3 pontos) → Redeploy
```

Aguarde ~2-3 minutos.

## 🧪 Verificar se Funcionou

### ✅ Cenário 1: Vejo "Carregando..." com spinner

```
┌─────────────────────┐
│  Carregando...      │
│    ◠◡◠ (spinner)    │
└─────────────────────┘
```

**Significado:** Página está funcionando! Spinner desaparece em alguns segundos quando dados carregam. Se demora muito (> 30s), há problema com Supabase.

### ✅ Cenário 2: Página carrega completamente

Logo Vibe Broker, navegação, seções, parceiros, conteúdo, etc.

**Significado:** ✅ Tudo funcionando! Parabéns!

### ❌ Cenário 3: Page continua em branco

**Debug steps:**

1. Abra **DevTools** (F12 ou Ctrl+Shift+I)
2. Clique em **Console**
3. Procure por:
   - Erros vermelhos
   - Mensagens de CORS
   - Erros de conexão ao Supabase

4. Se vir erros, compartilhe a mensagem exata

## 🔧 Verificação Técnica

### No Vercel Dashboard:

```
Settings → Deployments → Clique no deployment mais recente
```

Procure pela seção **Build Logs**:

- ✅ Se houver linha: `npm run build completed successfully`
- ✅ Se houver: `Created production deployment`
- ❌ Se houver `failed` ou `error`, o build não funcionou

### Local (para testar):

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Testar build local
npm run build

# Se `dist/` for criado com sucesso:
#   ✅ Build funciona localmente
# Se houver erro:
#   ❌ Problema no código ou dependências
```

## 📋 Checklist Final

- [ ] Entrei no Vercel Dashboard
- [ ] Adicionei 4 variáveis de ambiente
- [ ] Marque todas 3 colunas (Production, Preview, Development)
- [ ] Cliquei "Save" após cada variável
- [ ] Fiz redeploy (Deployments → 3 pontos → Redeploy)
- [ ] Aguardei 2-3 minutos
- [ ] Acessei vibe-broker.vercel.app
- [ ] Vi spinner com "Carregando..." ou página completa
- [ ] ✅ Sucesso!

## 🆘 Ainda Não Funcionou?

Se a página **continua em branco** após todos esses passos:

1. Limpe o cache do browser:
   - Windows/Linux: `Ctrl+Shift+Delete` 
   - Mac: `Cmd+Shift+Delete`
   - Ou abra em **modo incógnito** (Ctrl+Shift+N)

2. Aguarde mais tempo (pode haver cache em vários níveis)

3. Verifique DevTools Console para erros específicos

4. Verifique se Supabase está online:
   - Acesse: https://zibjvjhalbvvahxcqhpo.supabase.co
   - Deve carregar o dashboard do Supabase

Se nada funcionar, há problema adicional que precisa investigação no código.
