export const CONFIGKEYS = {
  APP: "app",
  DB: "db",
  SENTRY: "sentry",
} as const;

export type ConfigKeys = (typeof CONFIGKEYS)[keyof typeof CONFIGKEYS];
