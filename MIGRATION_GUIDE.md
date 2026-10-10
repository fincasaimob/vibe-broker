# Vibe Broker - Migração de Lovable para Vercel

**Status**: Extração e preparação completa ✅

Este guia descreve como completar a migração do seu projeto Vibe Broker de Lovable para Vercel.

## 📋 O que foi feito

- ✅ Todos os arquivos extraídos do Lovable
- ✅ Estrutura de diretórios preparada
- ✅ Arquivo `vercel.json` configurado para deployment
- ✅ Arquivo `.env.example` criado com variáveis necessárias
- ✅ Dependências e configuração pronta para npm/yarn

## 🚀 Próximos passos

### 1. Preparar o repositório Git local

Abra seu terminal, navegue até este diretório e execute:

```bash
git init
```

### 2. Configurar seu usuário Git

```bash
git config user.name "Seu Nome"
git config user.email "seu-email@gmail.com"
```

### 3. Adicionar todos os arquivos

```bash
git add .
```

### 4. Criar o primeiro commit

```bash
git commit -m "Initial commit: Vibe Broker project migrated from Lovable to Vercel"
```

### 5. Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Digite o nome: `vibe-broker`
3. Escolha "Private" ou "Public"
4. NÃO inicialize com README, .gitignore ou licença (já temos)
5. Clique em "Create repository"

### 6. Conectar repositório remoto e fazer push

Copie e execute os comandos que o GitHub mostra, semelhante a:

```bash
git branch -M main
git remote add origin https://github.com/seu-usuario/vibe-broker.git
git push -u origin main
```

### 7. Conectar repositório ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New..." → "Project"
4. Selecione o repositório `vibe-broker`
5. Vercel detectará automaticamente que é um projeto TanStack Start

### 8. Configurar variáveis de ambiente no Vercel

Na página de settings do projeto Vercel:

1. Vá até "Settings" → "Environment Variables"
2. Adicione as seguintes variáveis:

```
SUPABASE_URL = [sua_url_do_supabase]
SUPABASE_PUBLISHABLE_KEY = [sua_chave_publica_do_supabase]
ADMIN_PASSWORD = [escolha_uma_senha_segura]
ADMIN_SESSION_SECRET = [gere_uma_string_aleatoria_segura]
```

### 9. Configurar domínio vibebroker.com.br

1. No Vercel, vá para "Settings" → "Domains"
2. Clique "Add Domain"
3. Digite `vibebroker.com.br`
4. Vercel fornecerá os nameservers

Depois, em seu painel Registro.br:

1. Acesse seus domínios registrados
2. Selecione `vibebroker.com.br`
3. Vá para "Editar" e busque "Servidores de nomes"
4. Substitua os nameservers atuais pelos do Vercel

⏱️ Pode levar 24-48 horas para propagar.

## 📦 Sobre a estrutura do projeto

O projeto usa:
- **Framework**: TanStack Start (full-stack React)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS
- **Backend**: Supabase (PostgreSQL) com Row-Level Security
- **ORM**: Drizzle ORM
- **Deploy**: Vercel (full-stack)

## 🔒 Variáveis de Ambiente Detalhadas

### Obter credenciais do Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Vá para seu projeto
3. Settings → API
4. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **Anon public key** → `SUPABASE_PUBLISHABLE_KEY`

### Criar segredos seguros

Para `ADMIN_SESSION_SECRET`, gere uma string aleatória:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Escolha uma senha forte para `ADMIN_PASSWORD`.

## 🎯 Custo da hospedagem

- **Vercel Free Tier**: R$ 0,00/mês (para este projeto)
- **Supabase Free Tier**: R$ 0,00/mês (até 500 MB de banco de dados)

## 📧 Email com domínio (Opcional)

O Vercel não fornece email hosting. Alternativas gratuitas/baratas:

### Opção 1: Forward gratuito via ImprovMX
1. Acesse [improvmx.com](https://improvmx.com)
2. Adicione seu domínio
3. Configure os MX records em Registro.br
4. Encaminhe emails para sua conta Gmail pessoal

### Opção 2: Google Workspace (pago)
- Custo: a partir de R$ 50/mês por usuário
- Whitelabel completo

## ❓ Próximas etapas recomendadas

1. **Database migrations**: Execute `npm run build` para gerar migrações no Drizzle
2. **Admin panel**: Acesse `/admin` em seu site após deploy
3. **GitHub**: Configure proteção de branch principal se desejar

## 🆘 Troubleshooting

### "Cannot find module '@tanstack/...'"
```bash
npm install
```

### Erro ao fazer push para GitHub
```bash
git pull origin main
```

### Vercel mostra erro de build
Verifique os logs em "Deployments" no painel Vercel

## 📞 Contato

Se encontrar problemas durante a migração, verifique:
- As variáveis de ambiente estão configuradas?
- O banco de dados Supabase está acessível?
- Há espaço em disco no Vercel?

---

**Pronto para migrar!** Execute os comandos Git acima para começar. 🎉
