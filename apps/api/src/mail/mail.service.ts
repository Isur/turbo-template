import { Inject, Injectable } from "@nestjs/common";
import { MAILER_PROVIDER, MailOptions, MailerInterface } from "@repo/mailer";
import { accountConfirm } from "./mails";

@Injectable()
export class MailService {
  constructor(
    @Inject(MAILER_PROVIDER) private readonly mailer: MailerInterface
  ) {}

  private async sendMail(options: Omit<MailOptions, "from">): Promise<void> {
    await this.mailer.sendMail({
      from: "MyApp <bednarczykartur96@gmail.com>",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  }

  async accountConfirm(activateUrl: string, userEmail: string): Promise<void> {
    const html = accountConfirm({ activate_url: activateUrl });
    const text = `Activate your account by visiting ${activateUrl}`;

    await this.sendMail({
      to: userEmail,
      subject: "Activate your account",
      html,
      text,
    });
  }
}
