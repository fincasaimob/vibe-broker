# Vibe Broker - Inteligência Imobiliária

Plataforma de consultoria imobiliária especializada em MCMV, desenvolvida com TanStack Start, React 19, e hospedada em Vercel.

## 🎯 O Projeto

**Vibe Broker** oferece:
- Landing page com apresentação da "Filosofia 5→1"
- Catálogo de parceiros (incorporadoras)
- Conteúdo educativo integrado ao Instagram
- Painel administrativo para gerenciar parceiros e posts
- Integração com Supabase para dados dinâmicos

## 🛠️ Stack Técnico

- **Frontend**: React 19, TypeScript, TanStack Router, TanStack Query
- **Styling**: Tailwind CSS 4, shadcn/ui, Radix UI
- **Backend**: TanStack Start (SSR/API routes), Node.js
- **Database**: Supabase (PostgreSQL) com RLS
- **ORM**: Drizzle ORM
- **Deploy**: Vercel
- **Package Manager**: npm/yarn/bun

## 🚀 Iniciar desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Fazer build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm lint

# Formatação de código
npm format
```

## 📁 Estrutura de pastas

```
vibe-broker/
├── src/
│   ├── routes/           # Pages/rotas TanStack Router
│   │   ├── __root.tsx    # Layout raiz
│   │   ├── index.tsx     # Página inicial
│   │   └── admin.tsx     # Painel administrativo
│   ├── components/
│   │   └── ui/           # shadcn/ui components (50+)
│   ├── integrations/
│   │   └── supabase/     # Clientes Supabase, auth, types
│   ├── lib/              # Utilitários, funcções de servidor
│   ├── hooks/            # React hooks personalizados
│   ├── assets/           # Imagens, logos
│   ├── server.ts         # Entrada do servidor
│   ├── start.ts          # Configuração TanStack Start
│   ├── router.tsx        # Setup do router
│   └── styles.css        # Tailwind CSS global
├── drizzle/
│   ├── schema.ts         # Schema do banco de dados
│   ├── migrations/       # SQL migrations
│   └── config.ts         # Configuração Drizzle
├── public/               # Assets públicos (favicon, robots.txt)
├── vite.config.ts        # Configuração Vite
├── tsconfig.json         # Configuração TypeScript
├── vercel.json           # Configuração Vercel
├── .env.example          # Variáveis de exemplo
└── package.json          # Dependências
```

## 🔐 Autenticação Admin

O painel administrativo usa:
- Login local com username/password
- Sessão com token HMAC assinado
- Armazenado em sessionStorage (navegador)
- Válido por 12 horas

**Credenciais padrão**:
- Username: `admin`
- Password: definida via `ADMIN_PASSWORD` (env var)

## 📊 Database Schema

### Tabela `partners` (partners)
```sql
- id (UUID, PK)
- name (text)
- logo_url (text, nullable)
- cities (text[])
- focus (text, nullable)
- created_at (timestamp)
```

### Tabela `instagram_posts` (posts)
```sql
- id (UUID, PK)
- url (text, unique)
- title (text)
- tag (text, nullable)
- image_url (text, nullable)
- created_at (timestamp)
```

## 🌐 Deployment em Vercel

1. Conectar repositório GitHub ao Vercel
2. Configurar environment variables
3. Deploy automático em cada push para `main`

Ver [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) para instruções completas.

## 📦 Principais dependências

- `@tanstack/react-start`: Framework full-stack
- `@tanstack/react-router`: Roteamento
- `@tanstack/react-query`: State management
- `@supabase/supabase-js`: Client PostgreSQL
- `drizzle-orm`: TypeScript ORM
- `tailwindcss`: Utility CSS framework
- `zod`: Validação de schema
- `react-hook-form`: Form handling
- `shadcn/ui`: Component library

## 🎨 Design System

- **Cores primárias**: Dark navy background, Copper accent
- **Tipografia**: Manrope (body), Urbanist (display)
- **Spacing**: Tailwind padrão
- **Componentes**: shadcn/ui + Radix UI primitives

## 🔒 Segurança

- Row-Level Security (RLS) no Supabase
- CSRF protection em formulários
- Validação Zod para inputs
- Secrets em variáveis de ambiente (nunca commitar .env)
- Tokens de sessão com assinatura HMAC

## 📝 Variáveis de ambiente

Veja `.env.example` para a lista completa.

**Essenciais para produção**:
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## 🤝 Contributing

Este é um projeto privado. Para mudanças:
1. Create a branch (`git checkout -b feature/sua-feature`)
2. Commit changes (`git commit -m 'Add feature'`)
3. Push to branch (`git push origin feature/sua-feature`)
4. Open a Pull Request

## 📄 Licença

Propriedade de Vibe Broker - 2026

---

**Status**: Migrado de Lovable para Vercel ✅
