##--------- Stage: builder ---------##
# Node image variant name explanations: "bullseye" is the codeword for Debian 11, and "slim" only contains the minimal packages needed to run Node
FROM node:18.13.0-bullseye-slim AS builder

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends libc6 yarn zlib1g

ADD https://www.openssl.org/source/openssl-3.0.7.tar.gz /usr/local/src/

RUN echo "83049d042a260e696f62406ac5c08bf706fd84383f945cf21bd61e9ed95c396e /usr/local/src/openssl-3.0.7.tar.gz" | sha256sum --check --status

RUN apt-get install -y build-essential checkinstall zlib1g-dev \
  && cd /usr/local/src/ \
  && tar -xf openssl-3.0.7.tar.gz \
  && cd openssl-3.0.7 \
  && ./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib \
  && make \
  && make install \
  && ln -sf /usr/local/ssl/bin/openssl /usr/bin/openssl \
  && cp -v -r --preserve=links /usr/local/ssl/lib*/* /lib/*-linux-*/ \
  && ldconfig -v

WORKDIR /app

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile

RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: e2e ---------##
# E2E image for running tests (same as prod but without certs)
FROM gcr.io/distroless/nodejs18-debian11 AS e2e
# The below image is an arm64 debug image that has helpful binaries for debugging, such as a shell, for local debugging
# FROM gcr.io/distroless/nodejs18-debian11:debug-arm64 AS e2e

WORKDIR /app

COPY --from=builder /app /app

COPY --from=builder /lib/x86_64-linux-gnu/ /lib/x86_64-linux-gnu/
# The below COPY are for hosts running on ARM64, such as M1 Macbooks. Uncomment the lines below and comment out the equivalent line above.
# COPY --from=builder /lib/aarch64-linux-gnu/ /lib/aarch64-linux-gnu/

COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
COPY --from=builder /usr/local/ssl /usr/local/ssl

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /bin/sh /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: e2e-local ---------##
# E2E image for running tests (same as prod but without certs)
FROM node:18.13.0-bullseye-slim AS e2e-local

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends libc6 yarn zlib1g

WORKDIR /app

COPY --from=builder /app /app

COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
COPY --from=builder /usr/local/ssl /usr/local/ssl
RUN cp -v -r --preserve=links /usr/local/ssl/lib*/* /lib/*-linux-*/

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["bash", "-c", "/app/node_modules/.bin/prisma migrate deploy && node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: build-env ---------##
FROM node:18.13.0-bullseye-slim AS build-env

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends openssl libc6 ca-certificates python wget unzip dumb-init zlib1g \
  && chmod +x add-rds-cas.sh && sh add-rds-cas.sh

##--------- Stage: runner ---------##
# Runtime container
FROM gcr.io/distroless/nodejs18-debian11 AS runner

WORKDIR /app

COPY scripts/add-rds-cas.sh .

COPY --from=builder /lib/x86_64-linux-gnu/ /lib/x86_64-linux-gnu/
COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
COPY --from=builder /usr/local/ssl /usr/local/ssl

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
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
