import { registerAs } from "@nestjs/config";
import { CONFIGKEYS } from "./configKeys";

export interface AppConfig {
  port: number;
}

export default registerAs(CONFIGKEYS.APP, () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
}));
