export function loadDatabaseConfig() {
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

  return {
    port,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "local",
    password: process.env.DB_PASSWORD || "local",
    database: process.env.DB_DATABASE || "template",
    migrationsDirectory: process.env.MIGRATIONS_DIRECTORY || "./drizzle",
  };
}
export type DatabaseConfig = ReturnType<typeof loadDatabaseConfig>;
