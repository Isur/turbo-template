import { Injectable, Logger } from "@nestjs/common";
import { Client } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";
import { migrate } from "drizzle-orm/node-postgres/migrator";

@Injectable()
export class DrizzleService {
  private readonly logger = new Logger(DrizzleService.name);

  public async getDrizzle({ dbConfig, config }: ConfigModuleOptions) {
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
    await this.migrateDrizzle(instance, dbConfig.migrationsFolder);
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
