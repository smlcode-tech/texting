# Implementation Plan

## [Overview]
Mevcut Supabase Auth iskeleti üzerine, 1:1 (bireysel) gerçek zamanlı mesajlaşma ekleyerek `texting` uygulamasını işlevsel hale getirmek. Şema grup sohbetine hazır (`is_group`, `title`) tasarlanır ancak bu iterasyonun arayüzü 1:1 sohbete odaklanır.

Kapsam: Postgres şeması + migration'lar (`profiles`, `conversations`, `conversation_participants`, `messages`), RLS politikaları, `SECURITY DEFINER` yardımcı fonksiyonlar, özet/liste için RPC'ler, Supabase Realtime abonelikleri, tip tanımları, hook'lar, chat UI bileşenleri ve birim testleri. Yaklaşım: mevcut bağımlılık seti korunur (yeni runtime kütüphanesi eklenmez; sadece `@supabase/supabase-js` içindeki Realtime kullanılır), `src/App.tsx` modüler bileşen + hook yapısına bölünür ve mevcut görsel dil (`#183d3a`, `#d17f43`, `#f5f1e8`, DM Sans/Serif) yeniden kullanılır.

Varsayımlar / limitler:
- Tek bir Supabase projesi kullanılır; e-posta auth zaten yapılandırılmıştır.
- Realtime, projede etkin olan `supabase_realtime` publication üzerinden çalışır (migration ile eklenir).
- `profiles` tablosu **tüm oturumlu kullanıcılara okunabilir** (kullanıcı keşfi / yeni sohbet başlatma için bilinçli MVP tercihi). Üretimde kısıtlanmalıdır.
- Grup sohbeti şeması hazırdır fakat grup yönetimi UI'ı bu iterasyonun dışındadır.
- Ortamda `node`/`npm` kurulu değildir; bu nedenle `npm run build` ve `npm test` burada çalıştırılamamıştır. Kod, kurulum sonrası çalışacak şekilde yazılmıştır.

## [Types]
Yeni `src/types/chat.ts`:
```ts
export type Profile = { id: string; display_name: string; avatar_url: string | null; created_at: string }
export type Conversation = { id: string; is_group: boolean; title: string | null; created_by: string; created_at: string; updated_at: string }
export type ConversationSummary = Conversation & { participants: Profile[]; last_message: Message | null }
export type Message = { id: string; conversation_id: string; sender_id: string; body: string; created_at: string; edited_at: string | null }
```

Yeni `src/types/auth.ts`:
```ts
export type Mode = 'login' | 'register'
export type AuthStep = 'credentials' | 'otp'
```

## [Files]
Yeni dosyalar:
- `supabase/migrations/0001_profiles.sql` — profiles tablosu, `handle_new_user()` trigger, mevcut kullanıcı backfill.
- `supabase/migrations/0002_conversations.sql` — conversations + conversation_participants, indeksler, `private` schema ve RLS yardımcı fonksiyonları.
- `supabase/migrations/0003_messages.sql` — messages tablosu, `touch_conversation()` trigger, `create_direct_conversation()` ve `get_conversation_summaries()` RPC'leri.
- `supabase/migrations/0004_rls_policies.sql` — tüm tablolar için RLS politikaları + grant'ler.
- `supabase/migrations/0005_realtime.sql` — `supabase_realtime` publication'a `messages` ve `conversation_participants` ekleme (idempotent).
- `supabase/README.md` — migration'ların nasıl uygulanacağını anlatan kısa kılavuz.
- `src/lib/supabase.ts` — mevcut `src/supabase.ts` içeriği buraya taşınır.
- `src/types/chat.ts`, `src/types/auth.ts`
- `src/lib/format.ts` — `formatMessageTime`, `formatConversationTimestamp`, `formatDayLabel`, `messagePreview`, `initialsFor`, `mergeMessage`
- `src/lib/conversations.ts` — `otherParticipant`, `conversationDisplayName`
- `src/hooks/useAuth.ts`, `src/hooks/useProfiles.ts`, `src/hooks/useConversations.ts`, `src/hooks/useMessages.ts`
- `src/components/AuthScreen.tsx` — mevcut auth formu buraya taşınır.
- `src/components/chat/ChatApp.tsx`, `ConversationList.tsx`, `MessageThread.tsx`, `MessageComposer.tsx`, `NewConversationDialog.tsx`, `UserAvatar.tsx`
- `src/test/setup.ts`
- `src/lib/format.test.ts`, `src/lib/conversations.test.ts`, `src/components/chat/MessageComposer.test.tsx`

