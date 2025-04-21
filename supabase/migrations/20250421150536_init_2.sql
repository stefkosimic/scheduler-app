alter table "public"."availability" drop constraint "availability_day_check";

alter table "public"."customers" add column "notes" text;

alter table "public"."customers" add column "user_id" uuid not null;

alter table "public"."customers" add constraint "customers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."customers" validate constraint "customers_user_id_fkey";

alter table "public"."availability" add constraint "availability_day_check" CHECK (((day)::text = ANY ((ARRAY['Monday'::character varying, 'Tuesday'::character varying, 'Wednesday'::character varying, 'Thursday'::character varying, 'Friday'::character varying, 'Saturday'::character varying, 'Sunday'::character varying])::text[]))) not valid;

alter table "public"."availability" validate constraint "availability_day_check";


