export type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  cc?: Array<string>;
  bcc?: Array<string>;
};

export interface Mailer {
  sendMail(options: MailOptions): Promise<void>;
}
