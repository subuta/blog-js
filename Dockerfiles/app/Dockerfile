FROM node:9.11.1

# ----- Install app
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
