FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Garante permissão de execução do script
RUN chmod +x ./entrypoint.sh

EXPOSE 3333

# Executa tudo via entrypoint no runtime
CMD ["./entrypoint.sh"]
