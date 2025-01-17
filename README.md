# Turborepo starter

Work in progress...

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
