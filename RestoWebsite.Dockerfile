FROM node:15

WORKDIR /app

COPY package.json .
COPY libs/components-web/package.json libs/components-web/package.json
COPY apps/resto-website/package.json apps/resto-website/package.json

RUN yarn

RUN yarn lerna bootstrap

COPY . .

RUN yarn lerna build:components-web

RUN yarn lerna build:resto-website

# ENV PORT=

# EXPOSE 2903

# CMD [ "yarn", "start" ]
