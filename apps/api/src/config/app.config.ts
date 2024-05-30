import { registerAs } from "@nestjs/config";
import { CONFIGKEYS } from "./configKeys";

export interface AppConfig {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: number;
}

export default registerAs(CONFIGKEYS.APP, () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10) || 1000 * 60 * 60 * 24, // 1 day
}));
