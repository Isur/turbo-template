## Installation

```bash
$ pnpm install
```

## Config

Some configs in env file: `.env`. This is required during build!

| Name              | Description                           | Default |
| ----------------- | ------------------------------------- | ------- |
| SENTRY_AUTH_TOKEN | Sentry auth token for builds          | ""      |
| SENTRY_RELEASE    | Sentry release name for builds        | ""      |
| SENTRY_ORG        | Sentry organization data              | ""      |
| SENTRY_PROJECT    | Sentry project for tunneling the data | []      |
| VITE_SENTRY_DSN   | Sentry DSN                            | ""      |

## Run

```bash
# development
$ pnpm run dev

# preview
$ pnpm run preview

# build
$ pnpm run build
```

## Checks

```bash
# Linter - check
$ pnpm run lint

# Linter - fix
$ pnpm run lint:fix

# Typecheck
$ pnpm run typececk

# Translation files check
$ pnpm run fjv
```
