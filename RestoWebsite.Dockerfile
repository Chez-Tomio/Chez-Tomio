# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat jq
WORKDIR /app
COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY libs/components-web/package.json libs/components-web/package.json
COPY apps/resto-website/package.json apps/resto-website/package.json
RUN yarn install --frozen --silent
RUN yarn lerna bootstrap

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/apps/resto-website/node_modules ./apps/resto-website/node_modules
COPY --from=deps /app/node_modules ./node_modules
ARG SITE
RUN echo $(jq -sc ".[0] * .[1]" sites/$SITE/config/locales/en/common.json apps/resto-website/config/locales/en/common.json) > sites/$SITE/config/locales/en/common.json
RUN echo $(jq -sc ".[0] * .[1]" sites/$SITE/config/locales/fr/common.json apps/resto-website/config/locales/fr/common.json) > sites/$SITE/config/locales/fr/common.json
COPY sites/$SITE/config apps/resto-website/config
COPY sites/$SITE/.env.local apps/resto-website/.env.local
COPY sites/$SITE/pages/ apps/resto-website/pages/
COPY sites/$SITE/public/ apps/resto-website/public/
RUN yarn install --ignore-scripts --prefer-offline
RUN yarn run build:components-web
RUN yarn run build:resto-website

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/apps/resto-website/next.config.js ./
COPY --from=builder /app/apps/resto-website/public ./public
COPY --from=builder /app/apps/resto-website/config ./config
COPY --from=builder /app/apps/resto-website/.env.local ./.env.local
COPY --from=builder /app/apps/resto-website/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/apps/resto-website/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/resto-website/package.json ./package.json

USER nextjs

ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "yarn", "start" ]
