import { MAILER_PROVIDER } from "./mailer.provider";
import {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} from "./mailer.module-definition";
import { MailerFactory } from "./mailerFactory.service";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";

export class MailerModule extends ConfigurableModuleClass {
  static forRootAsync(opts: typeof ASYNC_OPTIONS_TYPE) {
    const { providers = [], exports = [], ...rest } = super.forRootAsync(opts);

    return {
      ...rest,
      providers: [
        ...providers,
        MailerFactory,
        {
          provide: opts?.tag ?? MAILER_PROVIDER,
          useFactory: async (
            mailerFactory: MailerFactory,
            config: ConfigModuleOptions
          ) => {
            return await mailerFactory.getMailer(config);
          },
          inject: [MailerFactory, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, opts?.tag ?? MAILER_PROVIDER],
    };
  }
}
