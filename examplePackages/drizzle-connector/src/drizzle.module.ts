import { DRIZZLE_PROVIDER } from "./drizzle.provider";
import {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} from "./drizzle.module-definition";
import { DrizzleService } from "./drizzle.service";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";

export class DrizzleModule extends ConfigurableModuleClass {
  static forRootAsync(opts: typeof ASYNC_OPTIONS_TYPE) {
    const { providers = [], exports = [], ...rest } = super.forRootAsync(opts);

    return {
      ...rest,
      providers: [
        ...providers,
        DrizzleService,
        {
          provide: opts?.tag ?? DRIZZLE_PROVIDER,
          global: opts?.isGlobal ?? false,
          useFactory: async (
            drizzleService: DrizzleService,
            config: ConfigModuleOptions
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzleService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, opts?.tag ?? DRIZZLE_PROVIDER],
    };
  }
}
