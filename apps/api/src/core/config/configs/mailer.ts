export function loadMailerConfig() {
  return {
    mailer: process.env.MAILER || "Console",
    sendgridApiKey: process.env.SENDGRID_API_KEY || "",
    sendingMail: process.env.SENDING_MAIL || "",
  };
}
export type MailerConfig = ReturnType<typeof loadMailerConfig>;
