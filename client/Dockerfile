FROM node:11-alpine

WORKDIR /usr/src/ui
 
COPY package.json ./

RUN npm install

COPY ./ /usr/src/ui

EXPOSE 3000

CMD ["npm", "start"]