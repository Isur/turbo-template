export function loadSentryConfig() {
  return {
    host: process.env.SENTRY_HOST || "",
    projects: process.env.SENTRY_PROJECTS?.split(",") || [],
    dsn: process.env.SENTRY_DSN || "",
    dsnBackend: process.env.SENTRY_DSN_BACKEND || "",
  };
}
export type SentryConfig = ReturnType<typeof loadSentryConfig>;
