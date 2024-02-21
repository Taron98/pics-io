
FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clear --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
