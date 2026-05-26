CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"tier_id" uuid NOT NULL,
	"status" "booking_status" DEFAULT 'pending' NOT NULL,
	"delivery_address" text NOT NULL,
	"delivery_postcode" varchar(10) NOT NULL,
	"pickup_address" text NOT NULL,
	"pickup_postcode" varchar(10) NOT NULL,
	"box_count" integer NOT NULL,
	"delivery_date" date NOT NULL,
	"pickup_date" date NOT NULL,
	"extra_weeks" smallint DEFAULT 0 NOT NULL,
	"add_cleaning" boolean DEFAULT false NOT NULL,
	"add_carrying" boolean DEFAULT false NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"customer_name" varchar(128) NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"customer_phone" varchar(20) NOT NULL,
	"customer_phone_country_code" varchar(6) DEFAULT '+45' NOT NULL,
	"booking_number" varchar(20) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_booking_number_unique" UNIQUE("booking_number")
);
--> statement-breakpoint
ALTER TABLE "bookings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "box_pool" (
	"id" integer PRIMARY KEY NOT NULL,
	"total_boxes" integer NOT NULL,
	"buffer_boxes" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "box_pool_single_row" CHECK ("box_pool"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE "pricing_tiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"max_boxes" integer,
	"base_weeks" smallint NOT NULL,
	"price_per_box" numeric(6, 2) NOT NULL,
	"extra_week_price_per_box" numeric(6, 2) NOT NULL,
	"cleaning_price_per_box" numeric(6, 2) DEFAULT 0 NOT NULL,
	"carrying_price_per_box" numeric(6, 2) DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"sur_name" varchar(124) NOT NULL,
	"phone" varchar(20),
	"phone_country_code" varchar(6) DEFAULT '+45' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tier_id_pricing_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_dates_idx" ON "bookings" USING btree ("delivery_date","pickup_date");--> statement-breakpoint
CREATE UNIQUE INDEX "pricing_tiers_one_active_per_threshold" ON "pricing_tiers" USING btree ("max_boxes") WHERE is_active = true;--> statement-breakpoint
CREATE POLICY "Bookings: public insert" ON "bookings" AS PERMISSIVE FOR INSERT TO public WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Bookings: owner select" ON "bookings" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((auth.uid() = user_id));--> statement-breakpoint
CREATE POLICY "Users: public read" ON "users" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Users: self insert" ON "users" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((auth.uid() = id));--> statement-breakpoint
CREATE POLICY "Users: self update" ON "users" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((auth.uid() = id));--> statement-breakpoint
CREATE POLICY "Users: self delete" ON "users" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((auth.uid() = id));