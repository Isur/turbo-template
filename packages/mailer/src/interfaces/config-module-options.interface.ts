import { SendgridOptions } from "src/mailers/sendgrid";

export type Mailers = "console" | "sendgrid";

type SendgridConfigOptions = {
  mailer: "sendgrid";
  config: SendgridOptions;
};

type ConsoleConfigOptions = {
  mailer: "console";
  config: null;
};

export type ConfigModuleOptions = SendgridConfigOptions | ConsoleConfigOptions;
