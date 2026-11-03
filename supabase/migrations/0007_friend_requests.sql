-- 0007_friend_requests.sql
-- Kullanıcı izolasyonu ve arkadaşlık isteği akışı.
--
-- Mimarideki yeri: 0004'teki "herkes herkesi görür" MVP modelini kapatır.
-- Bu migration'dan sonra bir kullanıcı yalnızca kendisini, arkadaşlarını,
-- bekleyen isteklerinin karşı tarafını ve sohbet arkadaşlarını görebilir.
-- Sohbet yalnızca bir arkadaşlık isteği kabul edildiğinde, veritabanı içinden
-- (respond_friend_request / send_friend_request) oluşturulabilir; istemcinin
-- doğrudan sohbet veya katılımcı eklemesi kapatılır.

-- ======================================================= profiles.username

-- Kullanıcı adı, tüm kullanıcıları listelemeden birini bulmanın tek yoludur.
-- Küçük harfe zorlanır ki "Ada" ve "ada" iki ayrı hesap olamasın.
alter table public.profiles add column if not exists username text;

-- Verilen tabandan benzersiz ve formata uygun bir kullanıcı adı üretir.
-- Kayıt tetikleyicisi ve mevcut kullanıcıların geriye dönük doldurulması
-- aynı kuralı kullansın diye tek yerde tutulur.
create or replace function private.generate_username(base text)
returns text
language plpgsql
security definer
set search_path = ''
volatile
as $$
declare
  cleaned text := regexp_replace(lower(coalesce(base, '')), '[^a-z0-9_]', '', 'g');
  candidate text;
begin
  -- 15 karaktere kırpılır: çakışmada eklenen "_1234" ile 20 sınırı aşılmasın.
  cleaned := left(cleaned, 15);
  if char_length(cleaned) < 3 then
    -- Çok kısa önekler (ör. "c@x.com") format kuralını geçsin diye uzatılır.
    cleaned := cleaned || 'user';
  end if;

  candidate := cleaned;
  while exists (select 1 from public.profiles p where p.username = candidate) loop
    candidate := cleaned || '_' || lpad((floor(random() * 10000))::int::text, 4, '0');
  end loop;

  return candidate;
end;
$$;

revoke execute on function private.generate_username(text) from public, anon, authenticated;

-- Mevcut kullanıcıları e-posta önekinden doldur (NOT NULL'dan önce şart).
do $$
declare
  r record;
begin
  for r in
    select p.id, u.email
    from public.profiles p
    join auth.users u on u.id = p.id
    where p.username is null
    order by p.created_at
  loop
    update public.profiles
    set username = private.generate_username(split_part(r.email, '@', 1))
    where id = r.id;
  end loop;
end $$;

-- auth.users kaydı olmayan yetim profil kalmışsa (beklenmez) yine de doldur.
update public.profiles
set username = private.generate_username('user')
where username is null;

alter table public.profiles alter column username set not null;

alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles
  add constraint profiles_username_format
  check (username ~ '^[a-z0-9_]{3,20}$');

create unique index if not exists profiles_username_key on public.profiles (username);

-- Kayıtta formdan gelen kullanıcı adını kullan; geçersiz veya alınmışsa
-- e-posta önekinden üret. Tetikleyici hata verirse kayıt tamamen başarısız
-- olacağı için burada asla exception fırlatılmaz, sessizce yedeğe düşülür.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested text := lower(trim(coalesce(new.raw_user_meta_data ->> 'username', '')));
  final_username text;
begin
  if requested ~ '^[a-z0-9_]{3,20}$'
     and not exists (select 1 from public.profiles p where p.username = requested) then
    final_username := requested;
  else
    final_username := private.generate_username(split_part(new.email, '@', 1));
  end if;

  insert into public.profiles (id, display_name, username)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), split_part(new.email, '@', 1)),
    final_username
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 0006'daki kısıtlama create or replace ile kaybolmaz ama açıkça tekrarlanır.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- ========================================================= friend_requests

create table if not exists public.friend_requests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users (id) on delete cascade,
  recipient_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  check (sender_id <> recipient_id)
);

-- İki kişi arasında yönden bağımsız tek kayıt: A→B ve B→A aynı satırdır.
-- Ret sonrası yeniden istek, yeni satır yerine bu satırı günceller.
create unique index if not exists friend_requests_pair_key
  on public.friend_requests (least(sender_id, recipient_id), greatest(sender_id, recipient_id));

create index if not exists friend_requests_recipient_idx
  on public.friend_requests (recipient_id, status);

alter table public.friend_requests enable row level security;

drop policy if exists "friend_requests_select_own" on public.friend_requests;
create policy "friend_requests_select_own"
  on public.friend_requests for select to authenticated
  using (sender_id = (select auth.uid()) or recipient_id = (select auth.uid()));

