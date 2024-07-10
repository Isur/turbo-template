import { NestMiddleware } from "@nestjs/common";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Request, Response } from "express";
import { Counter, Histogram } from "prom-client";

function normalizeStatusCode(statusCode: number): string {
  if (statusCode < 200) return "1XX";
  if (statusCode < 300) return "2XX";
  if (statusCode < 400) return "3XX";
  if (statusCode < 500) return "4XX";
  return "5XX";
}

export class LoggingMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric("http_counter") private readonly counter: Counter<string>,
    @InjectMetric("http_histogram")
    private readonly histogram: Histogram<string>
  ) {}

  use(req: Request, res: Response, next: () => void) {
    const startAt = process.hrtime();
    const { method, originalUrl } = req;

    res.on("finish", () => {
      const { statusCode } = res;
      const diff = process.hrtime(startAt);
      const durationInMilliseconds = diff[0] * 1e3 + diff[1] * 1e-6;
      const statusCodeNormalized = normalizeStatusCode(statusCode);
      this.counter
        .labels({
          method,
          originalUrl,
          statusCode: statusCodeNormalized,
        })
        .inc();

      this.histogram
        .labels({ method, originalUrl, statusCode: statusCodeNormalized })
        .observe(durationInMilliseconds);
    });
    next();
  }
}
