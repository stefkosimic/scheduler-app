create type "public"."appointments_status" as enum ('upcoming', 'completed', 'pending', 'cancelled');

create table "public"."appointment_settings" (
    "id" uuid not null default gen_random_uuid(),
    "duration" integer not null,
    "buffer" integer not null,
    "advance" integer not null,
    "max_per_day" integer not null,
    "user_id" uuid default auth.uid()
);


create table "public"."appointments" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "customer_name" text,
    "customer_email" text,
    "date" text,
    "service_id" uuid,
    "status" appointments_status not null default 'pending'::appointments_status,
    "user_id" uuid
);


alter table "public"."appointments" enable row level security;

create table "public"."availability" (
    "id" uuid not null default gen_random_uuid(),
    "day" character varying(10) not null,
    "enabled" boolean not null default false,
    "start_time" time without time zone not null,
    "end_time" time without time zone not null,
    "user_id" uuid default auth.uid()
);


create table "public"."services" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "duration" integer not null,
    "price" numeric(10,2) not null,
    "description" text,
    "user_id" uuid default auth.uid()
);


alter table "public"."profiles" add column "company_name" text;

alter table "public"."profiles" add column "job_title" text;

CREATE UNIQUE INDEX appointment_settings_pkey ON public.appointment_settings USING btree (id);

CREATE UNIQUE INDEX appointments_pkey ON public.appointments USING btree (id);

CREATE UNIQUE INDEX availability_pkey ON public.availability USING btree (id);

CREATE UNIQUE INDEX services_pkey ON public.services USING btree (id);

alter table "public"."appointment_settings" add constraint "appointment_settings_pkey" PRIMARY KEY using index "appointment_settings_pkey";

alter table "public"."appointments" add constraint "appointments_pkey" PRIMARY KEY using index "appointments_pkey";

alter table "public"."availability" add constraint "availability_pkey" PRIMARY KEY using index "availability_pkey";

alter table "public"."services" add constraint "services_pkey" PRIMARY KEY using index "services_pkey";

alter table "public"."appointment_settings" add constraint "appointment_settings_advance_check" CHECK ((advance >= 0)) not valid;

alter table "public"."appointment_settings" validate constraint "appointment_settings_advance_check";

alter table "public"."appointment_settings" add constraint "appointment_settings_buffer_check" CHECK ((buffer >= 0)) not valid;

alter table "public"."appointment_settings" validate constraint "appointment_settings_buffer_check";

alter table "public"."appointment_settings" add constraint "appointment_settings_duration_check" CHECK ((duration > 0)) not valid;

alter table "public"."appointment_settings" validate constraint "appointment_settings_duration_check";

alter table "public"."appointment_settings" add constraint "appointment_settings_max_per_day_check" CHECK ((max_per_day > 0)) not valid;

alter table "public"."appointment_settings" validate constraint "appointment_settings_max_per_day_check";

alter table "public"."appointment_settings" add constraint "appointment_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."appointment_settings" validate constraint "appointment_settings_user_id_fkey";

alter table "public"."appointments" add constraint "appointments_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE not valid;

alter table "public"."appointments" validate constraint "appointments_service_id_fkey";

alter table "public"."appointments" add constraint "appointments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."appointments" validate constraint "appointments_user_id_fkey";

alter table "public"."availability" add constraint "availability_day_check" CHECK (((day)::text = ANY ((ARRAY['Monday'::character varying, 'Tuesday'::character varying, 'Wednesday'::character varying, 'Thursday'::character varying, 'Friday'::character varying, 'Saturday'::character varying, 'Sunday'::character varying])::text[]))) not valid;

alter table "public"."availability" validate constraint "availability_day_check";

alter table "public"."availability" add constraint "availability_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."availability" validate constraint "availability_user_id_fkey";

alter table "public"."services" add constraint "services_duration_check" CHECK ((duration > 0)) not valid;

alter table "public"."services" validate constraint "services_duration_check";

alter table "public"."services" add constraint "services_price_check" CHECK ((price >= (0)::numeric)) not valid;

alter table "public"."services" validate constraint "services_price_check";

alter table "public"."services" add constraint "services_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."services" validate constraint "services_user_id_fkey";

grant delete on table "public"."appointment_settings" to "anon";

grant insert on table "public"."appointment_settings" to "anon";

