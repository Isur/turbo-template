import { Injectable, Logger } from "@nestjs/common";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";
import { MailerInterface } from "./interfaces/mailer.interface";

@Injectable()
export class MailerFactory {
  private readonly logger = new Logger(MailerFactory.name);

  public async getMailer({
    mailer,
    config,
  }: ConfigModuleOptions): Promise<MailerInterface> {
    if (mailer === "console") {
      const { Console } = await import("./mailers/console");
      return new Console();
    } else if (mailer === "sendgrid") {
      const { Sendgrid } = await import("./mailers/sendgrid");
      return new Sendgrid(config);
    }

    this.logger.error(`Unknown mailer: ${mailer}`);
    throw new Error(`Unknown mailer: ${mailer}`);
  }
}
