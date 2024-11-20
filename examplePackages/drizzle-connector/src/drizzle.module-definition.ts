import { ConfigurableModuleBuilder } from "@nestjs/common";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";
import { DRIZZLE_PROVIDER } from "./drizzle.provider";

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigModuleOptions>()
  .setClassMethodName("forRoot")
  .setExtras({ tag: DRIZZLE_PROVIDER, isGlobal: false }, (def, ext) => ({
    ...def,
    global: ext.isGlobal,
    tag: ext.tag,
  }))
  .build();
