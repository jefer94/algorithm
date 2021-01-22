FROM node as node
FROM node:alpine
EXPOSE 80

WORKDIR /usr/src

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

COPY . .

RUN yarn build

# FROM nginx
# COPY --from=node /usr/src/build /usr/share/nginx/html
# COPY ./default.conf /etc/nginx/conf.d/
# CMD ["nginx", "-g", "daemon off;"]
