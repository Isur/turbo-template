import { MiddlewareConsumer, Module } from "@nestjs/common";
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from "@willsoto/nestjs-prometheus";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import { AppConfigModule } from "./config/appConfig.module";
import { HealthModule } from "./health/health.module";
import { DbModule } from "./database/db.module";
import { MailerModule } from "./mailer/mailer.module";
import { SentryModule } from "./sentry/sentry.module";
import { MetricsModule } from "./metrics/metrics.module";
import { MetricsController } from "./metrics/metrics.controller";
import { LoggingMiddleware } from "./middlewares/logging.middleware";

@Module({
  imports: [
    AppConfigModule,
    HealthModule,
    DbModule,
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
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
