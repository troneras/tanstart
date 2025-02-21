CREATE TABLE "app_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"size" integer NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"display_name" text NOT NULL,
	"image_id" integer,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "app_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"email_verified" timestamp,
	CONSTRAINT "app_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "app_accounts" ADD CONSTRAINT "app_accounts_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_profiles" ADD CONSTRAINT "app_profiles_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_profiles" ADD CONSTRAINT "app_profiles_image_id_app_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."app_files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_sessions" ADD CONSTRAINT "app_sessions_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_provider_provider_account_id_idx" ON "app_accounts" USING btree ("user_id","provider","provider_account_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "app_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "app_users" USING btree ("email");