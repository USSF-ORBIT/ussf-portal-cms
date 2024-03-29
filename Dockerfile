##--------- Stage: builder ---------##
# Node image variant name explanations: "bookworm" is the codeword for Debian 12
FROM node:18.19.0-bookworm-slim AS builder

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends dumb-init openssl yarn

WORKDIR /app

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile

RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: e2e ---------##
# E2E image for running tests (same as prod but without certs)
FROM gcr.io/distroless/nodejs18-debian12 AS e2e
# The below image is an arm64 debug image that has helpful binaries for debugging, such as a shell, for local debugging
# FROM gcr.io/distroless/nodejs18-debian12:debug-arm64 AS e2e

WORKDIR /app

COPY --from=builder /app /app

COPY --from=builder /lib/x86_64-linux-gnu/ /lib/x86_64-linux-gnu/
# The below COPY are for hosts running on ARM64, such as M1 Macbooks. Uncomment the lines below and comment out the equivalent line above.
# COPY --from=builder /lib/aarch64-linux-gnu/ /lib/aarch64-linux-gnu/

COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=builder /usr/bin/openssl /usr/bin/openssl

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /bin/sh /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /usr/bin/dumb-init /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: e2e-local ---------##
# E2E image for running tests (same as prod but without certs)
FROM node:18.19.0-bookworm-slim AS e2e-local

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends dumb-init yarn

WORKDIR /app

COPY --from=builder /app /app
COPY --from=builder /usr/bin/openssl /usr/bin/openssl

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["bash", "-c", "/app/node_modules/.bin/prisma migrate deploy && dumb-init node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: build-env ---------##
FROM node:18.19.0-bookworm-slim AS build-env

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends libc6 ca-certificates openssl wget unzip \
  && chmod +x add-rds-cas.sh && sh add-rds-cas.sh

##--------- Stage: runner ---------##
# Runtime container
FROM gcr.io/distroless/nodejs18-debian12 AS runner

WORKDIR /app

COPY --from=builder /lib/x86_64-linux-gnu/ /lib/x86_64-linux-gnu/

COPY --from=builder /usr/bin/openssl /usr/bin/openssl
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init

COPY --from=builder /app /app

ENV NODE_ENV production
ARG BUILD
ENV BUILD_ID $BUILD
ARG CMS_VERSION
ENV VERSION $CMS_VERSION

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=build-env ["/app/rds-combined-ca-bundle.pem", "/app/rds-combined-ca-us-gov-bundle.pem", "/app/us-gov-west-1-bundle.pem", "./"]
COPY --from=build-env /bin/sh /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /usr/bin/dumb-init /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
