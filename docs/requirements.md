# texting: Gereksinimler ve Durum Raporu (2026-10-20)

## Kapsam
Bu belge projenin şu an neyi yapıp neyi yapamadığını ve neyin değiştiğini özetler.
Kaynaklar şunlar: `src/` kodu, `supabase/migrations/0001–0006`, `implementation_plan.md`, `roadmap.md`, canlı Supabase projesi ve bugün çalıştırılan `vitest` (15/15 geçti).
Durum işaretleri: ✅ çalışıyor · ⚠️ kısmen (altyapı var, arayüz yok ya da kısıtlı) · ❌ yok.
**Önemli:** Bu oturumda gerçek bir kullanıcıyla giriş yapıp mesaj gönderme uçtan uca denenmedi. ✅ işaretleri kod incelemesine, birim testlerine ve veritabanı kontrolüne dayanıyor.

## Fonksiyonel Gereksinimler

### Kimlik doğrulama
| # | Gereksinim | Durum | Not |
|---|---|---|---|
| FR-1 | E-posta + parola ile kayıt (ad ≥2, parola ≥8, e-posta formatı) | ✅ | `AuthScreen.tsx` |
| FR-2 | 6 haneli e-posta kodu ile doğrulama, kodu tekrar gönderme | ✅ | `verifyOtp`, `resend` |
| FR-3 | E-posta + parola ile giriş | ✅ | |
| FR-4 | Oturumun kalıcı olması ve oturuma göre otomatik yönlendirme | ✅ | `useAuth`, `App.tsx` |
| FR-5 | Çıkış | ✅ | |
| FR-6 | Parola sıfırlama | ❌ | |
| FR-7 | Telefon/SMS ile giriş | ❌ | roadmap |
| FR-8 | Google ile giriş (Apple yok) | ✅ | `AuthScreen` içinde "Google ile devam et"; çıkış tüm oturumları kapatır (`scope: 'global'`) |

### Profil
| # | Gereksinim | Durum | Not |
|---|---|---|---|
| FR-9 | Kayıtta otomatik profil oluşturma, eski kullanıcılar için geriye dönük doldurma | ✅ | trigger `handle_new_user` |
| FR-10 | Profil düzenleme (ad, avatar) | ⚠️ | Veritabanı politikası ve `avatar_url` alanı var; arayüz ve yükleme yok |

### Sohbetler
| # | Gereksinim | Durum | Not |
|---|---|---|---|
| FR-11 | Kullanıcı listesinden 1:1 sohbet başlatma (aynı sohbet ikinci kez açılmaz) | ✅ | `create_direct_conversation` |
| FR-12 | Sohbet listesi: karşı tarafın adı, son mesaj önizlemesi, zaman, en yeni üstte | ✅ | `get_conversation_summaries` |
| FR-13 | Liste canlı güncellenir (yeni mesaj, yeni sohbet) | ✅ | `useConversations` |
| FR-14 | Grup sohbeti | ⚠️ | Şema hazır (`is_group`, `title`); RPC ve arayüz yok |
| FR-15 | Sohbetten ayrılma | ⚠️ | Politika var (`participants_delete_self`); arayüz yok |
| FR-16 | Kullanıcı arama | ❌ | Tüm kullanıcılar tek liste halinde gösteriliyor |

### Mesajlar
| # | Gereksinim | Durum | Not |
|---|---|---|---|
| FR-17 | Metin mesajı gönderme (Enter gönderir, Shift+Enter yeni satır, boş mesaj engelli) | ✅ | Testli (`MessageComposer.test.tsx`) |
| FR-18 | Mesaj geçmişi, gün ayraçları, saat, en alta otomatik kaydırma | ✅ | `MessageThread.tsx` |
| FR-19 | Yeni mesajların gerçek zamanlı gelmesi, tekrarların ayıklanması | ✅ | `useMessages`, `mergeMessage` (testli) |
| FR-20 | Mesaj düzenleme/silme | ⚠️ | Veritabanı izin veriyor (`edited_at`, politikalar); arayüz yok; canlı akış yalnızca yeni mesajları (INSERT) dinliyor |
| FR-21 | Okundu bilgisi, okunmamış sayacı, "yazıyor…" göstergesi | ❌ | |
| FR-22 | Fotoğraf, dosya, emoji | ❌ | |
| FR-23 | Push bildirim (FCM/APNs) | ❌ | roadmap |
| FR-24 | Çevrimdışı çalışma, yerel mesaj önbelleği | ❌ | roadmap |
| FR-25 | Eski mesajları sayfa sayfa yükleme | ❌ | Bir sohbetin tüm mesajları tek seferde yükleniyor |

