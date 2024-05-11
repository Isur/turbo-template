import { ConfigurableModuleBuilder } from "@nestjs/common";
import { ConfigModuleOptions } from "./interfaces/config-module-options.interface";

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigModuleOptions>()
  .setClassMethodName("forRoot")
  .build();
