CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"originalname" text NOT NULL,
	"mimetype" text NOT NULL,
	"path" text NOT NULL,
	"size" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "from" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "to" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "subject" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "text" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "html" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "completed" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "completed" SET NOT NULL;