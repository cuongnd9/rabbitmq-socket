FROM node:12-alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
