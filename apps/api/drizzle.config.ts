import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/core/database/schema.ts",
  out: process.env.migrationsFolder || "./drizzle",
  dbCredentials: {
    user: process.env.DB_USER || "local",
    password: process.env.DB_PASSWORD || "local",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    database: process.env.DB_DATABASE || "template",
    ssl: false,
  },
});
