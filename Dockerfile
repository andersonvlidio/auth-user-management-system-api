FROM node:22

WORKDIR /app

COPY .env .env

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 3333

CMD ["node", "src/server.js"]