-- Bilinçli olarak INSERT/UPDATE/DELETE politikası yok: bekleme süresi ve
-- "yalnızca alıcı kabul edebilir" kuralları RPC'lerde zorlanır. Politika
-- olsaydı istemci durumu doğrudan 'accepted' yaparak kuralları atlayabilirdi.
grant select on public.friend_requests to authenticated;

-- ============================================ profil görünürlüğü (izolasyon)

-- profiles politikası friend_requests ve conversation_participants'ı okur;
-- bu tabloların kendi RLS'i ile özyineleme olmasın diye SECURITY DEFINER.
create or replace function private.can_view_profile(target_profile_id uuid)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select
    target_profile_id = (select auth.uid())
    or exists (
      -- Reddedilmiş istekler dahil değil: ret sonrası profil tekrar gizlenir.
      select 1
      from public.friend_requests fr
      where fr.status in ('pending', 'accepted')
        and (
          (fr.sender_id = (select auth.uid()) and fr.recipient_id = target_profile_id)
          or (fr.recipient_id = (select auth.uid()) and fr.sender_id = target_profile_id)
        )
    )
    or exists (
      select 1
      from public.conversation_participants mine
      join public.conversation_participants theirs
        on theirs.conversation_id = mine.conversation_id
      where mine.user_id = (select auth.uid())
        and theirs.user_id = target_profile_id
    );
$$;

grant execute on function private.can_view_profile(uuid) to authenticated;

drop policy if exists "profiles_select_authenticated" on public.profiles;
drop policy if exists "profiles_select_visible" on public.profiles;
create policy "profiles_select_visible"
  on public.profiles for select to authenticated
  using (private.can_view_profile(id));

-- =========================================== sohbet oluşturmayı kilitle

-- Eski RPC herhangi bir kullanıcıyla izinsiz sohbet açabiliyordu; arkadaşlık
-- isteğini tamamen atlatırdı.
drop function if exists public.create_direct_conversation(uuid);

-- İstemcinin doğrudan sohbet açması veya bir sohbete başkasını eklemesi
-- kapatılır. Sohbetler yalnızca aşağıdaki SECURITY DEFINER fonksiyonlarla oluşur.
drop policy if exists "conversations_insert_self" on public.conversations;
drop policy if exists "participants_insert_self_or_creator" on public.conversation_participants;

