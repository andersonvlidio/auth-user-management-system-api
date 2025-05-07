#!/bin/sh
set -ex

npx prisma generate

npx prisma migrate deploy

echo "Iniciando aplicação..."
exec node src/server.js
