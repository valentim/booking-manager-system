FROM node:11.15.0-slim

ENV SRC_PATH /client

RUN mkdir -p $SRC_PATH
WORKDIR $SRC_PATH

COPY package.json $SRC_PATH

RUN yarn install

COPY . $SRC_PATH

RUN yarn build

ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000
EXPOSE 3001
