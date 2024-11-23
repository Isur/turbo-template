import { Global, Module } from "@nestjs/common";
import { MailerFactory } from "./mailer.factory";
import { MailerService } from "./mailer.service";
import { MailerConfig } from "./options";
import { AppConfigService } from "src/config/appConfig.service";

@Global()
@Module({
  providers: [
    MailerFactory,
    {
      provide: "MAILER",
      inject: [AppConfigService, MailerFactory],
      useFactory: (
        configService: AppConfigService,
        mailerFactory: MailerFactory
      ) => {
        const appConfig = configService.get("app");
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
