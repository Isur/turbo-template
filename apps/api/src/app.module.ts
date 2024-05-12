import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { TodosModule } from "./todos/todos.module";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { DbConfig, CONFIGKEYS } from "./config";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { schema } from "./drizzle";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "front", "dist"),
      exclude: ["/api/(.*)"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      cache: true,
      expandVariables: true,
    }),
    HealthModule,
    TodosModule,
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      tag: "MyDrizzleConnection",
      isGlobal: false,
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DbConfig>(CONFIGKEYS.DB);
        return {
          dbConfig: {
            host: dbConfig.host,
            port: dbConfig.port,
            password: dbConfig.password,
            user: dbConfig.user,
            database: dbConfig.database,
          },
          config: { schema },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
