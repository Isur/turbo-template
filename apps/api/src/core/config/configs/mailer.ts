export function loadMailerConfig() {
  const mailer = process.env.MAILER || "Console";
  const sendgridApiKey = process.env.SENDGRID_API_KEY || "";
  const sendingMail = process.env.SENDING_MAIL || "";

  if (mailer === "Sendgrid") {
    if (!sendgridApiKey || !sendingMail) {
      throw new Error("Missing config for sendgrid!");
    }
  }

  return {
    mailer,
    sendgridApiKey,
    sendingMail,
  };
}
export type MailerConfig = ReturnType<typeof loadMailerConfig>;
