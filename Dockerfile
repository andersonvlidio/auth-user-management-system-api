FROM node:22

WORKDIR /app

# Copiar package.json e package-lock.json (caso exista)
COPY package*.json ./

# Instalar as dependências, incluindo Prisma
RUN npm install

# Copiar o restante do código
COPY . .

# Garantir que o entrypoint.sh tenha permissões de execução
RUN chmod +x ./entrypoint.sh

EXPOSE 3333

# Usar o entrypoint para iniciar a aplicação
ENTRYPOINT ["./entrypoint.sh"]
