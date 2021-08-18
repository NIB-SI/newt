FROM node:fermium

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --legacy-peer-deps

COPY . .
