FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN ["yarn"]

COPY . .

ENV PORT=3002

EXPOSE 3002

CMD [ "yarn", "start" ]