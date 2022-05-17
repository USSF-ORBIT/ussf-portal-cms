##--------- Stage: base ---------##
FROM node:14.19.1-slim AS base

WORKDIR /app

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libc6 yarn ca-certificates wget unzip dumb-init \
    && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
    && rm -rf /var/lib/apt/lists/*
#ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
COPY package.json .
COPY yarn.lock .

##--------- Stage: builder ---------##
FROM base as builder

WORKDIR /app

COPY . .

# Install only production deps this time
RUN yarn install --frozen-lockfile && yarn build && yarn install --production --ignore-scripts --prefer-offline && rm -rf node_modules/typescript

# ##--------- Stage: e2e ---------##
# # E2E image for running tests (same as prod but without certs)
# FROM builder AS e2e

# WORKDIR /app

# COPY . .

# ENV NODE_ENV production

# EXPOSE 3001
# ENV NEXT_TELEMETRY_DISABLED 1

# CMD node_modules/.bin/keystone prisma migrate deploy ; dumb-init node -r ./startup/index.js node_modules/.bin/keystone start

##--------- Stage: runner ---------##
# Runtime container
FROM base AS runner

COPY --from=builder /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV production

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/keystone prisma migrate deploy &&", "node -r ./startup/index.js node_modules/.bin/keystone start"]
