-- 0003_messages.sql
-- Mesajlar, ilgili tetikleyici ve sohbet RPC'leri.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now(),
  edited_at timestamptz
);

create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at desc);

-- Mesaj geldiğinde sohbetin updated_at alanını güncelle.
create or replace function private.touch_conversation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists on_message_created on public.messages;
create trigger on_message_created
  after insert on public.messages
  for each row execute function private.touch_conversation();

-- 1:1 sohbeti bul veya oluştur (yarış durumunu önleyen RPC).
create or replace function public.create_direct_conversation(other_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  found_conversation_id uuid;
  new_conversation_id uuid := gen_random_uuid();
begin
  if current_user_id is null then
    raise exception 'Oturum açmanız gerekiyor.';
  end if;

  if other_user_id is null or other_user_id = current_user_id then
    raise exception 'Geçersiz kullanıcı.';
  end if;

  select c.id
  into found_conversation_id
  from public.conversations c
  join public.conversation_participants me
    on me.conversation_id = c.id and me.user_id = current_user_id
  join public.conversation_participants other
    on other.conversation_id = c.id and other.user_id = other_user_id
  where c.is_group = false
  limit 1;

  if found_conversation_id is not null then
    return found_conversation_id;
  end if;

  insert into public.conversations (id, is_group, created_by)
  values (new_conversation_id, false, current_user_id);

  insert into public.conversation_participants (conversation_id, user_id)
  values (new_conversation_id, current_user_id),
         (new_conversation_id, other_user_id);

  return new_conversation_id;
end;
$$;

-- Sohbet listesi özeti: katılımcılar + son mesaj. RLS çağıran kullanıcı üzerinden uygulanır.
create or replace function public.get_conversation_summaries()
returns table (
  id uuid,
  is_group boolean,
  title text,
  created_by uuid,
  created_at timestamptz,
  updated_at timestamptz,
  participants jsonb,
  last_message jsonb
)
language sql
security invoker
set search_path = ''
stable
as $$
  select
    c.id,
    c.is_group,
    c.title,
    c.created_by,
    c.created_at,
    c.updated_at,
    coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', p.id,
          'display_name', p.display_name,
          'avatar_url', p.avatar_url,
          'created_at', p.created_at
        )
        order by p.display_name
      )
      from public.conversation_participants cp
      join public.profiles p on p.id = cp.user_id
      where cp.conversation_id = c.id
    ), '[]'::jsonb) as participants,
    (
      select to_jsonb(m)
      from public.messages m
      where m.conversation_id = c.id
      order by m.created_at desc
      limit 1
    ) as last_message
  from public.conversations c
  order by c.updated_at desc;
$$;

grant execute on function public.create_direct_conversation(uuid) to authenticated;
grant execute on function public.get_conversation_summaries() to authenticated;
