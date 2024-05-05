import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { AppConfig } from "./config/app.config";
import { CONFIGKEYS } from "./config/configKeys";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const config = configService.get<AppConfig>(CONFIGKEYS.APP);

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
