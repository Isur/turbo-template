import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DrizzleModule } from "@repo/drizzle-connector";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import LokiTransport from "winston-loki";
import { HealthModule } from "./health/health.module";
import { TodosModule } from "./todos/todos.module";
import appConfig, { AppConfig } from "./config/app.config";
import dbConfig from "./config/db.config";
import { CONFIGKEYS, DbConfig, LokiConfig } from "./config";
import { DB_TOKEN, schema } from "./database";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MailModule } from "./mail/mail.module";
import { SentryModule } from "./sentry/sentry.module";
import { MetricsModule } from "./metrics/metrics.module";
import sentryConfig from "./config/sentry.config";
import { MetricsController } from "./metrics/metrics.controller";
import { LoggingMiddleware } from "./middlewares/logging.middleware";
import lokiConfig from "./config/loki.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, sentryConfig, lokiConfig],
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
    SentryModule,
    MetricsModule,
    PrometheusModule.register({
      controller: MetricsController,
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { lokiUrl, lokiPass, lokiJobName } =
          configService.get<LokiConfig>(CONFIGKEYS.LOKI);
        const { env_name } = configService.get<AppConfig>(CONFIGKEYS.APP);
        const transports: Array<any> = [
          new winston.transports.Console({
            format: winston.format.combine(winston.format.json()),
          }),
        ];

        if (lokiUrl && lokiPass) {
          transports.push(
            new LokiTransport({
              host: lokiUrl,
              basicAuth: lokiPass,
              labels: {
                job: lokiJobName,
                envname: env_name,
              },
              json: true,
              format: winston.format.json(),
            })
          );
        }
        return {
          transports,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
