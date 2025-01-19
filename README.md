# Turborepo starter

Currently using `nestjs` as backend app and `React` with `vite` as frontend app.

## Features:

### Backend:

- `Nestjs`
- `Sentry`;
- database with `Drizzle`;
- custom exceptions;
- health check;
- mailing with `Sendgrid` and `Console` for dev mode;
- configs system;
- file upload (files storred locally);
- simple auth (based on `.env`);
- `CI/CD` with `Github Actions`

### VPS:

- VPS setup with `Ansible`
- user for app
- uploaded keys
- setted firewall
- installed docker
- installed shell apps
- upload for configs

### Frontend:

- `Vite`
- `React`
- UI with `shadcn/ui` and `Tailwind`
- Routing with `Tanstack Router`
- API with custom api package and `Tanstack Query`
- Protected routes
- `Sentry`
- file upload
- multilanguage
- dark/light mode
- devtools from `Tanstack`

## Workspaces

`./apps` - for all applications - frontend, backend, cli, etc.

`./packages` - for shared packages - api clients, utils, etc.

`./configs` - for shared configs - eslint, typescript, etc.

## Requirements

- `node@22`
- `pnpm@9`
- `postgresql@16` / `docker`

## Env

Use `./pre.sh` script to setup default env. If you want to change something do this in generated `.env.docker` or `.env` files.

Look into readme files in `./apps/api/README.md` and `./apps/front/README.md`

## Docker

There is `Docker` setup. Using `pnpm docker:db` you will run only database in `Docker` (setup correctly `.env` in `./apps/api`).

Using `pnpm docker:full` will run database and backend in `Docker` (setup correctly `.env.docker` in `./`).

`pnpm dev` will run backend and frontend locally.

`pnpm dev:front` will run only frontend with its dependencies.

`pnpm dev:api` will run only backend with its dependencies.

## To start:

```bash
# Install
$ pnpm install

# Run dev
$ pnpm dev
# only front
$ pnpm dev:front
# only api
$ pnpm dev:api

# Run linters/formatters
$ pnpm check:fix

# Docker
$ pnpm docker:db
$ pnpm docker:full

```
