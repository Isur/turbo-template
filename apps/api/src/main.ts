import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import * as Sentry from "@sentry/nestjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { AppModule } from "./app.module";
import { CustomHttpExceptionFilter } from "./exceptions/httpException.filter";
import { AppConfigService } from "./config/appConfig.service";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(AppConfigService);
  const config = configService.get("app");
  const sentryConfig = configService.get("sentry");

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const { httpAdapter } = app.get(HttpAdapterHost);

  Sentry.init({
    dsn: sentryConfig.dsn,
    environment: config.env_name ?? "production",
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  app.use(cookieParser());
  app.useBodyParser("text");

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomHttpExceptionFilter());

  app.setGlobalPrefix("api");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/swagger", app, document);

  logger.log(`App running on port ${config.port}`);
  await app.listen(config.port);
}
bootstrap();
