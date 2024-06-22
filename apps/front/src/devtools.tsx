import React from "react";

import * as Sentry from "@sentry/react";

process.env.NODE_ENV === "production" &&
  Sentry.init({
    dsn: "https://1b02df46d2e9e707dc2950d7a24bab29@o4507460359553024.ingest.de.sentry.io/4507460364861520",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    environment: "production",
    tunnel: "/api/sentry/tunnel",
    tracesSampleRate: 1.0,
    tracePropagationTargets: [/^\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );
const TanstackQueryDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        }))
      );

export { TanStackRouterDevtools, TanstackQueryDevtools };
