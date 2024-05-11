export const CONFIGKEYS = {
  APP: "app",
  DB: "db",
} as const;

export type ConfigKeys = (typeof CONFIGKEYS)[keyof typeof CONFIGKEYS];
