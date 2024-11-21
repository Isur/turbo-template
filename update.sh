#!/bin/bash

# Update Everything
pnpm update

(cd ./apps/api; pnpm update)
(cd ./apps/front; pnpm update)
(cd ./packages/api-client; pnpm update)
(cd ./packages/hello-world-package; pnpm update)
