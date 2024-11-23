import { Injectable } from "@nestjs/common";
import { SentryConfig, loadSentryConfig } from "./configs/sentry";
import { AppConfig, loadAppConfig } from "./configs/app";
import { DatabaseConfig, loadDatabaseConfig } from "./configs/db";

type Config = {
  sentry: SentryConfig;
  app: AppConfig;
  database: DatabaseConfig;
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
    };
  }

  get<T extends keyof Config>(key: T): Config[T] {
    return this.configs[key];
  }
}
