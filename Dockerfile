##--------- Stage: builder ---------##
FROM node:14.20.1-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libc6 yarn

WORKDIR /app

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile

RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: e2e ---------##
# E2E image for running tests (same as prod but without certs)
FROM node:14.20.1-slim AS e2e

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libc6 yarn python dumb-init

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["bash", "-c", "/app/node_modules/.bin/prisma migrate deploy && node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: runner ---------##
# Runtime container
FROM node:14.20.1-slim AS runner

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libc6 ca-certificates python wget unzip dumb-init \
    && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app

ENV NODE_ENV production
ARG BUILD
ENV BUILD_ID $BUILD
ARG CMS_VERSION
ENV VERSION $CMS_VERSION

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD node_modules/.bin/keystone prisma migrate deploy ; dumb-init node -r ./startup/index.js node_modules/.bin/keystone start
