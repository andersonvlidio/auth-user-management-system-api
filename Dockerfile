FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN npx prisma migrate deploy

ENV PORT=3333

EXPOSE 3333

CMD ["node", "src/server.js"]
