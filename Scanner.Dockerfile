FROM node:15-alpine

WORKDIR /app

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY libs/components-web/package.json libs/components-web/package.json
COPY apps/scanner/package.json apps/scanner/package.json
RUN ["yarn", "install", "--frozen"]
RUN ["yarn", "lerna", "bootstrap"]

COPY . .
RUN ["yarn", "run", "build:components-web"]

RUN ["yarn", "run", "build:scanner"]

CMD [ "yarn", "lerna", "run", "start", "--stream", "--scope=@chez-tomio/scanner" ]
