import { Logger } from "@nestjs/common";
import sgMail from "@sendgrid/mail";
import { MailOptions, Mailer } from "../mailer.interface";

export type SendgridOptions = {
  apiKey: string;
};

export class SendgridMailer implements Mailer {
  private readonly logger = new Logger(SendgridMailer.name);

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
