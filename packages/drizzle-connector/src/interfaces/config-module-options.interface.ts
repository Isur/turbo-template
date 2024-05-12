import { DrizzleConfig } from "drizzle-orm";

export interface ConfigModuleOptions {
  dbConfig: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  config?: DrizzleConfig<any> | undefined;
}
