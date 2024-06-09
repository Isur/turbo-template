import { ConfigurableModuleBuilder } from "@nestjs/common";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";
import { MAILER_PROVIDER } from "./mailer.provider";

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigModuleOptions>()
  .setClassMethodName("forRoot")
  .setExtras({ tag: MAILER_PROVIDER }, (def, ext) => ({
    ...def,
    tag: ext.tag,
  }))
  .build();
