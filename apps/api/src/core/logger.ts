import { utilities as NestWinstonUtilities, WinstonModule } from "nest-winston";
import winston from "winston";

export function createLogger() {
  const transports = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        NestWinstonUtilities.format.nestLike("Nest")
      ),
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.printf(({ context, level, message, timestamp, ms }) => {
          return JSON.stringify({ context, level, message, timestamp, ms });
        })
      ),
      filename: "logs/logs.log",
      level: "info",
    }),
  ];

  return WinstonModule.createLogger({
    transports,
  });
}
