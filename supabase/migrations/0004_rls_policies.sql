-- 0004_rls_policies.sql
-- Row Level Security politikaları ve Data API yetkileri.

-- ---------------------------------------------------------------- profiles
alter table public.profiles enable row level security;

-- MVP: kullanıcı keşfi için tüm oturumlu kullanıcılar profilleri okuyabilir.
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
  on public.profiles for select to authenticated
  using (true);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- ----------------------------------------------------------- conversations
alter table public.conversations enable row level security;

drop policy if exists "conversations_select_members" on public.conversations;
create policy "conversations_select_members"
  on public.conversations for select to authenticated
  using (private.is_conversation_member(id));

drop policy if exists "conversations_insert_self" on public.conversations;
create policy "conversations_insert_self"
  on public.conversations for insert to authenticated
  with check (created_by = (select auth.uid()));

drop policy if exists "conversations_update_members" on public.conversations;
create policy "conversations_update_members"
  on public.conversations for update to authenticated
  using (private.is_conversation_member(id))
  with check (private.is_conversation_member(id));

-- ---------------------------------------------- conversation_participants
alter table public.conversation_participants enable row level security;

drop policy if exists "participants_select_members" on public.conversation_participants;
create policy "participants_select_members"
  on public.conversation_participants for select to authenticated
  using (private.is_conversation_member(conversation_id));

drop policy if exists "participants_insert_self_or_creator" on public.conversation_participants;
create policy "participants_insert_self_or_creator"
  on public.conversation_participants for insert to authenticated
  with check (
    user_id = (select auth.uid())
    or private.is_conversation_creator(conversation_id)
  );

drop policy if exists "participants_delete_self" on public.conversation_participants;
create policy "participants_delete_self"
  on public.conversation_participants for delete to authenticated
  using (user_id = (select auth.uid()));

-- ---------------------------------------------------------------- messages
alter table public.messages enable row level security;

drop policy if exists "messages_select_members" on public.messages;
create policy "messages_select_members"
  on public.messages for select to authenticated
  using (private.is_conversation_member(conversation_id));

drop policy if exists "messages_insert_members" on public.messages;
create policy "messages_insert_members"
  on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and private.is_conversation_member(conversation_id)
  );

drop policy if exists "messages_update_sender" on public.messages;
create policy "messages_update_sender"
  on public.messages for update to authenticated
  using (sender_id = (select auth.uid()))
  with check (sender_id = (select auth.uid()));

drop policy if exists "messages_delete_sender" on public.messages;
create policy "messages_delete_sender"
  on public.messages for delete to authenticated
  using (sender_id = (select auth.uid()));

-- ------------------------------------------------------- Data API yetkileri
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.conversations to authenticated;
grant select, insert, update, delete on public.conversation_participants to authenticated;
grant select, insert, update, delete on public.messages to authenticated;
