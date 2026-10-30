# Cloudflare'e Deploy

Bu belge, `texting` uygulamasının Cloudflare Workers Static Assets üzerinde nasıl yayınlandığını anlatır.
Repodaki yapılandırma (`wrangler.jsonc`, `.node-version`, `package.json` script'leri) bu belgedeki
panel adımlarıyla birlikte çalışır; panel ayarları repoda görünmediği için burada kayıt altındadır.

## Mimari

- Uygulama tamamen istemci tarafında çalışan bir Vite + React SPA'dır. Kimlik doğrulama, veritabanı ve
  realtime Supabase'dedir; Cloudflare yalnızca `dist/` klasörünü sunar.
- `wrangler.jsonc`'de Worker betiği (`main`) yoktur. Statik dosya istekleri Worker çağrısı sayılmaz ve
  ücretlendirilmez.
- `assets.not_found_handling = "single-page-application"`: eşleşmeyen yollar `index.html` ile 200 döner.
  Pages'in aksine Workers bunu kendiliğinden yapmaz.

## Neden Pages değil

Cloudflare yeni projeler için Workers'ı öneriyor; yeni özellikler Workers'a geliyor. Tek kısıt:
**Workers, nameserver'ları Cloudflare'de olmayan custom domain'leri desteklemez.** Domaininiz başka bir
DNS sağlayıcısında kalacaksa Pages'e geçmek gerekir.

## İlk kurulum (bir kez)

### 1. Projeyi Cloudflare'e bağlama

1. Cloudflare paneli → **Workers & Pages** → **Create** → **Workers** sekmesi → **Import a repository**.
   (Pages sekmesinden oluşturmayın; o ayrı bir üründür.)
2. GitHub'ı bağlayın ve `smlcode-tech/texting` reposunu seçin.
3. Proje adı `texting` olmalı; `wrangler.jsonc` içindeki `name` ile aynı olmazsa Workers Builds hata verir.

### 2. Build ayarları

| Alan | Değer | Not |
|---|---|---|
| Production branch | `main` | |
| Build command | `npm run build` | `tsc -b && vite build`; tip hatası build'i durdurur |
| Deploy command | `npx wrangler deploy` | `npm run deploy` yazmayın: build iki kez çalışır |
| Non-production branch deploy command | `npx wrangler versions upload` | Varsayılan; branch'ler için önizleme sürümü oluşturur |
| Root directory | `/` | |

Node sürümü repodaki `.node-version` dosyasından (22) okunur. Vite 8, Node 20.19+ veya 22.12+ ister.

### 3. Build değişkenleri — en sık yapılan hata

`VITE_` ile başlayan değişkenler **build sırasında** JavaScript dosyasına gömülür; çalışma anında okunmaz.
Bu yüzden şuraya girilmelidir:

**Settings → Build → Build variables and secrets**

| Değişken | Değer |
|---|---|
| `VITE_SUPABASE_URL` | Supabase proje URL'si |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon key |

**Settings → Variables & Secrets** (runtime) bölümüne girilen değerler Vite'a ulaşmaz. Bu durumda
`src/lib/supabase.ts` placeholder adrese bağlanır ve uygulama hata vermeden çalışmaz görünür.

Bu iki değer gizli değildir: tarayıcıya gider ve `.env.example`'da da yer alır. Veri güvenliğini
Supabase RLS politikaları sağlar (`supabase/migrations/0004_rls_policies.sql`).

### 4. İlk deploy

Kaydedip deploy edin. Adres `https://texting.<hesap-alt-alanı>.workers.dev` olur.

### 5. Supabase Auth yönlendirme adresleri — zorunlu

Supabase → **Authentication** → **URL Configuration**:

- **Redirect URLs** listesine ekleyin:
  - `https://texting.<hesap-alt-alanı>.workers.dev/**`
  - Custom domain kullanıyorsanız `https://<domain>/**`
- **Site URL**: Vercel'i tamamen bırakıyorsanız yeni production adresiyle değiştirin.

Kodda değişiklik gerekmez: `src/components/AuthScreen.tsx` Google girişinde `redirectTo` olarak
`window.location.origin` kullanır. Adres listede yoksa Supabase kullanıcıyı Site URL'ye gönderir.

Google Cloud Console'da değişiklik gerekmez; OAuth callback adresi `*.supabase.co` üzerinde kalır.

### 6. Custom domain (isteğe bağlı)

Worker → **Settings** → **Domains & Routes** → **Add** → **Custom domain**. Domainin nameserver'ları
Cloudflare'de olmalıdır. Eklenen domaini 5. adımdaki Redirect URLs listesine de ekleyin.

### 7. Doğrulama

1. E-posta ile kayıt ve giriş.
2. Google ile giriş; dönüşte Cloudflare adresine düşüldüğünü kontrol edin.
3. Yeni sohbet başlatma ve mesaj gönderme.
4. İkinci bir tarayıcıda mesajın gerçek zamanlı geldiğini kontrol etme.
5. Sayfayı yenileme ve `/olmayan/yol` adresini açma; ikisi de uygulamayı yüklemelidir.

## Günlük kullanım

- `main`'e push → otomatik production deploy.
- Diğer branch'lere push → önizleme sürümü (production'a çıkmaz).
- Elle deploy (yerel makineden): `npx wrangler login`, ardından `npm run deploy`. `.env` dosyası yerel
  build'de kullanılır.
- Yerelde Workers runtime ile deneme: `npm run preview:cf`. Günlük geliştirme için `npm run dev` yeterlidir.

## Vercel ile ilişki

`vercel.json` geçiş doğrulanana kadar geri dönüş için repoda bırakıldı. **Bu dosyayı silmek Vercel
deploy'larını durdurmaz**: Vercel Vite projelerini dosya olmadan da tanır. Vercel'i bırakmak için:

1. Vercel panelinde projenin Git bağlantısını kesin ya da projeyi silin.
2. Supabase Redirect URLs listesinden Vercel adresini çıkarın.
3. `vercel.json` dosyasını ve `.gitignore`'daki `.vercel` satırını silin.

İki platform aynı anda açık kalırsa iki ayrı production adresiniz olur; Redirect URLs listesinden
çıkarılan adreste Google girişi bozulur.

## Sorun giderme

| Belirti | Olası neden |
|---|---|
| Uygulama açılıyor ama giriş/mesaj çalışmıyor, istekler `placeholder.supabase.co`'ya gidiyor | `VITE_*` değişkenleri runtime değişkeni olarak girilmiş; build değişkeni olmalı. Değiştirdikten sonra yeniden deploy edin. |
| Google girişinden sonra Vercel'e ya da `localhost`'a dönülüyor | Cloudflare adresi Supabase Redirect URLs listesinde yok. |
| Build `node` sürümü hatasıyla kırılıyor | `.node-version` silinmiş ya da build ayarlarında `NODE_VERSION` başka bir değere set edilmiş. |
| Workers Builds "name mismatch" hatası | Paneldeki Worker adı `wrangler.jsonc` içindeki `name` ile aynı değil. |
| Uygulama "duraklatıldı" hatası veriyor | Cloudflare'le ilgisi yok: Supabase ücretsiz planı kullanılmayan projeyi duraklatır (NFR-19). |
