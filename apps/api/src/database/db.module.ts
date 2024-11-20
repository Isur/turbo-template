import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIGKEYS, DbConfig } from "src/config";
import { DB_TOKEN } from "./database";
import { DbService } from "./db.service";
import * as schema from "./schema";

@Global()
@Module({
  providers: [
    DbService,
    {
      provide: DB_TOKEN,
      inject: [ConfigService, DbService],
      useFactory: async (
        configService: ConfigService,
        dbService: DbService
      ) => {
        const dbConfig = configService.get<DbConfig>(CONFIGKEYS.DB);

        return await dbService.createConnection({
          dbConfig,
          config: { schema },
        });
      },
    },
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}
