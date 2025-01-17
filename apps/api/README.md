## Installation

```bash
$ pnpm install
```

## Config

Some configs in env file: `.env`.

| Name                 | Description                                                    | Default                                                   |
| -------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| PORT                 | Port to run the app                                            | 3000                                                      |
| ENV_NAME             | Name of the environment                                        | "development"                                             |
| JWT_SECRET           | Secret for JWT                                                 | "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?" |
| JWT_EXPIRES_IN       | Time for JWT to expire                                         | 86400000 (1 day)                                          |
| LOGIN                | Default login                                                  | "John"                                                    |
| PASSWORD             | Default password                                               | "pass1"                                                   |
| SENTRY_HOST          | Sentry host for tunneling the data                             | ""                                                        |
| SENTRY_PROJECTS      | Sentry projects for tunneling the date, "," used for splitting | []                                                        |
| SENTRY_DSN_BACKEND   | Sentry DSN for identifing projects                             | ""                                                        |
| DB_PORT              | Database port                                                  | 5432                                                      |
| DB_HOST              | Database host                                                  | "localhost"                                               |
| DB_USER              | Database user                                                  | "local"                                                   |
| DB_PASSWORD          | Database password                                              | "local"                                                   |
| DB_DATABASE          | Database name                                                  | "template"                                                |
| MIGRATIONS_DIRECTORY | Database migration direcotry                                   | "./drizzle"                                               |
| MAILER               | "Console" or "Sendgrid"                                        | "Console"                                                 |
| SENDGRID_API_KEY     | Sendgrid api key                                               | ""                                                        |
| SENDING_MAIL         | Mail used to sending emails                                    | ""                                                        |

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
