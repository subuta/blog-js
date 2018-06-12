FROM node:9.11.1

RUN apt-get update -qq && apt-get install -y build-essential curl zip gettext

# ----- Install app
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

ADD .env-sample /app/.env-template

# receive and Embed ENV from `--build-args`
ARG POSTGRES_USER="postgres"
ARG POSTGRES_PASSWORD="password"
ARG POSTGRES_DB="blog-js-development"
ARG REDIS_PASSWORD="password"
ARG S3_ENDPOINT
ARG S3_BUCKET="xxx"
ARG IFRAMELY_ENDPOINT=http://localhost:8061
ARG AUTH0_API_IDENTIFIER=xxx.auth0.com
ARG AUTH0_CLIENT_ID=xxx
ARG AUTH0_AUDIENCE=xxx
ARG BASE_URL=xxx
ARG FB_APP_ID=xxx
ARG TWITTER_SITE=xxx
ARG GOOGLE_MAPS_API_KEY=xxx
ARG AWS_ACCESS_KEY_ID=DUMMY_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY=DUMMY_SECRET_KEY
ARG SEGMENT_WRITE_KEY

# update .env
RUN envsubst < /app/.env-template > /app/.env

# put all files into container(including `.env` if exists.)
COPY . .

RUN npm run build

EXPOSE 3000
