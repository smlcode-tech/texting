// Kullanıcı adı kuralları: istemci tarafı doğrulama.
// Mimarideki yeri: 0007_friend_requests.sql'deki profiles_username_format
// kısıtlamasının aynası. Veritabanı asıl otoritedir; bu dosya yalnızca
// kullanıcıya sunucuya gitmeden anlaşılır hata göstermek için var.

/** Veritabanındaki check kısıtlamasıyla birebir aynı olmalı. */
export const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/

/**
 * Kullanıcının yazdığını veritabanının karşılaştırdığı biçime getirir.
 * Baştaki "@" kabul edilir çünkü kullanıcı adları arayüzde "@ada" diye gösteriliyor
 * ve insanlar onu olduğu gibi kopyalayıp yapıştırıyor.
 */
export function normalizeUsername(input: string): string {
  return input.trim().replace(/^@/, '').toLowerCase()
}

/** Geçerliyse null, değilse gösterilecek Türkçe hata mesajı döner. */
export function validateUsername(input: string): string | null {
  const username = normalizeUsername(input)
  if (username.length < 3) return 'Kullanıcı adı en az 3 karakter olmalı.'
  if (username.length > 20) return 'Kullanıcı adı en fazla 20 karakter olabilir.'
  if (!USERNAME_PATTERN.test(username)) {
    return 'Kullanıcı adında yalnızca küçük harf, rakam ve alt çizgi (_) kullanılabilir.'
  }
  return null
}
