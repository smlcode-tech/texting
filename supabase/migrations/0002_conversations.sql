-- 0002_conversations.sql
-- Sohbetler ve katılımcıları. is_group/title grup sohbeti için hazırdır.

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  title text,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create index if not exists conversation_participants_user_idx
  on public.conversation_participants (user_id);

create index if not exists conversations_updated_at_idx
  on public.conversations (updated_at desc);

-- RLS özyinelemesini kıran yardımcı fonksiyonlar (private şema).
create schema if not exists private;

create or replace function private.is_conversation_member(target_conversation_id uuid)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.conversation_participants p
    where p.conversation_id = target_conversation_id
      and p.user_id = (select auth.uid())
  );
$$;

create or replace function private.is_conversation_creator(target_conversation_id uuid)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.conversations c
    where c.id = target_conversation_id
      and c.created_by = (select auth.uid())
  );
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_conversation_member(uuid) to authenticated;
grant execute on function private.is_conversation_creator(uuid) to authenticated;
