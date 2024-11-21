import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfig, CONFIGKEYS } from "src/config";
import { MailerFactory } from "./mailer.factory";
import { MailerService } from "./mailer.service";
import { MailerConfig } from "./options";

@Global()
@Module({
  providers: [
    MailerFactory,
    {
      provide: "MAILER",
      inject: [ConfigService, MailerFactory],
      useFactory: (
        configService: ConfigService,
        mailerFactory: MailerFactory
      ) => {
        const appConfig = configService.get<AppConfig>(CONFIGKEYS.APP);
        let mailConfig: MailerConfig = {
          type: "Console",
          options: null,
        };

        if (appConfig.mailer === "Sendgrid") {
          mailConfig = {
            type: appConfig.mailer,
            options: {
              apiKey: appConfig.sendgridApiKey,
            },
          };
        }

        return mailerFactory.createMailer(mailConfig);
      },
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
