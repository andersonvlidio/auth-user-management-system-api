FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3333

EXPOSE 3333

CMD ["sh", "-c", "node src/server.js"]
