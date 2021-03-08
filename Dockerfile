FROM node:12 as node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/.

RUN npm i yarn

RUN yarn global add @angular/cli@9.0.3
RUN yarn install

RUN ng build --prod

FROM nginx:alpine

COPY --from=node /usr/src/app/dist/scoreboard /usr/share/nginx/html
COPY --from=node /usr/src/app/.docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
