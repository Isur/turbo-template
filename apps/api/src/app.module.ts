import { MiddlewareConsumer, Module } from "@nestjs/common";
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from "@willsoto/nestjs-prometheus";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import { HealthModule } from "./health/health.module";
import { TodosModule } from "./todos/todos.module";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MailerModule } from "./mailer/mailer.module";
import { SentryModule } from "./sentry/sentry.module";
import { MetricsModule } from "./metrics/metrics.module";
import { MetricsController } from "./metrics/metrics.controller";
import { LoggingMiddleware } from "./middlewares/logging.middleware";
import { DbModule } from "./database/db.module";
import { AppConfigModule } from "./config/appConfig.module";

@Module({
  imports: [
    AppConfigModule,
    HealthModule,
    TodosModule,
    DbModule,
    SeedModule,
    AuthModule,
    UsersModule,
    MailerModule,
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
