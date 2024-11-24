import { SendgridOptions } from "./mailers";

export type MailerConfig =
  | {
      type: "Console";
      options: undefined;
    }
  | {
      type: "Sendgrid";
      options: SendgridOptions;
    };

export type Mailers = MailerConfig["type"];
