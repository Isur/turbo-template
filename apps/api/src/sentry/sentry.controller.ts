import { Body, Controller, HttpException, Logger, Post } from "@nestjs/common";
import { Public } from "src/auth/auth.public";
import { SentryService } from "./sentry.service";

@Controller("sentry")
export class SentryController {
  private readonly logger = new Logger(SentryController.name);

  constructor(private readonly sentryService: SentryService) {}

  @Public()
  @Post("/tunnel")
  async tunnel(@Body() body: string) {
    try {
      return await this.sentryService.tunnel(body);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException("Failed to tunnel sentry", 500);
    }
  }
}
