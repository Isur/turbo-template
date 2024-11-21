import handlebars from "handlebars";
import AccountConfirm from "./accountConfirm";

export const accountConfirm = (opts: { activate_url: string }) => {
  const compiled = handlebars.compile(AccountConfirm);
  return compiled(opts);
};
