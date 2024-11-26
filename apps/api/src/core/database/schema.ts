import {
  serial,
  text,
  pgTable,
  boolean,
  uuid,
  timestamp,
  json,
  integer,
} from "drizzle-orm/pg-core";

export const seed = pgTable("seed", {
  done: boolean("done").notNull(),
  name: text("name").primaryKey(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const emails = pgTable("emails", {
  id: uuid("id").primaryKey().defaultRandom(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  subject: text("subject").notNull(),
  date: timestamp("date").notNull(),
  data: json("data"),
  text: text("text").notNull(),
  html: text("html").notNull(),
  type: text("type").notNull(),
});

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  originalName: text("originalname").notNull(),
  mimetype: text("mimetype").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
});
