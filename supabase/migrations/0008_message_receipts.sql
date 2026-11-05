-- 0008_message_receipts.sql
-- Mesajlar için "iletildi" ve "okundu" bilgisi.
--
-- Mimarideki yeri: Her mesaja ayrı satır yazmak yerine, her katılımcının bir
-- sohbette "en son ne zamana kadar aldığı / okuduğu" zaman damgası tutulur.
-- Bir mesaj, gönderen dışındaki tüm katılımcıların ilgili damgası mesajın
-- created_at değerine ulaştığında iletildi / okundu sayılır (gruplara da uyar).
-- İstemci bu damgaları conversation_participants üzerinden okur ve Realtime
-- UPDATE olaylarıyla canlı takip eder (tablo 0005'te yayına eklendi).

alter table public.conversation_participants
  add column if not exists last_delivered_at timestamptz,
  add column if not exists last_read_at timestamptz;

-- Mevcut geçmiş "gönderildi" (tek tik) olarak kalmasın: bu migration'dan önceki
-- mesajlar iletilmiş ve okunmuş kabul edilir.
update public.conversation_participants
set last_delivered_at = coalesce(last_delivered_at, now()),
    last_read_at = coalesce(last_read_at, now());

-- Bilinçli olarak UPDATE politikası yok: istemci damgayı doğrudan yazabilseydi
-- geriye alabilir veya geleceğe atabilirdi. Damgalar yalnızca aşağıdaki
-- RPC'lerle, yalnızca ileri ve en fazla now()'a kadar ilerler.

-- Çağıranın, başkalarından gelmiş ama henüz iletildi sayılmamış mesajı olan tüm
-- sohbetlerinde last_delivered_at'i now() yapar. Uygulama açıkken (ilk yükleme,
-- yeniden bağlanma, yeni mesaj olayı) çağrılır. Yalnızca gerçekten değişen
-- satırlar güncellenir ki karşı tarafa gereksiz Realtime olayı gitmesin.
create or replace function public.mark_messages_delivered()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'Oturum açmanız gerekiyor.';
  end if;

  update public.conversation_participants cp
  set last_delivered_at = now()
  where cp.user_id = current_user_id
    and exists (
      select 1
      from public.messages m
      where m.conversation_id = cp.conversation_id
        and m.sender_id <> current_user_id
        and m.created_at > coalesce(cp.last_delivered_at, '-infinity'::timestamptz)
    );
end;
$$;

-- Çağıranın verilen sohbetteki okuma damgasını up_to'ya (istemcinin ekranda
-- gördüğü son mesajın zamanı) ilerletir. Okunan her mesaj iletilmiş de sayılır.
-- now() ile sınırlanır ki istemci gelecekteki mesajları önceden okundu yapamasın.
create or replace function public.mark_conversation_read(target_conversation_id uuid, up_to timestamptz)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  read_at timestamptz := least(coalesce(up_to, now()), now());
begin
  if current_user_id is null then
    raise exception 'Oturum açmanız gerekiyor.';
  end if;

  update public.conversation_participants cp
  set last_read_at = greatest(coalesce(cp.last_read_at, '-infinity'::timestamptz), read_at),
      last_delivered_at = greatest(coalesce(cp.last_delivered_at, '-infinity'::timestamptz), read_at)
  where cp.conversation_id = target_conversation_id
    and cp.user_id = current_user_id
    and (cp.last_read_at is null or cp.last_read_at < read_at);
end;
$$;

revoke execute on function public.mark_messages_delivered() from public, anon;
revoke execute on function public.mark_conversation_read(uuid, timestamptz) from public, anon;
grant execute on function public.mark_messages_delivered() to authenticated;
grant execute on function public.mark_conversation_read(uuid, timestamptz) to authenticated;
