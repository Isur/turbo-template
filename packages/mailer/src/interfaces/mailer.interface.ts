export type MailOptions = {
  from: string;
  to: string;
  subject: string;
  content: string;
  data: Record<string, unknown>;
};

export interface MailerInterface {
  sendMail(options: MailOptions): Promise<void>;
}