## Fonksiyonel Olmayan Gereksinimler
| # | Alan | Gereksinim | Durum | Not |
|---|---|---|---|---|
| NFR-1 | Güvenlik | Tüm tablolarda RLS açık | ✅ | 4 tablo, 12 politika (canlıda doğrulandı) |
| NFR-2 | Güvenlik | Yalnızca sohbet üyeleri o sohbetin mesajlarını okur ve yazar; gönderen kimliği taklit edilemez | ✅ | `is_conversation_member`, `sender_id = auth.uid()` |
| NFR-3 | Güvenlik | Gerçek zamanlı olaylar da RLS'e tabi | ✅ | |
| NFR-4 | Güvenlik | SECURITY DEFINER fonksiyonları anonim erişime kapalı | ✅ | 0006 ile kapatıldı |
| NFR-5 | Gizlilik | Profillerin görünürlüğü kısıtlı olmalı | ⚠️ | MVP gereği her oturumlu kullanıcı tüm profilleri okuyabiliyor |
| NFR-6 | Güvenlik | Sızdırılmış parola koruması | ⚠️ | Supabase'de kapalı (advisor uyarısı) |
| NFR-7 | Veri bütünlüğü | Mesaj uzunluğu 1–4000 karakter | ⚠️ | Veritabanı kontrol ediyor; arayüzde sınır ya da sayaç yok |
| NFR-8 | Gizli bilgiler | Anahtarlar `.env` dosyasında, git dışında | ✅ | `.env.example` URL'si düzeltildi |
| NFR-9 | Performans | Sorgu indeksleri | ✅ | participants(user_id), messages(conversation_id, created_at) |
| NFR-10 | Performans | Gelen her mesajda sohbet listesinin tamamı yeniden çekiliyor | ⚠️ | Kullanıcı sayısı büyüdükçe maliyetli olur |
| NFR-11 | Güvenilirlik | Bağlantı koptuktan sonra kaçırılan mesajların yeniden senkronize edilmesi | ❌ | Yeniden bağlanınca veri tekrar çekilmiyor (kod incelemesine göre) |
| NFR-12 | Kullanılabilirlik | Mobil uyumlu düzen | ✅ | 860px ve 760px kırılma noktaları |
| NFR-13 | Yerelleştirme | Türkçe arayüz | ✅ / ⚠️ | Çoklu dil desteği yok; Supabase hata mesajları ham (İngilizce) gösteriliyor |
| NFR-14 | Erişilebilirlik | ARIA etiketleri, `aria-modal` dialog | ✅ / ⚠️ | Dialog'da odak tuzağı ve Escape ile kapatma yok |
| NFR-15 | Test | Birim ve bileşen testleri | ✅ | 15/15 (bugün çalıştırıldı) |
| NFR-16 | Test | Hook, RLS (pgTAP) ve uçtan uca testler | ❌ | |
| NFR-17 | Bakım | Şema migration dosyalarıyla yönetiliyor | ✅ / ⚠️ | Silme migration'ı `0000_drop_legacy_chat_schema` yalnızca uzak geçmişte var, repoda yok |
| NFR-18 | Bakım | Bağımlılık sürümleri sabit | ⚠️ | Test araçları `latest` |
| NFR-19 | Operasyon | CI, deploy, izleme | ❌ | Supabase ücretsiz planı kullanılmadığında projeyi duraklatıyor (bugün yaşandı) |

## Neler değişti

**Önceki commit'ler (main):**
- `2261a8e`: React ve Supabase Auth iskeleti
- `1c3c736`: sohbet şeması, RLS ve realtime migration'ları
- `4f79ba2`: 1:1 gerçek zamanlı mesajlaşma arayüzü ve hook'lar
- `c28ffbd`: Vitest kurulumu

**Bu oturumda:**
1. Supabase projesi `texting` duraklatılmış (INACTIVE) durumdaydı; geri yüklendi ve şu an ACTIVE_HEALTHY.
2. Geri yüklenen veritabanında repo ile uyumsuz eski bir şema vardı (`conversation_members` gibi). Tablolar boştu; silindi.
3. 0001–0005 olduğu gibi uygulandı; 2 mevcut kullanıcı için profil oluşturuldu.
4. `0006_revoke_function_grants.sql` yazıldı ve uygulandı (commit `d06ee8d`).
5. `.claude/launch.json` eklendi (commit `0274949`).
6. `.env` oluşturuldu (git dışında) ve URL düzeltildi; `.env.example` düzeltilmedi.
7. graphify grafiği üretildi (`graphify-out/`, commit edilmedi), `tree-sitter-sql` kuruldu.
8. Commit'ler `fix/db-function-grants` dalında.
9. GitHub'daki `main` bir süre Next.js uygulamasıydı (5–11 Eylül, 20 commit). Next.js tamamen kaldırıldı; `main` bu Vite dalına sıfırlandı. Eski Next.js geçmişi `backup/nextjs-main` etiketinde duruyor.
10. Next.js sürümündeki Google ile giriş Vite'ye taşındı. Vercel için `vercel.json` (`framework: vite`) eklendi.

## Doğrulama
- Durumlar `src/` kodundan, canlıdaki `list_tables`/`pg_policies` sorgularından ve `npx vitest run` çıktısından (15/15) alındı.
- Uçtan uca doğrulama (kayıt → giriş → sohbet başlatma → mesaj) kullanıcının kendi hesabıyla yapılmalı.
