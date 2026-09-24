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
