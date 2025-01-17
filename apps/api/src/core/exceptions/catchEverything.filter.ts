import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { SentryExceptionCaptured } from "@sentry/nestjs";
import { HttpExceptionRespose } from "./httpException";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception);

    const responseBody = new HttpExceptionRespose(
      httpStatus,
      "UNHANDLED",
      "",
      new Date().toISOString(),
      httpAdapter.getRequestUrl(req),
      httpAdapter.getRequestMethod(req)
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
