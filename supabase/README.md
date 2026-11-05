# Supabase Kurulumu

Bu klasör, `texting` uygulamasının veritabanı şemasını, RLS politikalarını ve Realtime ayarlarını içerir.

## 1. Ortam değişkenleri

Proje kökünde `.env` oluşturun (`.env.example` şablonunu kullanın):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

## 2. Migration'ları uygulama

### Seçenek A — Supabase Dashboard (en hızlı)

1. Supabase Dashboard → **SQL Editor**'ü açın.
2. `supabase/migrations/` altındaki dosyaları **numaralandırma sırasıyla** çalıştırın:
   - `0001_profiles.sql`
   - `0002_conversations.sql`
   - `0003_messages.sql`
   - `0004_rls_policies.sql`
   - `0005_realtime.sql`
   - `0006_revoke_function_grants.sql`
   - `0007_friend_requests.sql`
   - `0008_message_receipts.sql`

### Seçenek B — Supabase CLI

```bash
npm install -g supabase
supabase link --project-ref <project-ref>
supabase db push
```

## 3. Notlar

- `0001_profiles.sql`, migrasyondan önce kayıt olmuş kullanıcılar için `profiles` kayıtlarını geriye dönük doldurur.
- `0004_rls_policies.sql` tüm tablolarda RLS'i etkinleştirir; her tablo yalnızca ilgili kullanıcılar tarafından erişilebilir.
- `0005_realtime.sql`, `messages` ve `conversation_participants` tablolarını `supabase_realtime` publication'ına ekler. Realtime RLS'e uyar: bir kullanıcı yalnızca üyesi olduğu sohbetlerin olaylarını alır.
- `profiles` tablosu MVP gereği tüm oturumlu kullanıcılara okunabilir; üretimde kısıtlanması önerilir.
- `0007_friend_requests.sql` kullanıcı izolasyonunu getirir: `profiles` artık herkese açık değildir; kullanıcı yalnızca kendisini, arkadaşlarını, bekleyen isteklerinin karşı tarafını ve sohbet arkadaşlarını görür. Her profile benzersiz bir `username` eklenir (mevcut kullanıcılar e-posta önekinden doldurulur). Sohbetler yalnızca arkadaşlık isteği kabul edildiğinde `send_friend_request` / `respond_friend_request` RPC'leri içinden oluşur; eski `create_direct_conversation` kaldırılır. Reddedilen taraf aynı kişiye 7 gün sonra tekrar istek gönderebilir.
- `0007` uygulandığı anda eski frontend'in "Yeni sohbet" akışı çalışmaz (`create_direct_conversation` silinir); migration'ı yeni frontend dağıtımıyla birlikte uygulayın.
- `0008_message_receipts.sql` iletildi/okundu bilgisini ekler: `conversation_participants` tablosuna `last_delivered_at` ve `last_read_at` damgaları gelir. Damgalar yalnızca `mark_messages_delivered` ve `mark_conversation_read` RPC'leriyle ileri alınır (doğrudan UPDATE politikası yoktur). Mevcut mesajlar okunmuş kabul edilir. Migration'ı yeni frontend'den önce uygulayın; eski frontend bu kolonları kullanmadığı için etkilenmez.
