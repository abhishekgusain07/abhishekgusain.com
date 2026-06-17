CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(320) NOT NULL,
	"subject" varchar(300),
	"message" text NOT NULL,
	"source" varchar(100) DEFAULT 'homepage',
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
