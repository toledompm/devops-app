FROM node:14-slim

ADD . /app
WORKDIR /app

COPY package*.json ./
RUN npm install

CMD ["npm", "run", "start:dev"]
