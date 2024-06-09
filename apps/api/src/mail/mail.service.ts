import { Inject, Injectable } from "@nestjs/common";
import { MAILER_PROVIDER, MailOptions, MailerInterface } from "@repo/mailer";

@Injectable()
export class MailService {
  constructor(
    @Inject(MAILER_PROVIDER) private readonly mailer: MailerInterface
  ) {}

  async sendMail(options: MailOptions): Promise<void> {
    await this.mailer.sendMail(options);
  }
}