grant references on table "public"."appointment_settings" to "anon";

grant select on table "public"."appointment_settings" to "anon";

grant trigger on table "public"."appointment_settings" to "anon";

grant truncate on table "public"."appointment_settings" to "anon";

grant update on table "public"."appointment_settings" to "anon";

grant delete on table "public"."appointment_settings" to "authenticated";

grant insert on table "public"."appointment_settings" to "authenticated";

grant references on table "public"."appointment_settings" to "authenticated";

grant select on table "public"."appointment_settings" to "authenticated";

grant trigger on table "public"."appointment_settings" to "authenticated";

grant truncate on table "public"."appointment_settings" to "authenticated";

grant update on table "public"."appointment_settings" to "authenticated";

grant delete on table "public"."appointment_settings" to "service_role";

grant insert on table "public"."appointment_settings" to "service_role";

grant references on table "public"."appointment_settings" to "service_role";

grant select on table "public"."appointment_settings" to "service_role";

grant trigger on table "public"."appointment_settings" to "service_role";

grant truncate on table "public"."appointment_settings" to "service_role";

grant update on table "public"."appointment_settings" to "service_role";

grant delete on table "public"."appointments" to "anon";

grant insert on table "public"."appointments" to "anon";

grant references on table "public"."appointments" to "anon";

grant select on table "public"."appointments" to "anon";

grant trigger on table "public"."appointments" to "anon";

grant truncate on table "public"."appointments" to "anon";

grant update on table "public"."appointments" to "anon";

grant delete on table "public"."appointments" to "authenticated";

grant insert on table "public"."appointments" to "authenticated";

grant references on table "public"."appointments" to "authenticated";

grant select on table "public"."appointments" to "authenticated";

grant trigger on table "public"."appointments" to "authenticated";

grant truncate on table "public"."appointments" to "authenticated";

grant update on table "public"."appointments" to "authenticated";

grant delete on table "public"."appointments" to "service_role";

grant insert on table "public"."appointments" to "service_role";

grant references on table "public"."appointments" to "service_role";

grant select on table "public"."appointments" to "service_role";

grant trigger on table "public"."appointments" to "service_role";

grant truncate on table "public"."appointments" to "service_role";

grant update on table "public"."appointments" to "service_role";

grant delete on table "public"."availability" to "anon";

grant insert on table "public"."availability" to "anon";

grant references on table "public"."availability" to "anon";

grant select on table "public"."availability" to "anon";

grant trigger on table "public"."availability" to "anon";

grant truncate on table "public"."availability" to "anon";

grant update on table "public"."availability" to "anon";

grant delete on table "public"."availability" to "authenticated";

grant insert on table "public"."availability" to "authenticated";

grant references on table "public"."availability" to "authenticated";

grant select on table "public"."availability" to "authenticated";

grant trigger on table "public"."availability" to "authenticated";

grant truncate on table "public"."availability" to "authenticated";

grant update on table "public"."availability" to "authenticated";

grant delete on table "public"."availability" to "service_role";

grant insert on table "public"."availability" to "service_role";

grant references on table "public"."availability" to "service_role";

grant select on table "public"."availability" to "service_role";

grant trigger on table "public"."availability" to "service_role";

grant truncate on table "public"."availability" to "service_role";

grant update on table "public"."availability" to "service_role";

grant delete on table "public"."services" to "anon";

grant insert on table "public"."services" to "anon";

grant references on table "public"."services" to "anon";

grant select on table "public"."services" to "anon";

grant trigger on table "public"."services" to "anon";

grant truncate on table "public"."services" to "anon";

grant update on table "public"."services" to "anon";

grant delete on table "public"."services" to "authenticated";

grant insert on table "public"."services" to "authenticated";

grant references on table "public"."services" to "authenticated";

grant select on table "public"."services" to "authenticated";

grant trigger on table "public"."services" to "authenticated";

grant truncate on table "public"."services" to "authenticated";

grant update on table "public"."services" to "authenticated";

grant delete on table "public"."services" to "service_role";

grant insert on table "public"."services" to "service_role";

grant references on table "public"."services" to "service_role";

grant select on table "public"."services" to "service_role";

grant trigger on table "public"."services" to "service_role";

grant truncate on table "public"."services" to "service_role";

grant update on table "public"."services" to "service_role";


