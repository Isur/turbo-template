import { Injectable } from "@nestjs/common";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";

@Injectable()
export class DrizzleService {
  public async getDrizzle({ dbConfig, config }: ConfigModuleOptions) {
    const connection = new Client({
      host: dbConfig.host,
      port: dbConfig.port,
      password: dbConfig.password,
      database: dbConfig.database,
      user: dbConfig.user,
    });

    await connection.connect();

    return drizzle(connection, config);
  }
}
