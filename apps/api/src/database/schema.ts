import { serial, text, pgTable, boolean } from "drizzle-orm/pg-core";

export const init = pgTable("init", {
  id: serial("id").primaryKey(),
  seed: boolean("done").default(false),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title"),
  completed: boolean("completed"),
});
