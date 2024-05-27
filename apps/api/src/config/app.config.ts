import { registerAs } from "@nestjs/config";
import { CONFIGKEYS } from "./configKeys";

export interface AppConfig {
  port: number;
  jwtSecret: string;
}

export default registerAs(CONFIGKEYS.APP, () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
}));
