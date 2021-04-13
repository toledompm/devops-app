FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY src .

CMD [ "node", "server.js" ]
