# USSF Portal CMS

## Local Development

### System requirements

- [direnv](https://direnv.net/docs/hook.html)
- [Docker](https://www.docker.com/products/docker-desktop)

To run Keystone locally, you will also need a [Postgres](https://www.postgresql.org/download/) instance running.

You can run one on your machine, or use the included `docker-compose.yml` file to spin one up in a container.

```
$ docker compose up
```

### Local environment variables

Set these variables for Keystone in a `.envrc.local` file.

- `SESSION_SECRET` (must be a string at least 32 chars)
- `DATABASE_URL` (URL to a running Postgres instance)
- `TEST_USERNAME` (string)
- `TEST_EMAIL` (string - used to log in to Admin UI)
- `TEST_PASSWORD` (must be a string at least 8 chars - used to log in to Admin UI)

Environment variables for Postgres are set in the `docker-compose.yml` file.

- POSTGRES_USER: keystone
- POSTGRES_PASSWORD: keystonecms
- POSTGRES_DB: keystone

If running on standard port 5432, this makes the connection url one of the following:

- `postgres://keystone:keystonecms@host.docker.internal:6666/keystone` (connecting from one docker container to another)
- `postgres://keystone:keystonecms@0.0.0.0:5432/keystone` (connecting from host machine)

Caveat: If you're also running Postgres on your local machine, you may run into some port conflicts with the Postgres Docker container. In the docker-compose file, you can map `5432` to an unused port to resolve.

### Keystone App

- Run your Postgres instance (`docker compose up`)
- Build Keystone Docker image:
  - `docker build -t keystone .`
- Run Docker image:
  - `docker run -p 3000:3000 --env SESSION_SECRET=$SESSION_SECRET --env DATABASE_URL=$DATABASE_URL --env TEST_USERNAME=$TEST_USERNAME --env TEST_EMAIL=$TEST_EMAIL --env TEST_PASSWORD=$TEST_PASSWORD keystone`
