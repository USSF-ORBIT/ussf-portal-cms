# USSF Portal CMS

## Local Development

### System requirements

- [direnv](https://direnv.net/docs/hook.html)
- [Docker](https://www.docker.com/products/docker-desktop)

To run Keystone locally, you will also need a [Postgres](https://www.postgresql.org/download/) instance running.

You can run one on your machine, or run `yarn services:up` which includes all required services, including Postgres.

### Local environment variables

Set these variables for Keystone in a `.envrc.local` file.

- `SESSION_SECRET` (must be a string at least 32 chars)
- `DATABASE_URL` (URL to a running Postgres instance)
- `TEST_USERNAME` (string)
- `TEST_EMAIL` (string - used to log in to Admin UI)
- `TEST_PASSWORD` (must be a string at least 8 chars - used to log in to Admin UI)
- `PORTAL_PATH` (for local dev only - path to the ussf-portal-client directory on your machine)

Environment variables for Postgres are set in the `docker-compose.services.yml` file ran from `ussf-portal-client` directory.

- POSTGRES_USER: keystone
- POSTGRES_PASSWORD: keystonecms
- POSTGRES_DB: keystone

If running on standard port 5432, this makes the connection url one of the following:

- `postgres://keystone:keystonecms@host.docker.internal:6666/keystone` (connecting from one docker container to another)
- `postgres://keystone:keystonecms@0.0.0.0:5432/keystone` (connecting from host machine)

Caveat: If you're also running Postgres on your local machine, you may run into some port conflicts with the Postgres Docker container. In the docker-compose file, you can map `5432` to an unused port to resolve.

### Keystone App

- Run required services (`yarn services:up`) or required services + Portal (`yarn portal:up`)
- Run Keystone in dev mode (`yarn dev`)

_or_

- Build Keystone Docker image:
  - `docker build -t keystone .`
- Run Docker image:
  - `docker run -p 3000:3000 --env SESSION_SECRET=$SESSION_SECRET --env DATABASE_URL=$DATABASE_URL --env TEST_USERNAME=$TEST_USERNAME --env TEST_EMAIL=$TEST_EMAIL --env TEST_PASSWORD=$TEST_PASSWORD keystone`

### Yarn Scripts

- `yarn services:up`: Starts all required services in Docker
  - Stop containers with `yarn services:down`
- `yarn portal:up`: Starts all required services _and_ NextJS App/Portal in Docker
  - Stop containers with `yarn portal:down`
- `yarn dev`: Starts Keystone in development mode and watches for changed files
