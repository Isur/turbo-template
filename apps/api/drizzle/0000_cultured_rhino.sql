CREATE TABLE IF NOT EXISTS "init" (
	"id" serial PRIMARY KEY NOT NULL,
	"done" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"completed" boolean
);
