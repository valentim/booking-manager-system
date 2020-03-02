FROM node:11.15.0-slim

ENV SRC_PATH /client

RUN mkdir -p $SRC_PATH
WORKDIR $SRC_PATH

COPY package.json $SRC_PATH

RUN yarn install

COPY . $SRC_PATH

RUN yarn build

EXPOSE 3000
EXPOSE 3001
