import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomHttpException, HttpExceptionRespose } from "./httpException";

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter
  implements ExceptionFilter<CustomHttpException>
{
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const respo = HttpExceptionRespose.fromException(
      exception,
      request.url,
      request.method
    );
    response.status(status).json(respo);
  }
}
