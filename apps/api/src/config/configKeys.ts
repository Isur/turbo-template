export const CONFIGKEYS = {
  APP: "app",
} as const;

export type ConfigKeys = (typeof CONFIGKEYS)[keyof typeof CONFIGKEYS];
