export function loadSentryConfig() {
  return {
    host: process.env.SENTRY_HOST || "",
    projects: process.env.SENTRY_PROJECTS?.split(",") || [],
    dsn: process.env.SENTRY_DSN || "",
  };
}
export type SentryConfig = ReturnType<typeof loadSentryConfig>;
