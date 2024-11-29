import { AppConfigService } from "./appConfig.service";
import * as loadSentry from "./configs/sentry";
import * as loadApp from "./configs/app";
import * as loadDb from "./configs/db";
import * as loadMailer from "./configs/mailer";
import * as loadAuth from "./configs/auth";

describe("App Config", () => {
  let service: AppConfigService;
  const originalEnv = process.env;
  let spies: Array<ReturnType<typeof jest.spyOn>>;

  beforeEach(() => {
    spies = [
      jest.spyOn(loadApp, "loadAppConfig"),
      jest.spyOn(loadSentry, "loadSentryConfig"),
      jest.spyOn(loadDb, "loadDatabaseConfig"),
      jest.spyOn(loadMailer, "loadMailerConfig"),
      jest.spyOn(loadAuth, "loadAuthConfig"),
    ];

    service = new AppConfigService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  test("Should load configs", () => {
    for (const spy of spies) {
      expect(spy).toHaveBeenCalledTimes(1);
    }
  });

  describe("Mailer config", () => {
    test("Should throw error on bad config for sendgrid - no keys, no mail", () => {
      process.env.MAILER = "Sendgrid";
      expect(() => {
        new AppConfigService();
      }).toThrow();
    });

    test("Should throw error on bad config for sendgrid, no mail", () => {
      process.env.MAILER = "Sendgrid";
      process.env.SENDGRID_API_KEY = "123";
      expect(() => {
        new AppConfigService();
      }).toThrow();
    });

    test("Should throw error on bad config for sendgrid, no key", () => {
      process.env.MAILER = "Sendgrid";
      process.env.SENDING_MAIL = "something@something.som";
      expect(() => {
        new AppConfigService();
      }).toThrow();
    });

    test("Should not throw error on good config for sendgrid", () => {
      process.env.MAILER = "Sendgrid";
      process.env.SENDING_MAIL = "something@something.som";
      process.env.SENDGRID_API_KEY = "123";
      const mailer = new AppConfigService().get("mailer");
      expect(mailer).toEqual({
        mailer: "Sendgrid",
        sendgridApiKey: "123",
        sendingMail: "something@something.som",
      });
    });
  });

  describe("Get default configs", () => {
    test("app", () => {
      const app = service.get("app");
      expect(app).not.toBeUndefined();
      expect(app).toEqual({
        port: 3000,
        env_name: "development",
      });
    });

    test("sentry", () => {
      const sentry = service.get("sentry");
      expect(sentry).not.toBeUndefined();
      expect(sentry).toEqual({
        projects: [],
        host: "",
        dsn: "",
      });
    });

    test("db", () => {
      const db = service.get("database");
      expect(db).not.toBeUndefined();
      expect(db).toEqual({
        port: 5432,
        host: "localhost",
        user: "local",
        password: "local",
        database: "template",
        migrationsDirectory: "./drizzle",
      });
    });

    test("mailer", () => {
      const mailer = service.get("mailer");
      expect(mailer).toEqual({
        mailer: "Console",
        sendgridApiKey: "",
        sendingMail: "",
      });
    });

    test("auth", () => {
      const auth = service.get("auth");
      expect(auth).toEqual({
        jwtSecret: "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
        jwtExpiresIn: 1000 * 60 * 60 * 24,
        login: "John",
        password: "pass1",
      });
    });
  });
});
