import { Inject, Injectable } from "@nestjs/common";
import { MAILER_PROVIDER, MailOptions, MailerInterface } from "@repo/mailer";
import { ConfigService } from "@nestjs/config";
import { AppConfig, CONFIGKEYS } from "src/config";
import { DB, DB_TOKEN, schema } from "src/database";
import { accountConfirm } from "./mails";

@Injectable()
export class MailService {
  constructor(
    @Inject(MAILER_PROVIDER) private readonly mailer: MailerInterface,
    private readonly configService: ConfigService,
    @Inject(DB_TOKEN) private readonly db: DB
  ) {}

  private async sendMail(
    options: Omit<MailOptions, "from">,
    data: unknown
  ): Promise<void> {
    const appConfig = this.configService.get<AppConfig>(CONFIGKEYS.APP);
    const from = `MyApp <${appConfig.sendingMail}>`;
    await this.mailer.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    await this.db.insert(schema.emails).values({
      from,
      to: options.to,
      subject: options.subject,
      date: new Date(),
      data,
      text: options.text,
      html: options.html,
      type: appConfig.mailer,
    });
  }

  async accountConfirm(activateUrl: string, userEmail: string): Promise<void> {
    const html = accountConfirm({ activate_url: activateUrl });
    const text = `Activate your account by visiting ${activateUrl}`;

    await this.sendMail(
      {
        to: userEmail,
        subject: "Activate your account",
        html,
        text,
      },
      {
        activateUrl,
      }
    );
  }
}
