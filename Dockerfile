# Build container
FROM node:14.19.0-slim AS build


WORKDIR /home/node

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libc6 openssl python yarn dumb-init

COPY . .

ENV NODE_ENV development

RUN yarn install --frozen-lockfile \
    && yarn build && yarn cache clean

ARG BUILD

# Runtime container
FROM build AS runner

WORKDIR /home/node

COPY scripts/add-rds-cas.sh .

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates wget unzip \
    && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /home/node /home/node

ENV NODE_ENV production


EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD node_modules/.bin/keystone prisma migrate deploy ; dumb-init node_modules/.bin/keystone start