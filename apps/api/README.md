## Installation

```bash
$ pnpm install
```

## Config

Some configs in env file: `.env`.

| Name            | Description                                                    | Default |
| --------------- | -------------------------------------------------------------- | ------- |
| PORT            | Port to run the app                                            | 3000    |
| SENTRY_HOST     | Sentry host for tunneling the data                             | ""      |
| SENTRY_PROJECTS | Sentry projects for tunneling the date, "," used for splitting | []      |

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
