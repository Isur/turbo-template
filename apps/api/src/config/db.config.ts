import { registerAs } from "@nestjs/config";
import { CONFIGKEYS } from "./configKeys";

export interface DbConfig {
  port: number;
  host: string;
  user: string;
  password: string;
  database: string;
}

export default registerAs(CONFIGKEYS.DB, () => ({
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "local",
  password: process.env.DB_PASSWORD || "local",
  database: process.env.DB_DATABASE || "local",
}));
