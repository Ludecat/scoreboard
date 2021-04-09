FROM nginx:alpine

COPY ./dist /usr/share/nginx/html
COPY /usr/src/app/.docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
