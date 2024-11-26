import { Injectable, Logger } from "@nestjs/common";
import { Client } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DrizzleConfig } from "drizzle-orm";

type Cfg = {
  dbConfig: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    migrationsDirectory: string;
  };
  config: DrizzleConfig<any>;
};

@Injectable()
export class DbService {
  private readonly logger = new Logger(DbService.name);

  public async createConnection({ dbConfig, config }: Cfg) {
    const connection = new Client({
      host: dbConfig.host,
      port: dbConfig.port,
      password: dbConfig.password,
      database: dbConfig.database,
      user: dbConfig.user,
    });

    this.logger.log("Connecting to database");
    await connection.connect();

    const instance = drizzle(connection, config);
    this.logger.log("Connected to database");
    await this.migrateDrizzle(instance, dbConfig.migrationsDirectory);
    return instance;
  }

  private async migrateDrizzle(
    drizzleInstance: NodePgDatabase,
    migrationsFolder: string
  ) {
    this.logger.log("Migrating database");
    await migrate(drizzleInstance, { migrationsFolder });
    this.logger.log("Database migrated");
  }
}
