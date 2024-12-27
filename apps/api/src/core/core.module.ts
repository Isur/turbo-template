import { MiddlewareConsumer, Module } from "@nestjs/common";
import {
  makeCounterProvider,
  makeHistogramProvider,
} from "@willsoto/nestjs-prometheus";
import { AppConfigModule } from "./config/appConfig.module";
import { HealthModule } from "./health/health.module";
import { DbModule } from "./database/db.module";
import { MailerModule } from "./mailer/mailer.module";
import { SentryModule } from "./sentry/sentry.module";
import { LoggingMiddleware } from "./middlewares/logging.middleware";

@Module({
  imports: [
    AppConfigModule,
    HealthModule,
    DbModule,
    MailerModule,
    SentryModule,
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
