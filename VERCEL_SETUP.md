# Configuração de Variáveis de Ambiente no Vercel

## ⚠️ Problema Atual

A página `vibe-broker.vercel.app` está em branco porque as variáveis de ambiente não estão configuradas no **Vercel Dashboard**. O arquivo `.env.production` local é apenas para desenvolvimento local — **Vercel não o lê durante a construção**.

## ✅ Solução: Configurar Variáveis no Vercel Dashboard

### Passo 1: Acessar o Dashboard do Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **vibe-broker**

### Passo 2: Ir para Settings (Configurações)

1. Clique na aba **Settings** (Engrenagem)
2. No menu esquerdo, clique em **Environment Variables**

### Passo 3: Adicionar as 4 Variáveis Necessárias

Adicione estas variáveis **exatamente** como mostrado:

| Nome | Valor | Aplicar Em |
|------|-------|-----------|
| `SUPABASE_URL` | `https://zibjvjhalbvvahxcqhpo.supabase.co` | Production, Preview, Development |
| `SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_WX-H00xdUbiPyKRgXxiEMg_HuhH2EWH` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `vibe2024seguro` | Production, Preview, Development |
| `ADMIN_SESSION_SECRET` | `abc123def456ghi789jkl012mno345pqr` | Production, Preview, Development |

### Passo 4: Confirmar Adição

- Clique **Save** após adicionar cada variável
- Você verá a mensagem "Environment variable added"

### Passo 5: Redeploy Automático

1. As variáveis estarão prontas imediatamente
2. Acesse [vercel.com/dashboard/deployments](https://vercel.com/dashboard/deployments)
3. Procure por "vibe-broker"
4. Clique no último deployment e selecione **Redeploy** (no menu de 3 pontos)
5. Aguarde ~2-3 minutos pela construção completar

## 🔍 Como Verificar se Funcionou

Após a redeploy:

1. Acesse `https://vibe-broker.vercel.app`
2. Se ver um **spinner girando com "Carregando..."**:
   - ✅ Significa que a página está tentando buscar dados do Supabase
   - A página carregará completamente em alguns segundos
   
3. Se a página **continuar em branco**:
   - ❌ Há outro problema — abra o DevTools (F12) e verifique o Console para erros

## 📊 DNS para Domínio Customizado

Quando o domínio `vibebroker.com.br` estiver propagado (dentro de 24h), a página carregará também em:
- `https://vibebroker.com.br`
- `https://www.vibebroker.com.br`

Os registros DNS já estão configurados corretamente no Registro.br.

## 🛠️ Troubleshooting

**Se ver "Não foi possível carregar a página":**
- Abra DevTools (F12) → Console
- Verifique se há erro de conexão ao Supabase
- Confirme que as variáveis foram salvas no Vercel Dashboard

**Se page continuar em branco após redeploy:**
- Aguarde 2-3 minutos (cache de browser)
- Faça Ctrl+Shift+Delete (limpar cache) e recarregue
- Tente em modo incógnito (Ctrl+Shift+N)

## 📝 Notas Importantes

- Não compartilhe a chave `SUPABASE_PUBLISHABLE_KEY` publicamente (é pública, mas boas práticas)
- A `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` são sensíveis — mantenha seguras
- O Vercel rebuild automaticamente quando você faz push para `main` no GitHub
