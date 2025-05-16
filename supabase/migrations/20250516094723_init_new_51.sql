alter table "public"."profiles" drop column "avatar_url";

alter table "public"."profiles" add column "avatar_photo" uuid;

alter table "public"."profiles" add column "cover_photo" uuid;

alter table "public"."profiles" add constraint "profiles_avatar_photo_fkey" FOREIGN KEY (avatar_photo) REFERENCES media_items(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_avatar_photo_fkey";

alter table "public"."profiles" add constraint "profiles_cover_photo_fkey" FOREIGN KEY (cover_photo) REFERENCES media_items(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_cover_photo_fkey";


