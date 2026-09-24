-- 0001_profiles.sql
-- Kullanıcı profilleri: auth.users ile 1:1 eşleşir.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Kullanıcı',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Yeni kayıt olan kullanıcı için otomatik profil oluştur.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Bu migration'dan önce kayıt olmuş kullanıcıları geriye dönük doldur.
insert into public.profiles (id, display_name)
select
  u.id,
  coalesce(nullif(u.raw_user_meta_data ->> 'name', ''), split_part(u.email, '@', 1))
from auth.users u
on conflict (id) do nothing;
