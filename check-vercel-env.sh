#!/bin/bash

# Script para verificar configuração de variáveis de ambiente no Vercel
# Como usar: bash check-vercel-env.sh

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Verificador de Configuração Vercel para Vibe Broker       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir resultado
check_result() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✓${NC} $2"
  else
    echo -e "${RED}✗${NC} $2"
  fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Verificando arquivos de configuração"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f ".env.production" ]; then
  check_result 0 ".env.production existe"
  echo "  Conteúdo:"
  cat .env.production | sed 's/^/    /'
else
  check_result 1 ".env.production NÃO existe"
fi

echo ""
if [ -f "vercel.json" ]; then
  check_result 0 "vercel.json existe"
else
  check_result 1 "vercel.json NÃO existe"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Variáveis de Ambiente Carregadas Localmente"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Carregar variáveis do .env.production
if [ -f ".env.production" ]; then
  export $(cat .env.production | xargs)
fi

echo ""
echo -e "${BLUE}SUPABASE_URL:${NC}"
if [ -z "$SUPABASE_URL" ]; then
  echo -e "  ${RED}✗ NÃO DEFINIDO${NC}"
else
  echo -e "  ${GREEN}✓ $SUPABASE_URL${NC}"
fi

echo ""
echo -e "${BLUE}SUPABASE_PUBLISHABLE_KEY:${NC}"
if [ -z "$SUPABASE_PUBLISHABLE_KEY" ]; then
  echo -e "  ${RED}✗ NÃO DEFINIDO${NC}"
else
  # Mostrar apenas primeiros e últimos caracteres
  KEY_LENGTH=${#SUPABASE_PUBLISHABLE_KEY}
  KEY_START=${SUPABASE_PUBLISHABLE_KEY:0:10}
  KEY_END=${SUPABASE_PUBLISHABLE_KEY: -5}
  echo -e "  ${GREEN}✓ ${KEY_START}...${KEY_END}${NC} (${KEY_LENGTH} caracteres)"
fi

echo ""
echo -e "${BLUE}ADMIN_PASSWORD:${NC}"
if [ -z "$ADMIN_PASSWORD" ]; then
  echo -e "  ${RED}✗ NÃO DEFINIDO${NC}"
else
  echo -e "  ${GREEN}✓ Definido (${#ADMIN_PASSWORD} caracteres)${NC}"
fi

echo ""
echo -e "${BLUE}ADMIN_SESSION_SECRET:${NC}"
if [ -z "$ADMIN_SESSION_SECRET" ]; then
  echo -e "  ${RED}✗ NÃO DEFINIDO${NC}"
else
  echo -e "  ${GREEN}✓ Definido (${#ADMIN_SESSION_SECRET} caracteres)${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Build Local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "Tentando npm run build..."
npm run build > /tmp/build.log 2>&1

if [ $? -eq 0 ]; then
  check_result 0 "Build completed successfully"
  if [ -d "dist" ]; then
    FILES=$(find dist -type f | wc -l)
    echo -e "  ${GREEN}$FILES arquivos gerados em dist/${NC}"
  fi
else
  check_result 1 "Build FAILED"
  echo "  Últimas linhas do log:"
  tail -10 /tmp/build.log | sed 's/^/    /'
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Instruções para Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "  O Vercel NÃO lê do arquivo .env.production!"
echo ""
echo "  Você PRECISA adicionar as variáveis manualmente:"
echo ""
echo "  1. Acesse: https://vercel.com/dashboard/projects/vibe-broker"
echo "  2. Clique em: Settings > Environment Variables"
echo "  3. Adicione as 4 variáveis acima"
echo "  4. Marque TODAS as 3 colunas: Production, Preview, Development"
echo "  5. Clique Save em cada uma"
echo "  6. Vá para Deployments e clique em Redeploy"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Verificação concluída!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