Değiştirilecek dosyalar:
- `src/App.tsx` — oturum yönlendirmesine indirgenir (yükleniyor → `session` varsa `ChatApp`, aksi halde `AuthScreen`).
- `src/styles.css` — chat arayüzü sınıfları eklenir.
- `vite.config.ts` — `vitest` `test` bloğu eklenir.
- `package.json` — `test` script'i eklenir, test devDependencies eklenir, `latest` sürümleri sabitlenir, `vite`/`typescript`/`@vitejs/plugin-react` `devDependencies`'e taşınır.

Silinecek / taşınacak dosyalar:
- `src/supabase.ts` silinir (yerine `src/lib/supabase.ts`); tüm importlar güncellenir.

## [Functions]
SQL (yeni):
- `public.handle_new_user()` — `auth.users` INSERT sonrası `profiles` kaydı açar; `raw_user_meta_data->>'name'` yoksa e-postanın yerel kısmını kullanır.
- `private.is_conversation_member(target_conversation_id uuid) returns boolean` — RLS özyinelemesini kıran `SECURITY DEFINER` yardımcı.
- `private.is_conversation_creator(target_conversation_id uuid) returns boolean` — katılımcı ekleme yetkisi için `SECURITY DEFINER` yardımcı.
- `private.touch_conversation()` — mesaj eklendiğinde `conversations.updated_at` alanını günceller (trigger).
- `public.create_direct_conversation(other_user_id uuid) returns uuid` — mevcut 1:1 sohbeti döndürür, yoksa oluşturur (yarış durumunu önler).
- `public.get_conversation_summaries()` — RLS uygulanan (`SECURITY INVOKER`) özet listesi: sohbet alanları + `participants` (jsonb) + `last_message` (jsonb).

Frontend (yeni):
- `useAuth()` (`src/hooks/useAuth.ts`) → `{ session, isSessionLoading, signOut }`; `getSession()` + `onAuthStateChange` aboneliği ve cleanup.
- `useProfiles(currentUserId)` (`src/hooks/useProfiles.ts`) → `{ profiles, isLoading, error, reload }`; kendisi hariç profilleri `display_name` sırasıyla getirir.
- `useConversations()` (`src/hooks/useConversations.ts`) → `{ conversations, isLoading, error, reload }`; `get_conversation_summaries` RPC'sini çağırır, `messages` INSERT ve `conversation_participants` INSERT olaylarında yeniden yükler.
- `useMessages(conversationId)` (`src/hooks/useMessages.ts`) → `{ messages, isLoading, error, sendMessage }`; mesajları çeker ve `postgres_changes` (`filter: conversation_id=eq.<id>`) ile canlı ekler.
- `mergeMessage(list, incoming)` (`src/lib/format.ts`) — id'ye göre dedupe + `created_at`'e göre sıralama.
- `otherParticipant(conversation, currentUserId)`, `conversationDisplayName(conversation, currentUserId)` (`src/lib/conversations.ts`) — 1:1 sohbette karşı tarafın adını üretir.

Değişecek fonksiyonlar:
- `App()` (`src/App.tsx`) — auth form mantığı `AuthScreen`'e taşınır; `App` yalnızca oturum yönlendirmesi yapar.
- `submit`, `verifyOtp`, `resendOtp`, `switchMode` — mantık aynen `src/components/AuthScreen.tsx` içine taşınır (davranış değişmez).

## [Classes]
Yok. Proje fonksiyonel bileşen + hook kalıbını kullanır; aynı yaklaşım korunur.

