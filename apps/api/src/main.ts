import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationError } from "class-validator";
import { AppModule } from "./app.module";
import { CustomHttpExceptionFilter } from "./core/exceptions/httpException.filter";
import { AppConfigService } from "./core/config/appConfig.service";
import { createLogger } from "./core/logger";
import { CustomHttpException } from "./core/exceptions/httpException";
import { CatchEverythingFilter } from "./core/exceptions/catchEverything.filter";
import "./instrument";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createLogger(),
  });

  const configService = app.get(AppConfigService);
  const config = configService.get("app");

  const httpAdapter = app.get(HttpAdapterHost);

  app.use(cookieParser());
  app.useBodyParser("text");

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: Array<ValidationError>) => {
        const customErr = new CustomHttpException(
          "BadRequest",
          400,
          "BAD_REQUEST",
          {}
        );
        errors.forEach((err) => {
          if (customErr.fields) {
            customErr.fields[err.property] = err.constraints;
          }
        });
        return customErr;
      },
    })
  );

  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
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
