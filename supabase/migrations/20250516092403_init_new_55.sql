alter table "public"."customers" drop constraint "customers_phone_key";

alter table "public"."availability" drop constraint "availability_day_check";

drop index if exists "public"."customers_phone_key";

create table "public"."media_items" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "description" text,
    "type" text not null,
    "url" text not null,
    "full_path" text,
    "thumbnail_url" text,
    "user_id" uuid
);


alter table "public"."appointment_settings" enable row level security;

alter table "public"."appointments" enable row level security;

alter table "public"."availability" add column "excluded_hours" json;

alter table "public"."availability" enable row level security;

alter table "public"."customers" enable row level security;

CREATE UNIQUE INDEX media_items_pkey ON public.media_items USING btree (id);

alter table "public"."media_items" add constraint "media_items_pkey" PRIMARY KEY using index "media_items_pkey";

alter table "public"."media_items" add constraint "media_items_type_check" CHECK ((type = ANY (ARRAY['image'::text, 'video'::text, 'audio'::text]))) not valid;

alter table "public"."media_items" validate constraint "media_items_type_check";

alter table "public"."media_items" add constraint "media_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."media_items" validate constraint "media_items_user_id_fkey";

alter table "public"."availability" add constraint "availability_day_check" CHECK (((day)::text = ANY ((ARRAY['Monday'::character varying, 'Tuesday'::character varying, 'Wednesday'::character varying, 'Thursday'::character varying, 'Friday'::character varying, 'Saturday'::character varying, 'Sunday'::character varying])::text[]))) not valid;

alter table "public"."availability" validate constraint "availability_day_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_media_from_storage()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  -- Delete the file from storage using the full_path
  if OLD.full_path is not null then
    delete from storage.objects
    where bucket_id = 'media' and name = OLD.full_path;
  end if;
  return OLD;
end;
$function$
;

grant delete on table "public"."media_items" to "anon";

grant insert on table "public"."media_items" to "anon";

grant references on table "public"."media_items" to "anon";

grant select on table "public"."media_items" to "anon";

grant trigger on table "public"."media_items" to "anon";

grant truncate on table "public"."media_items" to "anon";

grant update on table "public"."media_items" to "anon";

grant delete on table "public"."media_items" to "authenticated";

grant insert on table "public"."media_items" to "authenticated";

grant references on table "public"."media_items" to "authenticated";

grant select on table "public"."media_items" to "authenticated";

grant trigger on table "public"."media_items" to "authenticated";

grant truncate on table "public"."media_items" to "authenticated";

grant update on table "public"."media_items" to "authenticated";

grant delete on table "public"."media_items" to "service_role";

grant insert on table "public"."media_items" to "service_role";

grant references on table "public"."media_items" to "service_role";

grant select on table "public"."media_items" to "service_role";

grant trigger on table "public"."media_items" to "service_role";

grant truncate on table "public"."media_items" to "service_role";

grant update on table "public"."media_items" to "service_role";

create policy "Enable insert for users based on user_id"
on "public"."appointment_settings"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."appointment_settings"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."appointment_settings"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert access for all users"
on "public"."appointments"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."appointments"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."appointments"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check (true);


create policy "Enable insert for users based on user_id"
on "public"."availability"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."availability"
as permissive
for select
to public
using (true);


create policy "Enable update based on user_id"
on "public"."availability"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert access for all users"
on "public"."customers"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."customers"
as permissive
for select
to public
using (true);


CREATE TRIGGER tr_delete_media_from_storage BEFORE DELETE ON public.media_items FOR EACH ROW EXECUTE FUNCTION delete_media_from_storage();


