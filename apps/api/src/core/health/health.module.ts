import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { HealthController } from "./health.controller";
import { DrizzleHealthIndicator } from "./drizzle.health";

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [DrizzleHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
