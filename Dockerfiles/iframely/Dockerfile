FROM node:8.4

EXPOSE 8061

RUN mkdir /iframely
WORKDIR /iframely

# Git clone into current dir.
RUN git clone https://github.com/itteco/iframely .

# Lock version to v1.2.5
RUN git checkout tags/v1.2.5 -b v1.2.5

# Add config to local.
ADD config.local.js .
# Override redis connection.
# ADD custom-redis.js /iframely/lib/cache-engines/redis.js

RUN DEPS="libkrb5-dev" \
    apt-get update && \
    apt-get install -q -y --no-install-recommends $DEPS && \
    npm install -g forever && \
    npm install && \
    apt-get purge -y --auto-remove $DEPS && \
    apt-get autoremove && \
    apt-get clean

# receive and Embed ENV from `--build-args`
ARG GOOGLE_MAPS_API_KEY=xxx
ENV GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY

ARG APP_DOMAIN
ENV APP_DOMAIN=$APP_DOMAIN

ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL

ENTRYPOINT ["/iframely/docker/entrypoint.sh"]
