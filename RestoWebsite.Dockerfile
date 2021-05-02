FROM node:15-alpine

RUN apk add --no-cache libc6-compat jq

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

ARG SITE

COPY sites/$SITE/config.json apps/resto-website/config.json
COPY sites/$SITE/.env.local apps/resto-website/.env.local

COPY sites/$SITE/pages/ apps/resto-website/pages/

RUN echo $(jq -sc ".[0] * .[1]" sites/$SITE/locales/en.json apps/resto-website/public/locales/en/common.json) > apps/resto-website/public/locales/en/common.json
RUN echo $(jq -sc ".[0] * .[1]" sites/$SITE/locales/fr.json apps/resto-website/public/locales/fr/common.json) > apps/resto-website/public/locales/fr/common.json

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn run build:resto-website

ENV NODE_ENV production

CMD [ "yarn", "lerna", "run", "start", "--stream", "--scope=@chez-tomio/resto-website" ]
