FROM node:15-alpine

RUN apk add --no-cache libc6-compat jq

WORKDIR /app

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY libs/components-web/package.json libs/components-web/package.json
COPY apps/resto-website/package.json apps/resto-website/package.json
RUN ["yarn", "install", "--frozen"]
RUN ["yarn", "lerna", "bootstrap"]

COPY . .
RUN ["yarn", "run", "build:components-web"]

ARG SITE

RUN echo $(jq -sc ".[0] * .[1]" sites/$SITE/config/locales/en/common.json apps/resto-website/config/locales/en/common.json) > sites/$SITE/config/locales/en/common.json
RUN echo $(jq -sc ".[0] * .[1]" sites/$SITE/config/locales/fr/common.json apps/resto-website/config/locales/fr/common.json) > sites/$SITE/config/locales/fr/common.json

COPY sites/$SITE/config apps/resto-website/config
COPY sites/$SITE/.env.local apps/resto-website/.env.local
COPY sites/$SITE/pages/ apps/resto-website/pages/
COPY sites/$SITE/public/ apps/resto-website/public/

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn run build:resto-website

ENV NODE_ENV production

CMD [ "yarn", "lerna", "run", "start", "--stream", "--scope=@chez-tomio/resto-website" ]