## [Dependencies]
- Yeni runtime bağımlılığı: **yok** (Realtime `@supabase/supabase-js` içinde mevcut).
- Yeni devDependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`.
- `package.json` düzeltmesi: `vite`, `typescript`, `@vitejs/plugin-react` `devDependencies`'e taşınır; `latest` aralıkları package-lock'taki sürümlere sabitlenir (`react@19.2.8`, `react-dom@19.2.8`, `vite@8.2.2`, `typescript@7.0.2`, `@vitejs/plugin-react@6.1.1`, `@supabase/supabase-js@2.114.0`).

## [Testing]
- `vitest` + `jsdom` (vite.config.ts içinde `test` bloğu), `src/test/setup.ts` ile `@testing-library/jest-dom/vitest`.
- Birim testleri: `mergeMessage` (dedupe + sıralama), `messagePreview`, `formatDayLabel`, `initialsFor`, `conversationDisplayName` / `otherParticipant`.
- Bileşen testi: `MessageComposer` boş girişte gönderimi engeller ve trim'lenmiş gövdeyi iletir.
- SQL/RLS testleri (opsiyonel, sonraki adım): `supabase test db` + pgTAP.
- Doğrulama komutları: `npm install`, `npm test`, `npm run build`.

## [Implementation Order]
1. `implementation_plan.md` oluştur.
2. SQL migration'larını yaz (0001 → 0005).
3. `supabase/README.md` ile uygulama adımlarını belgele.
4. `src/lib/supabase.ts` oluştur, `src/supabase.ts`'i sil, importları güncelle.
5. `src/types/auth.ts` ve `src/types/chat.ts` ekle.
6. `src/lib/format.ts` ve `src/lib/conversations.ts` ekle.
7. `src/hooks/useAuth.ts`, `useProfiles.ts`, `useConversations.ts`, `useMessages.ts` ekle.
8. `src/components/AuthScreen.tsx` oluştur (App.tsx'ten taşı).
9. `src/components/chat/*` bileşenlerini ekle.
10. `src/styles.css`'e chat stillerini ekle.
11. `src/App.tsx`'i sadeleştirip yeni bileşenleri bağla.
12. `package.json` + `vite.config.ts` güncelle, test dosyalarını ekle.
13. Kurulum sonrası `npm test` ve `npm run build` ile doğrula.


## Uygulanan Notlar (as-built)

1. **Kapsam:** Şema grup sohbetine hazırdır (`is_group`, `title`) ancak UI/akış 1:1 sohbete odaklanmıştır. Grup yönetimi UI'ı kapsam dışıdır.
2. **`profiles` okuma politikası:** MVP'de tüm oturumlu kullanıcılar profilleri okuyabilir (`using (true)`), çünkü kullanıcı keşfi / yeni sohbet başlatma buna bağlıdır. Üretimde `conversation_participants` üzerinden kısıtlanmalıdır.
3. **Test araç sürümleri:** `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom` için sürüm aralığı `latest` bırakılmıştır (kurulu ortamda hangi major sürümün mevcut olduğu doğrulanamadı). Mevcut bağımlılıklar (`react@^19.2.8`, `react-dom@^19.2.8`, `vite@^8.2.2`, `typescript@^7.0.2`, `@vitejs/plugin-react@^6.1.1`, `@supabase/supabase-js@^2.114.0`) package-lock'tan sabitlenmiştir.
4. **`package-lock.json` güncellendi:** Yerel Node/npm kurulumunda `npm install` çalıştırıldı; lock dosyası yeni devDependencies ile güncellendi (+1196 satır).
5. **Doğrulama yapıldı:** Ortamda `node`/`npm` bulunmadığı için Node.js **v24.21.0** (LTS, darwin-x64, SHA-256 doğrulanmış resmi tarball) `~/.local/node` altına kuruldu ve PATH `~/.zshrc`'ye eklendi. Ardından `npm install` (115 paket), `npm test` (**15/15 test geçti**) ve `npm run build` (`tsc -b` + `vite build`, hatasız) başarıyla çalıştırıldı. Yeni terminallerde PATH otomatik gelir; mevcut terminalde `source ~/.zshrc` veya yeni sekme gerekir. Homebrew ile kurmak tercih edilirse: `brew install node`.
6. **Realtime stratejisi:** `useConversations` olayları dinleyip özet listeyi `get_conversation_summaries` RPC'si ile yeniden yükler; `useMessages` ise aktif sohbet için `conversation_id=eq.<id>` filtresiyle mesajları canlı ekler. Realtime RLS'e tabidir; kullanıcı yalnızca üyesi olduğu sohbetlerin olaylarını alır.
7. **Test cleanup düzeltmesi:** Vitest `globals: true` olmadığı için Testing Library'nin otomatik DOM temizliği devreye girmiyordu; `src/test/setup.ts` içine manuel `afterEach(cleanup)` eklendi.


