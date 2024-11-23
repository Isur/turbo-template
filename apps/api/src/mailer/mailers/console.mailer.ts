import { MailOptions, Mailer } from "../mailer.interface";

export class ConsoleMailer implements Mailer {
  async sendMail(options: MailOptions): Promise<void> {
    const { from, to, subject, text, cc, bcc } = options;
    // eslint-disable-next-line no-console
    console.log({ from, to, subject, text, cc, bcc });
  }
}
