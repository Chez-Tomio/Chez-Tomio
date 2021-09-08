FROM node:15-alpine as build
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

FROM nginx:stable-alpine
COPY --from=build apps/scanner/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
