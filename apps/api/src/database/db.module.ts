import { Global, Module } from "@nestjs/common";
import { DB_TOKEN } from "./database";
import { DbService } from "./db.service";
import * as schema from "./schema";
import { AppConfigService } from "src/config/appConfig.service";

@Global()
@Module({
  providers: [
    DbService,
    {
      provide: DB_TOKEN,
      inject: [AppConfigService, DbService],
      useFactory: async (
        configService: AppConfigService,
        dbService: DbService
      ) => {
        const dbConfig = configService.get("database");

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
