FROM node:11.15.0-slim

ENV SRC_PATH /api

RUN mkdir -p $SRC_PATH
WORKDIR $SRC_PATH

COPY package.json $SRC_PATH

RUN npm install

COPY . $SRC_PATH

RUN npm run build

EXPOSE 3002
EXPOSE 3003
