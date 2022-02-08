# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.5

# Build container
FROM node:14-alpine3.15 AS build
ARG DUMB_INIT_VERSION

WORKDIR /home/node

RUN apk add --no-cache build-base python2 yarn && \
    wget -O dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_x86_64 && \
    chmod +x dumb-init

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile && yarn build && yarn cache clean

ARG BUILD

# Runtime container
FROM node:14-alpine3.15

WORKDIR /home/node

COPY --from=build /home/node /home/node

ENV NODE_ENV production

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["./dumb-init", "yarn", "start"]
