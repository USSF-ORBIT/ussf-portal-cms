# USSF Portal CMS

## Local Development

### System requirements

- [direnv](https://direnv.net/docs/hook.html)
- [Docker](https://www.docker.com/products/docker-desktop)

To run Keystone outside, you will also need a [Postgres](https://www.postgresql.org/download/) instance running. You can run one on your machine, or run `yarn services:up` which starts all required services in Docker, including Postgres.

### Environment variables

Set these variables for Keystone in a `.envrc.local` file (only needed for local development):

- `PORTAL_PATH` (path to the `ussf-portal-client` directory on your machine, used for running the portal app service in Docker)

These env variables are already set in `.envrc` and only need to be added to your local file if you want to override the defaults:

- `SESSION_SECRET` - must be a string at least 32 chars, must be the same value set in the Portal application
- `SESSION_DOMAIN` - the domain used for both the Portal app & CMS apps, must be the same value set in the Portal application
- `DATABASE_URL` - URL to the running Postgres instance used for the CMS database
- `PORTAL_URL` - URL to the running Portal application
- `REDIS_URL` - URL to the running Redis instance, used by both CMS & Portal applications for storing sessions

#### Adding new environment variables

> If you need to add a new environment variable used in the application, make sure to add it in the following places:
>
> - `.envrc` - Use this to document what the variable is, and set a default value for local development
> - `README.md` (this file) - Add to the list above & document what the variable is
> - `startup/index.js` - Add to the `requireVars` array in this file in order to require this variable is set on startup of the app.

Environment variables for Postgres are set in the `docker-compose.services.yml` file ran from `ussf-portal-client` directory.

- `POSTGRES_USER: keystone`
- `POSTGRES_PASSWORD: keystonecms`
- `POSTGRES_DB: keystone`

If running on standard port 5432, this makes the connection url one of the following:

- `postgres://keystone:keystonecms@host.docker.internal:6666/keystone?connect_timeout=10` (connecting from one docker container to another)
- `postgres://keystone:keystonecms@0.0.0.0:5432/keystone?connect_timeout=10` (connecting from host machine)

Caveat: If you're also running Postgres on your local machine, you may run into some port conflicts with the Postgres Docker container. In the docker-compose file, you can map `5432` to an unused port to resolve.

### Keystone App

- Run required services (`yarn services:up`) or required services + Portal (`yarn portal:up`)
- Run Keystone in dev mode (`yarn dev`)

_or_

- Build Keystone Docker image:
  - `docker build -t keystone .`
- Run Docker image:
  - `docker run -p 3000:3000 --env SESSION_SECRET=$SESSION_SECRET --env DATABASE_URL=$DATABASE_URL keystone`

### Yarn Scripts

- `yarn services:up`: Starts all required services in Docker
  - Stop containers with `yarn services:down`
- `yarn portal:up`: Starts all required services _and_ NextJS App/Portal in Docker
  - Stop containers with `yarn portal:down`
- `yarn dev`: Starts Keystone in development mode and watches for changed files
- `yarn test`: Run Jest unit tests.
  - Run in watch mode with `yarn test:watch`
- `yarn e2e:test`: Run Playwright E2E tests
  - You have to first run `yarn e2e:install` to install Playwright & E2E dependencies
  - This runs the tests in a headless browser by default. You can also run `yarn e2e:test --headed` to run in a headed browser.
  - To debug tests, run `yarn e2e:debug`. This will automatically pause the tests and you can step through them using the Playwright debugger.
