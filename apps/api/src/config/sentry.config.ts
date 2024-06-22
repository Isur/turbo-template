import { registerAs } from "@nestjs/config";
import { CONFIGKEYS } from "./configKeys";

export interface SentryConfig {
  host: string;
  projects: Array<string>;
}

export default registerAs(
  CONFIGKEYS.SENTRY,
  (): SentryConfig => ({
    host: process.env.SENTRY_HOST || "",
    projects: process.env.SENTRY_PROJECTS.split(",") || [],
  })
);
