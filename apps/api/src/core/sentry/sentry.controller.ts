import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
} from "@nestjs/common";
import { Public } from "src/modules/auth/auth.public";
import { ApiTags } from "@nestjs/swagger";
import { CustomHttpException } from "../exceptions/httpException";
import { SentryService } from "./sentry.service";

@ApiTags("monitoring")
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

  @Public()
  @Get("/debug-sentry")
  async getError() {
    throw new Error("Standard error");
  }

  @Public()
  @Get("/debug-sentry-custom")
  async getCustomError() {
    throw new CustomHttpException(
      "Custom http error test",
      400,
      "SENTRY.CUSTOM",
      {
        example: "example field",
        code: 1234,
      }
    );
  }
}
