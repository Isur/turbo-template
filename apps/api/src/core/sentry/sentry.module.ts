import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SentryModule as SentryNestModule } from "@sentry/nestjs/setup";
import { SentryController } from "./sentry.controller";
import { SentryService } from "./sentry.service";

@Module({
  imports: [SentryNestModule.forRoot()],
  controllers: [SentryController],
  providers: [SentryService, ConfigService],
})
export class SentryModule {}
