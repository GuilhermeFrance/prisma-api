FROM node:lts-alpine

RUN apk update && \
    apk add --no-cache ca-certificates wget bash

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app

