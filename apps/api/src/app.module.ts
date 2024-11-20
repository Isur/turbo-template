import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from "@willsoto/nestjs-prometheus";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import { HealthModule } from "./health/health.module";
import { TodosModule } from "./todos/todos.module";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MailModule } from "./mail/mail.module";
import { SentryModule } from "./sentry/sentry.module";
import { MetricsModule } from "./metrics/metrics.module";
import sentryConfig from "./config/sentry.config";
import { MetricsController } from "./metrics/metrics.controller";
import { LoggingMiddleware } from "./middlewares/logging.middleware";
import { DbModule } from "./database/db.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, sentryConfig],
      cache: true,
      expandVariables: true,
    }),
    HealthModule,
    TodosModule,
    DbModule,
    SeedModule,
    AuthModule,
    UsersModule,
    MailModule,
    SentryModule,
    MetricsModule,
    PrometheusModule.register({
      global: true,
      controller: MetricsController,
    }),
    WinstonModule.forRootAsync({
      inject: [],
      useFactory: async () => {
        const transports = [
          new winston.transports.Console({
            format: winston.format.combine(winston.format.json()),
          }),
          new winston.transports.File({
            filename: "logs/logs.log",
            level: "info",
          }),
        ];
        return {
          transports,
        };
      },
    }),
  ],
  controllers: [],
  providers: [
    makeCounterProvider({
      name: "http_counter",
      help: "Http counter",
      labelNames: ["method", "originalUrl", "statusCode"],
    }),
    makeHistogramProvider({
      name: "http_histogram",
      help: "How much time per request",
      labelNames: ["method", "originalUrl", "statusCode"],
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
