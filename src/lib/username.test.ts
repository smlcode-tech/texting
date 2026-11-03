// username.ts doğrulama kurallarının testleri.
import { describe, expect, it } from 'vitest'
import { normalizeUsername, validateUsername } from './username'

describe('normalizeUsername', () => {
  it('boşlukları ve baştaki @ işaretini atıp küçük harfe çevirir', () => {
    expect(normalizeUsername('  @Ada_42 ')).toBe('ada_42')
  })
})

describe('validateUsername', () => {
  it('geçerli kullanıcı adını kabul eder', () => {
    expect(validateUsername('deniz_42')).toBeNull()
  })

  it('büyük harfi normalize ettiği için kabul eder', () => {
    expect(validateUsername('Deniz')).toBeNull()
  })

  it('3 karakterden kısa adı reddeder', () => {
    expect(validateUsername('ab')).toMatch(/en az 3/)
  })

  it('20 karakterden uzun adı reddeder', () => {
    expect(validateUsername('a'.repeat(21))).toMatch(/en fazla 20/)
  })

  it('Türkçe karakter ve noktayı reddeder', () => {
    expect(validateUsername('şule.k')).toMatch(/yalnızca/)
  })
})
