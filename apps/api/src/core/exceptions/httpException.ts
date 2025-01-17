import { HttpException } from "@nestjs/common";

type Fields = Record<string, unknown>;

export class CustomHttpException extends HttpException {
  code: string;
  fields?: Fields;

  constructor(message: string, status: number, code: string, fields?: Fields) {
    super(message, status);
    this.code = code;
    this.fields = fields;
  }
}

export class HttpExceptionRespose {
  constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly message: string,
    public readonly timestamp: string,
    public readonly path: string,
    public readonly method: string,
    public readonly fields?: Fields
  ) {}

  static fromException(
    exception: CustomHttpException,
    url: string,
    method: string
  ) {
    const response = new HttpExceptionRespose(
      exception.getStatus(),
      exception.code,
      exception.message,
      new Date().toISOString(),
      url,
      method,
      exception.fields
    );

    return response;
  }
}
