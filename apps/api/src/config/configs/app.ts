import { Mailers } from "src/mailer/options";

export function loadAppConfig() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret:
      process.env.JWT_SECRET ||
      "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
    jwtExpiresIn:
      parseInt(process.env.JWT_EXPIRES_IN, 10) || 1000 * 60 * 60 * 24, // 1 day
    mailer: (process.env.MAILER as Mailers) || "Console",
    sendgridApiKey: process.env.SENDGRID_API_KEY || "",
    sendingMail: process.env.SENDING_MAIL || "",
    env_name: process.env.ENV_NAME || "development",
  };
}
export type AppConfig = ReturnType<typeof loadAppConfig>;
