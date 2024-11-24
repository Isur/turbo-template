CREATE TABLE IF NOT EXISTS "seed" (
	"done" boolean NOT NULL,
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DROP TABLE "init";