import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SentryController } from "./sentry.controller";
import { SentryService } from "./sentry.service";

@Module({
  controllers: [SentryController],
  providers: [SentryService, ConfigService],
})
export class SentryModule {}
