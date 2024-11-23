export function loadAppConfig() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    env_name: process.env.ENV_NAME || "development",
  };
}
export type AppConfig = ReturnType<typeof loadAppConfig>;
