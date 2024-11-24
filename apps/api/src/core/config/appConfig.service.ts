import { Injectable } from "@nestjs/common";
import { SentryConfig, loadSentryConfig } from "./configs/sentry";
import { AppConfig, loadAppConfig } from "./configs/app";
import { DatabaseConfig, loadDatabaseConfig } from "./configs/db";
import { AuthConfig, loadAuthConfig } from "./configs/auth";
import { loadMailerConfig, MailerConfig } from "./configs/mailer";

type Config = {
  sentry: SentryConfig;
  app: AppConfig;
  database: DatabaseConfig;
  mailer: MailerConfig;
  auth: AuthConfig;
};

@Injectable()
export class AppConfigService {
  configs: Config;

  public sentry: SentryConfig;

  constructor() {
    this.configs = {
      sentry: loadSentryConfig(),
      app: loadAppConfig(),
      database: loadDatabaseConfig(),
      mailer: loadMailerConfig(),
      auth: loadAuthConfig(),
    };
  }

  get<T extends keyof Config>(key: T): Config[T] {
    return this.configs[key];
  }
}
