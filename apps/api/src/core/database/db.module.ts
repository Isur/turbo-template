import { Global, Module } from "@nestjs/common";
import { AppConfigService } from "src/core/config/appConfig.service";
import { DB_TOKEN } from "./database";
import { DbService } from "./db.service";
import * as schema from "./schema";
import { SeedModule } from "./seed/seed.module";
import { SeedService } from "./seed/seed.service";

@Global()
@Module({
  imports: [SeedModule],
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
    SeedService,
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}
