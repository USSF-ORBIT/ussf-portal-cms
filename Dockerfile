##--------- Stage: builder ---------##
FROM node:14.20.1-slim AS builder

RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get install -y --no-install-recommends openssl libc6 yarn zlib1g

WORKDIR /app

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile

RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: e2e ---------##
# E2E image for running tests (same as prod but without certs)
FROM gcr.io/distroless/nodejs:14 AS e2e

WORKDIR /app

COPY --from=builder /app /app

COPY --from=builder /lib/x86_64-linux-gnu/libz*  /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libexpat*  /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libhistory*  /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libreadline*  /lib/x86_64-linux-gnu/

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /bin/sh  /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]


##--------- Stage: build-env ---------##
FROM node:14.20.1-slim AS build-env

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get install -y --no-install-recommends openssl libc6 ca-certificates python wget unzip dumb-init zlib1g \
    && chmod +x add-rds-cas.sh && sh add-rds-cas.sh

##--------- Stage: runner ---------##
# Runtime container
FROM gcr.io/distroless/nodejs:14 AS runner

WORKDIR /app

COPY --from=builder /app /app

COPY --from=build-env /lib/x86_64-linux-gnu/libz*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libexpat*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libhistory*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libreadline*  /lib/x86_64-linux-gnu/

ENV NODE_ENV production
ARG BUILD
ENV BUILD_ID $BUILD
ARG CMS_VERSION
ENV VERSION $CMS_VERSION

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=build-env  ["/app/rds-combined-ca-bundle.pem", "/app/rds-combined-ca-us-gov-bundle.pem", "/app/us-gov-west-1-bundle.pem", "./"]
COPY --from=build-env /bin/sh  /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
