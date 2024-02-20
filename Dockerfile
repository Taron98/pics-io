# syntax = docker/dockerfile:1.3

FROM node:alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package.json file
COPY package*.json ./

# Install app dependencies
#RUN --mount=type=secret,id=npm,target=/root/.npmrc npm install
RUN npm cache clear --force
RUN npm install

# Copying rest of the application to app directory
COPY . .

# Build the application
RUN npm run build

# Expose the port and start the application
EXPOSE 3000

CMD ["npm", "run", "start-prod"]
