FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN pnpm add -g turbo@2
COPY . .
RUN turbo prune --scope=api --docker


FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=api &&\
  find . -name "node_modules" -type d -prune -exec rm -rf '{}' + &&\
  pnpm install --prod

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=installer /app .
WORKDIR /app/apps/api
EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]
