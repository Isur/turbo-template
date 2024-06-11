import {
  serial,
  text,
  pgTable,
  boolean,
  uuid,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const init = pgTable("init", {
  id: serial("id").primaryKey(),
  seed: boolean("done").default(false),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title"),
  completed: boolean("completed"),
});

export const emails = pgTable("emails", {
  id: uuid("id").primaryKey().defaultRandom(),
  from: text("from"),
  to: text("to"),
  subject: text("subject"),
  date: timestamp("date"),
  data: json("data"),
  text: text("text"),
  html: text("html"),
  type: text("type"),
});
