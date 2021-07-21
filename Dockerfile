# syntax=docker/dockerfile:1

FROM node:14.17.3
ENV NODE_ENV=production
ENV HOST '0.0.0.0'

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "bin/www.js" ]
