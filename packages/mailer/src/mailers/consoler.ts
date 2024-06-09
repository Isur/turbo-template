import { MailOptions, MailerInterface } from "src/interfaces/mailer.interface";

export class Consoler implements MailerInterface {
  async sendMail(options: MailOptions): Promise<void> {
    // eslint-disable-next-line no-console
    console.log("Sending mail with options: ", options);
  }
}
