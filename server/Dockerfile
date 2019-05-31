FROM node:11-alpine

WORKDIR /usr/src/server

COPY package.json ./

RUN npm install

COPY ./ /usr/src/server

EXPOSE 4500

CMD ["node", "server.js"]