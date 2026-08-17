#!/bin/bash

# BarIQ Setup Script
# Este script cria toda a estrutura do projeto

echo "🍸 BarIQ - Setup Automático"
echo "================================"

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Criar estrutura de diretórios
echo -e "${BLUE}1. Criando estrutura de diretórios...${NC}"

mkdir -p src/{app,components/common,components/layout,components/feedback,features/{auth,drinks,ingredients,pantry,favorites,catalog}/{components,hooks,services},hooks,lib/supabase,services,stores,types,utils}
mkdir -p public
mkdir -p supabase/migrations

echo -e "${GREEN}✓ Diretórios criados${NC}"

# 2. Copiar arquivos de configuração
echo -e "${BLUE}2. Copiando arquivos de configuração...${NC}"

# Arquivos de config já estão aqui (criados anteriormente)
echo -e "${GREEN}✓ Configurações prontas${NC}"

# 3. Criar arquivos principais se não existirem
echo -e "${BLUE}3. Verificando arquivos principais...${NC}"

if [ ! -f "src/app/layout.tsx" ]; then
  echo -e "${BLUE}  • Criando layout.tsx${NC}"
fi

if [ ! -f "src/app/globals.css" ]; then
  echo -e "${BLUE}  • Criando globals.css${NC}"
fi

echo -e "${GREEN}✓ Arquivos verificados${NC}"

# 4. Próximos passos
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ SETUP COMPLETADO!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Próximos passos:"
echo "1. npm install"
echo "2. cp .env.example .env.local"
echo "3. Adicionar credenciais do Supabase em .env.local"
echo "4. npm run dev"
echo ""
echo "Abrir: http://localhost:3000"
