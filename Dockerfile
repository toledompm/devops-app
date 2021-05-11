ARG BUILD_DIR=/build-dir
ARG APP_DIR=/app

FROM node:14-alpine AS build

ARG BUILD_DIR
WORKDIR $BUILD_DIR

COPY package*.json ./
RUN npm install

COPY . $BUILD_DIR
RUN npm run build

FROM node:14-alpine

ARG BUILD_DIR
ARG APP_DIR
WORKDIR $APP_DIR

COPY --from=build $BUILD_DIR/dist $APP_DIR
RUN npm install --only=prod --silent

CMD ["npm", "run", "start:prod"]
