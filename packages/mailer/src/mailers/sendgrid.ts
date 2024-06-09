import { Logger } from "@nestjs/common";
import * as sgMail from "@sendgrid/mail";
import { MailOptions, MailerInterface } from "src/interfaces/mailer.interface";

export type SendgridOptions = {
  apiKey: string;
};

export class Sendgrid implements MailerInterface {
  private readonly logger = new Logger(Sendgrid.name);
  constructor(opts: SendgridOptions) {
    sgMail.setApiKey(opts.apiKey);
  }

  async sendMail(options: MailOptions): Promise<void> {
    const { from, to, subject, text, html, cc, bcc } = options;
    try {
      await sgMail.send({ from, to, subject, text, html, cc, bcc });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
