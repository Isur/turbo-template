import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DrizzleModule } from "@repo/drizzle-connector";
import { HealthModule } from "./health/health.module";
import { TodosModule } from "./todos/todos.module";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { CONFIGKEYS, DbConfig } from "./config";
import { DB_TOKEN, schema } from "./database";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [
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
      tag: DB_TOKEN,
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DbConfig>(CONFIGKEYS.DB);
        return {
          dbConfig: {
            host: dbConfig.host,
            port: dbConfig.port,
            password: dbConfig.password,
            user: dbConfig.user,
            database: dbConfig.database,
            migrationsFolder: "./drizzle",
          },
          config: { schema },
        };
      },
    }),
    SeedModule,
    AuthModule,
    UsersModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
