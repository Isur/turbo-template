import { Module } from "@nestjs/common";
import { MailerModule } from "@repo/mailer";
import { ConfigService } from "@nestjs/config";
import { AppConfig, CONFIGKEYS } from "src/config";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const appConfig = configService.get<AppConfig>(CONFIGKEYS.APP);
        return {
          mailer: appConfig.mailer,
        };
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
