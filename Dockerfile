FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT=3333

EXPOSE 3333

CMD ["node", "src/server.js"]
