import { registerAs } from "@nestjs/config";
import { Mailers } from "@repo/mailer";
import { CONFIGKEYS } from "./configKeys";

export interface AppConfig {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: number;
  mailer: Mailers;
  sendgridApiKey: string;
  sendingMail: string;
  env_name: string;
}

export default registerAs(
  CONFIGKEYS.APP,
  (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret:
      process.env.JWT_SECRET ||
      "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
    jwtExpiresIn:
      parseInt(process.env.JWT_EXPIRES_IN, 10) || 1000 * 60 * 60 * 24, // 1 day
    mailer: (process.env.MAILER as Mailers) || "console",
    sendgridApiKey: process.env.SENDGRID_API_KEY || "",
    sendingMail: process.env.SENDING_MAIL || "",
    env_name: process.env.ENV_NAME || "development",
  })
);
