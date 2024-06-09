import { MailOptions, MailerInterface } from "src/interfaces/mailer.interface";

export class Console implements MailerInterface {
  async sendMail(options: MailOptions): Promise<void> {
    // eslint-disable-next-line no-console
    console.log({
      from: options.from,
      to: options.to,
      subject: options.subject,
      data: options.data,
    });
  }
}
