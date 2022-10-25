##--------- Stage: builder ---------##
FROM node:14.20.1-slim AS builder

RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get install -y --no-install-recommends openssl libc6 yarn

WORKDIR /app

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile

RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: build-env ---------##
FROM node:14.20.1-slim AS build-env

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libc6 yarn python dumb-init zlib1g

##--------- Stage: e2e ---------##
# E2E image for running tests (same as prod but without certs)
# FROM node:14.20.1-slim AS e2e
FROM gcr.io/distroless/nodejs:14 AS e2e
# FROM gcr.io/distroless/nodejs:16-debug-arm64 AS e2e

COPY --from=build-env /lib/x86_64-linux-gnu/libz*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libexpat*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libhistory*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libreadline*  /lib/x86_64-linux-gnu/

# COPY --from=build-env /lib/aarch64-linux-gnu/libz*  /lib/aarch64-linux-gnu/
# COPY --from=build-env /lib/aarch64-linux-gnu/libexpat*  /lib/aarch64-linux-gnu/
# COPY --from=build-env /lib/aarch64-linux-gnu/libhistory*  /lib/aarch64-linux-gnu/
# COPY --from=build-env /lib/aarch64-linux-gnu/libreadline*  /lib/aarch64-linux-gnu/

# COPY --from=build-env /usr/lib/aarch64-linux-gnu/libcrypto*  /usr/lib/aarch64-linux-gnu/
# COPY --from=build-env /usr/lib/aarch64-linux-gnu/libssl*  /usr/lib/aarch64-linux-gnu/
# COPY --from=build-env /usr/bin/openssl  /usr/bin/openssl

# COPY --from=build-env /usr/bin/ldd /usr/bin/ldd

# RUN apt-get update \
#     && apt-get install -y --no-install-recommends openssl


WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["/nodejs/bin/node", "/app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
# CMD ["node", "/app/node_modules/.bin/prisma migrate deploy"]
# CMD ["/app/node_modules/.bin/prisma", "migrate", "deploy", ";", "/app/node_modules/.bin/keystone", "start"]
# ENTRYPOINT ["/usr/bin/dumb-init", "--"]
COPY --from=build-env /bin/sh  /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start" ]
# CMD ["&& /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
# CMD ["/nodejs/bin/node", "/app/node_modules/.bin/prisma", "migrate", "deploy", "&& /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

# CMD ["-r", "./startup/deploy.js", "-r". "./startup/index.js", "node_modules/.bin/keystone", "start"]

##--------- Stage: runner ---------##
# Runtime container
FROM node:14.20.1-slim AS runner

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
    && apt-get dist-upgrade -y \
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

ENTRYPOINT [ "/usr/local/bin/node" ]
# CMD node_modules/.bin/keystone prisma migrate deploy ; dumb-init node -r ./startup/index.js node_modules/.bin/keystone start
CMD ["-r", "./startup/deploy.js", "-r". "/app/startup/index.js", "/app/node_modules/.bin/keystone", "start"]
