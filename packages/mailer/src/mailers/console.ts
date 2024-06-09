import { MailOptions, MailerInterface } from "src/interfaces/mailer.interface";

export class Console implements MailerInterface {
  async sendMail(options: MailOptions): Promise<void> {
    const { from, to, subject, text, cc, bcc } = options;
    // eslint-disable-next-line no-console
    console.log({ from, to, subject, text, cc, bcc });
  }
}
