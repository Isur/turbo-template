import { Injectable, Logger } from "@nestjs/common";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";
import { MailerInterface } from "./interfaces/mailer.interface";

@Injectable()
export class MailerFactory {
  private readonly logger = new Logger(MailerFactory.name);

  public async getMailer({
    mailer,
  }: ConfigModuleOptions): Promise<MailerInterface> {
    if (mailer === "console") {
      const { Console } = await import("./mailers/console");
      return new Console();
    } else if (mailer === "consoler") {
      const { Consoler } = await import("./mailers/consoler");
      return new Consoler();
    }

    this.logger.error(`Unknown mailer: ${mailer}`);
    throw new Error(`Unknown mailer: ${mailer}`);
  }
}
