import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");
  use(req: Request, res: Response, next: () => void) {
    const startAt = process.hrtime();
    const { method, originalUrl } = req;

    res.on("finish", () => {
      const { statusCode, statusMessage } = res;
      const diff = process.hrtime(startAt);
      const durationInMilliseconds = diff[0] * 1e3 + diff[1] * 1e-6;
      const log = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${durationInMilliseconds}ms`;

      this.logger.log(log);
    });
    next();
  }
}
