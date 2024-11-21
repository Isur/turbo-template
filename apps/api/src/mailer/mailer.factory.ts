import { Injectable, Logger } from "@nestjs/common";
import { SendgridMailer, ConsoleMailer } from "./mailers";
import { Mailer } from "./mailer.interface";
import { MailerConfig } from "./options";

@Injectable()
export class MailerFactory {
  private readonly logger = new Logger(MailerFactory.name);
  createMailer(config: MailerConfig) {
    const { type, options } = config;

    let mailer: Mailer;

    if (type === "Sendgrid") {
      mailer = new SendgridMailer(options);
    } else if (type === "Console") {
      mailer = new ConsoleMailer();
    }

    this.logger.log(`Using {type} mailer`);

    return mailer;
  }
}
