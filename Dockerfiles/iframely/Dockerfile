FROM node:5.8

EXPOSE 8061

RUN mkdir /iframely
WORKDIR /iframely

# Git clone into current dir.
RUN git clone https://github.com/itteco/iframely .

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

ENTRYPOINT ["/iframely/docker/entrypoint.sh"]
