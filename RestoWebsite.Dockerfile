FROM node:alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY libs/components-web/package.json libs/components-web/package.json
COPY apps/resto-website/package.json apps/resto-website/package.json

RUN yarn install --frozen

RUN yarn lerna bootstrap

COPY . .

RUN yarn run build:components-web

RUN rm -r libs/components-web/src

RUN yarn run build:resto-website

RUN rm -r apps/resto-website/pages

ENV NODE_ENV production

CMD [ "yarn", "lerna", "run", "start", "--stream", "--scope=@chez-tomio/resto-website" ]
