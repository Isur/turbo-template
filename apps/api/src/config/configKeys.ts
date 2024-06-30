export const CONFIGKEYS = {
  APP: "app",
  DB: "db",
  SENTRY: "sentry",
  LOKI: "loki",
} as const;

export type ConfigKeys = (typeof CONFIGKEYS)[keyof typeof CONFIGKEYS];
