import { registerAs } from "@nestjs/config";
import { CONFIGKEYS } from "./configKeys";

export interface LokiConfig {
  lokiUrl: string;
  lokiPass: string;
  lokiJobName?: string;
}

export default registerAs(
  CONFIGKEYS.LOKI,
  (): LokiConfig => ({
    lokiUrl: process.env.LOKI_HOST || "",
    lokiPass: process.env.LOKI_PASS || "",
    lokiJobName: process.env.LOKI_JOB_NAME || "template-app",
  })
);
