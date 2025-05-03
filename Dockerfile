FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

ENV PORT=3333

EXPOSE 3333

CMD ["node", "src/server.js"]
