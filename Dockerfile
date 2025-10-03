FROM node:18-alpine

RUN apk update && \
    apk add --no-cache ca-certificates wget bash

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app

