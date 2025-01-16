import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception);

    const responseBody = {
      status: httpStatus,
      code: "UNHANDLED",
      message: "",
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(req),
      method: httpAdapter.getRequestMethod(req),
      fields: {},
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
