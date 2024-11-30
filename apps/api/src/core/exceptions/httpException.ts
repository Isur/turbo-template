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
