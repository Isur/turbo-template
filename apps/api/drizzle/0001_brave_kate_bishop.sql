CREATE TABLE IF NOT EXISTS "emails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from" text,
	"to" text,
	"subject" text,
	"date" timestamp,
	"data" json,
	"text" text,
	"html" text
);
