import { describe, expect, it } from 'vitest'
import { formatDayLabel, formatMessageTime, initialsFor, mergeMessage, mergeMessages, messagePreview } from './format'
import type { Message } from '../types/chat'

function makeMessage(overrides: Partial<Message> & { id: string; created_at: string }): Message {
  return {
    conversation_id: 'conversation-1',
    sender_id: 'user-1',
    body: 'Merhaba',
    edited_at: null,
    ...overrides,
  }
}

describe('mergeMessage', () => {
  it('yeni mesajı ekler ve zamana göre sıralar', () => {
    const first = makeMessage({ id: 'a', created_at: '2026-01-01T10:00:00.000Z' })
    const second = makeMessage({ id: 'b', created_at: '2026-01-01T10:05:00.000Z' })

    expect(mergeMessage([second], first).map((message) => message.id)).toEqual(['a', 'b'])
  })

  it('aynı id ile gelen mesajı tekrar eklemez', () => {
    const message = makeMessage({ id: 'a', created_at: '2026-01-01T10:00:00.000Z' })

    expect(mergeMessage([message], message)).toHaveLength(1)
  })

  it('Realtime ve REST tarih biçimleri karışınca da zamana göre sıralar', () => {
    // REST biçimi: 'T' ayraçlı. Realtime biçimi: boşluk ayraçlı ve '+00' ekli.
    const later = makeMessage({ id: 'rest', created_at: '2026-11-03T10:41:30.000000+00:00' })
    const earlier = makeMessage({ id: 'realtime', created_at: '2026-11-03 10:41:26.973418+00' })

    expect(mergeMessage([later], earlier).map((message) => message.id)).toEqual(['realtime', 'rest'])
  })
})

describe('mergeMessages', () => {
  it('yeniden yüklemede mevcut mesajları korur ve yenileri sıralı ekler', () => {
    const a = makeMessage({ id: 'a', created_at: '2026-01-01T10:00:00.000Z' })
    const b = makeMessage({ id: 'b', created_at: '2026-01-01T10:05:00.000Z' })
    const c = makeMessage({ id: 'c', created_at: '2026-01-01T10:10:00.000Z' })

    expect(mergeMessages([c], [a, b, c]).map((message) => message.id)).toEqual(['a', 'b', 'c'])
  })

  it('yeni mesaj yoksa aynı listeyi döndürür (gereksiz render olmasın)', () => {
    const a = makeMessage({ id: 'a', created_at: '2026-01-01T10:00:00.000Z' })
    const list = [a]

    expect(mergeMessages(list, [a])).toBe(list)
  })
})

describe('messagePreview', () => {
  it('satır sonlarını tek boşluğa çevirir', () => {
    expect(messagePreview('Merhaba\n   dünya')).toBe('Merhaba dünya')
  })

  it('uzun gövdeyi kısaltır', () => {
    expect(messagePreview('a'.repeat(80))).toHaveLength(60)
  })
})

describe('initialsFor', () => {
  it('ad ve soyaddan baş harfleri üretir', () => {
    expect(initialsFor('Deniz Yılmaz')).toBe('DY')
  })

  it('boş isimde yer tutucu döner', () => {
    expect(initialsFor('   ')).toBe('?')
  })
})

describe('formatDayLabel', () => {
  it('bugünün tarihi için “Bugün” döner', () => {
    expect(formatDayLabel(new Date().toISOString())).toBe('Bugün')
  })
})

describe('formatMessageTime', () => {
  it('geçersiz tarihte boş string döner', () => {
    expect(formatMessageTime('geçersiz')).toBe('')
  })
})
