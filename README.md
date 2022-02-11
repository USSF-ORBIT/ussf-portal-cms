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

Environment variables for Postgres are set in the `docker-compose.yml` file. The initial database user created by Postgres will be `postgres` with the password set in the compose file. The database created will be named `keystone`, also set in the compose file.

### Keystone App

- Run your Postgres instance (`docker compose up`)
- Build Keystone Docker image:
  - `docker build -t keystone .`
- Run Docker image:
  - `docker run -p 3000:3000 --env SESSION_SECRET=$SESSION_SECRET --env DATABASE_URL=$DATABASE_URL --env TEST_USERNAME=$TEST_USERNAME --env TEST_EMAIL=$TEST_EMAIL --env TEST_PASSWORD=$TEST_PASSWORD keystone`