-- İki kullanıcı arasındaki 1:1 sohbeti bulur, yoksa oluşturur.
-- private şemada durur ve authenticated'a açılmaz: yalnızca arkadaşlık
-- kabulü sırasında diğer SECURITY DEFINER fonksiyonlardan çağrılır.
create or replace function private.ensure_direct_conversation(user_a uuid, user_b uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  found_conversation_id uuid;
  new_conversation_id uuid := gen_random_uuid();
begin
  select c.id
  into found_conversation_id
  from public.conversations c
  join public.conversation_participants a
    on a.conversation_id = c.id and a.user_id = user_a
  join public.conversation_participants b
    on b.conversation_id = c.id and b.user_id = user_b
  where c.is_group = false
  limit 1;

  if found_conversation_id is not null then
    return found_conversation_id;
  end if;

  insert into public.conversations (id, is_group, created_by)
  values (new_conversation_id, false, user_a);

  insert into public.conversation_participants (conversation_id, user_id)
  values (new_conversation_id, user_a),
         (new_conversation_id, user_b);

  return new_conversation_id;
end;
$$;

revoke execute on function private.ensure_direct_conversation(uuid, uuid) from public, anon, authenticated;

-- ======================================================== istek RPC'leri

-- Kullanıcı adıyla istek gönderir.
-- Dönen değer: {"status": "pending"} ya da karşı taraf zaten bize istek
-- göndermişse otomatik kabul edilir ve {"status": "accepted",
-- "conversation_id": ...} döner (iki tarafın da beklemede kalmaması için).
create or replace function public.send_friend_request(target_username text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  target_id uuid;
  existing public.friend_requests%rowtype;
  -- Reddedilen tarafın aynı kişiye tekrar istek atabilmesi için beklemesi gereken süre.
  cooldown constant interval := interval '7 days';
  new_conversation_id uuid;
begin
  if current_user_id is null then
    raise exception 'Oturum açmanız gerekiyor.';
  end if;

  select p.id into target_id
  from public.profiles p
  where p.username = lower(trim(coalesce(target_username, '')));

  if target_id is null then
    raise exception 'Bu kullanıcı adıyla bir kullanıcı bulunamadı.';
  end if;

  if target_id = current_user_id then
    raise exception 'Kendine arkadaşlık isteği gönderemezsin.';
  end if;

  -- Aynı çift aynı anda iki istek gönderirse benzersiz index hatası yerine
  -- sıralı işlensin diye çift bazında transaction kilidi.
  perform pg_advisory_xact_lock(
    hashtextextended(least(current_user_id, target_id)::text || greatest(current_user_id, target_id)::text, 0)
  );

  select * into existing
  from public.friend_requests fr
  where least(fr.sender_id, fr.recipient_id) = least(current_user_id, target_id)
    and greatest(fr.sender_id, fr.recipient_id) = greatest(current_user_id, target_id);

  if not found then
    insert into public.friend_requests (sender_id, recipient_id)
    values (current_user_id, target_id);
    return jsonb_build_object('status', 'pending');
  end if;

  if existing.status = 'accepted' then
    raise exception 'Bu kişiyle zaten arkadaşsınız.';
  end if;

  if existing.status = 'pending' then
    if existing.sender_id = current_user_id then
      raise exception 'Bu kişiye zaten istek gönderdin, yanıt bekleniyor.';
    end if;

    update public.friend_requests
    set status = 'accepted', responded_at = now()
    where id = existing.id;

    new_conversation_id := private.ensure_direct_conversation(existing.sender_id, current_user_id);
    return jsonb_build_object('status', 'accepted', 'conversation_id', new_conversation_id);
  end if;

  -- status = 'declined'. Bekleme yalnızca reddedilen tarafa uygulanır;
  -- reddeden kişi fikrini değiştirirse hemen istek gönderebilir.
  if existing.sender_id = current_user_id
     and existing.responded_at > now() - cooldown then
    raise exception 'İsteğin reddedildi. % tarihinden sonra tekrar gönderebilirsin.',
      to_char((existing.responded_at + cooldown) at time zone 'Europe/Istanbul', 'DD.MM.YYYY HH24:MI');
  end if;

  update public.friend_requests
  set sender_id = current_user_id,
      recipient_id = target_id,
      status = 'pending',
      created_at = now(),
      responded_at = null
  where id = existing.id;

  return jsonb_build_object('status', 'pending');
end;
$$;

-- Gelen isteği kabul eder veya reddeder. Kabulde sohbet aynı transaction
-- içinde oluşur ve id'si döner; retde null döner.
create or replace function public.respond_friend_request(request_id uuid, accept boolean)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  request public.friend_requests%rowtype;
begin
  if current_user_id is null then
    raise exception 'Oturum açmanız gerekiyor.';
  end if;

  -- for update: aynı isteğe eşzamanlı iki yanıt iki sohbet açmasın.
  select * into request
  from public.friend_requests fr
  where fr.id = request_id
  for update;

  -- Başkasına ait isteğin varlığını da sızdırmamak için tek hata mesajı.
  if not found or request.recipient_id <> current_user_id then
    raise exception 'İstek bulunamadı.';
  end if;

  if request.status <> 'pending' then
    raise exception 'Bu istek zaten yanıtlanmış.';
  end if;

  update public.friend_requests
  set status = case when accept then 'accepted' else 'declined' end,
      responded_at = now()
  where id = request.id;

  if not accept then
    return null;
  end if;

  return private.ensure_direct_conversation(request.sender_id, request.recipient_id);
end;
$$;

-- Bekleyen gelen ve giden istekler, karşı tarafın profiliyle birlikte.
-- SECURITY INVOKER: profil verisi profiles RLS'inden geçer, böylece bu RPC
-- izolasyonu delen ikinci bir kapı olmaz.
create or replace function public.get_friend_requests()
returns table (
  id uuid,
  direction text,
  status text,
  created_at timestamptz,
  other jsonb
)
language sql
security invoker
set search_path = ''
stable
as $$
  select
    fr.id,
    case when fr.sender_id = (select auth.uid()) then 'outgoing' else 'incoming' end as direction,
    fr.status,
    fr.created_at,
    jsonb_build_object(
      'id', p.id,
      'display_name', p.display_name,
      'username', p.username,
      'avatar_url', p.avatar_url,
      'created_at', p.created_at
    ) as other
  from public.friend_requests fr
  join public.profiles p
    on p.id = case when fr.sender_id = (select auth.uid()) then fr.recipient_id else fr.sender_id end
  where fr.status = 'pending'
    and (fr.sender_id = (select auth.uid()) or fr.recipient_id = (select auth.uid()))
  order by fr.created_at desc;
$$;

revoke execute on function public.send_friend_request(text) from public, anon;
revoke execute on function public.respond_friend_request(uuid, boolean) from public, anon;
revoke execute on function public.get_friend_requests() from public, anon;
grant execute on function public.send_friend_request(text) to authenticated;
grant execute on function public.respond_friend_request(uuid, boolean) to authenticated;
grant execute on function public.get_friend_requests() to authenticated;

-- =========================================== sohbet özetine username ekle

-- 0003'teki tanımla aynı; yalnızca katılımcı JSON'una 'username' eklendi
-- (istemcideki Profile tipi artık bu alanı bekliyor).
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
          'username', p.username,
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

-- ================================================================ Realtime

-- Gelen istek ve kabul bildirimi sayfa yenilenmeden görünsün.
-- Realtime RLS'e uyar: olayları yalnızca gönderen ve alıcı alır.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'friend_requests'
  ) then
    alter publication supabase_realtime add table public.friend_requests;
  end if;
end $$;
