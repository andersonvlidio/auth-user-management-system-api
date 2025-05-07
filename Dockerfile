FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]
