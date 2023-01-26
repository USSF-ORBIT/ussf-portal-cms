##--------- Stage: builder ---------##
FROM node:18.13.0-slim AS builder


RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends openssl libc6 yarn zlib1g

ADD https://www.openssl.org/source/openssl-3.0.7.tar.gz /usr/local/src/

RUN apt-get install -y build-essential checkinstall zlib1g-dev \
  && cd /usr/local/src/ \
  && tar -xf openssl-3.0.7.tar.gz \
  && cd openssl-3.0.7 \
  && ./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib \
  && make \
  && make install \
  && ln -sf /usr/local/ssl/bin/openssl /usr/bin/openssl \
  && echo /usr/local/ssl/lib* > /etc/ld.so.conf.d/openssl-3.0.7.conf \
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
FROM gcr.io/distroless/nodejs:18 AS e2e
# FROM node:18.13.0-slim AS e2e

# The below image is an arm64 debug image that has helpful binaries for debugging, such as a shell, for local debugging
# FROM gcr.io/distroless/nodejs:16-debug-arm64 AS e2e

WORKDIR /app

COPY --from=builder /app /app

# RUN apt-get update \
#     && apt-get dist-upgrade -y \
#     && apt-get install -y --no-install-recommends openssl libc6 yarn python dumb-init

COPY --from=builder /lib/x86_64-linux-gnu/libz*  /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libexpat*  /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libhistory*  /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libreadline*  /lib/x86_64-linux-gnu/
COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
COPY --from=builder /usr/local/ssl/lib64/*  /lib/x86_64-linux-gnu/

# The below copies are for hosts running on ARM64, such as M1 Macbooks. Uncomment the lines below and comment out the equivalent lines above.
# COPY --from=builder /lib/aarch64-linux-gnu/libz*  /lib/aarch64-linux-gnu/
# COPY --from=builder /lib/aarch64-linux-gnu/libexpat*  /lib/aarch64-linux-gnu/
# COPY --from=builder /lib/aarch64-linux-gnu/libhistory*  /lib/aarch64-linux-gnu/
# COPY --from=builder /lib/aarch64-linux-gnu/libreadline*  /lib/aarch64-linux-gnu/
# COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
# COPY --from=builder /usr/local/ssl/lib/*  /lib/aarch64-linux-gnu/

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /bin/sh  /bin/sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/nodejs/bin/node /app/node_modules/.bin/prisma migrate deploy && /nodejs/bin/node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
# CMD ["bash", "-c", "/app/node_modules/.bin/prisma migrate deploy && node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: e2e-local ---------##
# E2E image for running tests (same as prod but without certs)
FROM node:18.13.0-slim AS e2e-local

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends openssl libc6 yarn python dumb-init

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["bash", "-c", "/app/node_modules/.bin/prisma migrate deploy && node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]

##--------- Stage: build-env ---------##
FROM node:18.13.0-slim AS build-env

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends openssl libc6 ca-certificates python wget unzip dumb-init zlib1g \
  && chmod +x add-rds-cas.sh && sh add-rds-cas.sh

# ADD https://www.openssl.org/source/openssl-3.0.7.tar.gz /usr/local/src/

# RUN apt-get install -y build-essential checkinstall zlib1g-dev \
#   && cd /usr/local/src/ \
#   && tar -xf openssl-3.0.7.tar.gz \
#   && cd openssl-3.0.7 \
#   && ./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib \
#   && make \
#   && make test \
#   && make install

##--------- Stage: runner ---------##
# Runtime container
FROM gcr.io/distroless/nodejs:18 AS runner
# FROM node:18.13.0-slim AS runner

WORKDIR /app

# COPY scripts/add-rds-cas.sh .

# RUN apt-get update \
#     && apt-get dist-upgrade -y \
#     && apt-get install -y --no-install-recommends openssl libc6 ca-certificates python wget unzip dumb-init \
#     && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
#     && rm -rf /var/lib/apt/lists/*

COPY --from=build-env /lib/x86_64-linux-gnu/libz*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libexpat*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libhistory*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libreadline*  /lib/x86_64-linux-gnu/
COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
COPY --from=builder /usr/local/ssl/lib64/*  /lib/x86_64-linux-gnu/

# COPY --from=build-env /lib/aarch64-linux-gnu/libz*  /lib/aarch64-linux-gnu/
# COPY --from=build-env /lib/aarch64-linux-gnu/libexpat*  /lib/aarch64-linux-gnu/
# COPY --from=build-env /lib/aarch64-linux-gnu/libhistory*  /lib/aarch64-linux-gnu/
# COPY --from=build-env /lib/aarch64-linux-gnu/libreadline*  /lib/aarch64-linux-gnu/
# COPY --from=builder /usr/local/ssl/bin/openssl /usr/bin/openssl
# COPY --from=builder /usr/local/ssl/lib/*  /lib/aarch64-linux-gnu/

COPY --from=builder /app /app

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
# CMD node_modules/.bin/keystone prisma migrate deploy ; dumb-init node -r ./startup/index.js node_modules/.bin/keystone start
