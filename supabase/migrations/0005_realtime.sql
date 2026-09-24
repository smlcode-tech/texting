-- 0005_realtime.sql
-- Realtime yayınına mesaj ve katılımcı tablolarını ekle (idempotent).

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'conversation_participants'
  ) then
    alter publication supabase_realtime add table public.conversation_participants;
  end if;
end $$;

-- DELETE olaylarını filtreleyebilmek için tam eski kayıt bilgisi.
alter table public.messages replica identity full;
