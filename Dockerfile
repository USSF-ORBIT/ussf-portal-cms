##--------- Stage: base ---------##
FROM node:14.19.1-slim AS base

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get install -y --no-install-recommends openssl libc6 yarn ca-certificates wget unzip dumb-init \
    && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
    && apt-get remove -y wget unzip \
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    && rm -rf /var/lib/apt/lists/*
ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
COPY package.json .
COPY yarn.lock .

##--------- Stage: builder ---------##
FROM base as builder

WORKDIR /app

COPY . .

# Install only production deps this time
RUN yarn install --frozen-lockfile && yarn build && yarn install --production --ignore-scripts --prefer-offline


# ##--------- Stage: e2e ---------##
# # E2E image for running tests (same as prod but without certs)
FROM builder AS e2e

WORKDIR /app

COPY . .

ENV NODE_ENV production

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED 1

CMD node_modules/.bin/keystone prisma migrate deploy ; dumb-init node -r ./startup/index.js node_modules/.bin/keystone start

##--------- Stage: runner ---------##
# Runtime container
FROM base AS runner

# Copy files needed for startup
COPY ./startup ./startup
COPY ./migrations ./migrations

COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/schema.prisma ./schema.prisma

ENV NODE_ENV production

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["bash", "-c", "/app/node_modules/.bin/prisma migrate deploy && node -r /app/startup/index.js /app/node_modules/.bin/keystone start"]
