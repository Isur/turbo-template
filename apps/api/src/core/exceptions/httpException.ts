import { HttpException } from "@nestjs/common";

export class CustomHttpException extends HttpException {
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message, status);
    this.code = code;
  }
}
