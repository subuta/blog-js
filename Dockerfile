FROM node:6.12-alpine
ENV LANG C.UTF-8

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package.json* $APP_HOME/

RUN npm install

# SEE: https://github.com/dockersamples/example-voting-app/blob/7629961971ab5ca9fdfeadff52e7127bd73684a5/result-app/Dockerfile#L8
RUN mv /app/node_modules /node_modules
ENV PATH $PATH:/node_modules/.bin

ADD . $APP_HOME
