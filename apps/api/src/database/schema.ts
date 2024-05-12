import { serial, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const colors = pgEnum("colors", ["red", "green", "blue"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  color: colors("color").default("blue"),
});
