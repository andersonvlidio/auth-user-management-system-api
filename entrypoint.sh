#!/bin/bash

set -e

echo "📦 Gerando Prisma Client..."
npx prisma generate

echo "🧩 Aplicando migrações com Prisma..."
npx prisma migrate deploy

echo "🚀 Iniciando aplicação..."
exec node src/server.js
