FROM node:10.15.3-alpine

RUN apk add --no-cache bash && \
    npm --user root --unsafe-perm true install npm -g

RUN rm -rf /chocoreddit
COPY . /chocoreddit
WORKDIR /chocoreddit

RUN npm install -g --silent \
    vue-cli && npm i && npm run build --production
