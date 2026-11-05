import { describe, expect, it } from 'vitest'
import { mergeReceipt, messageStatus, unreadUpTo } from './receipts'
import type { Message, ParticipantReceipt } from '../types/chat'

function message(id: string, sender: string, createdAt: string): Message {
  return { id, conversation_id: 'c1', sender_id: sender, body: 'x', created_at: createdAt, edited_at: null }
}

const own = message('m1', 'me', '2026-11-05T10:00:00.000Z')

describe('messageStatus', () => {
  it('damgalar yüklenmemişse gönderildi döner', () => {
    expect(messageStatus(own, [])).toBe('sent')
  })

  it('karşı taraf almadıysa gönderildi döner', () => {
    const receipts: ParticipantReceipt[] = [
      { user_id: 'me', last_delivered_at: null, last_read_at: null },
      { user_id: 'ada', last_delivered_at: '2026-11-05T09:59:00.000Z', last_read_at: null },
    ]
    expect(messageStatus(own, receipts)).toBe('sent')
  })

  it('karşı tarafa ulaştıysa iletildi döner', () => {
    const receipts: ParticipantReceipt[] = [
      { user_id: 'ada', last_delivered_at: '2026-11-05T10:00:05.000Z', last_read_at: '2026-11-05T09:00:00.000Z' },
    ]
    expect(messageStatus(own, receipts)).toBe('delivered')
  })

  it('karşı taraf okuduysa okundu döner', () => {
    const receipts: ParticipantReceipt[] = [
      { user_id: 'ada', last_delivered_at: '2026-11-05T10:00:00.000Z', last_read_at: '2026-11-05T10:00:00.000Z' },
    ]
    expect(messageStatus(own, receipts)).toBe('read')
  })

  it('Realtime biçimindeki (boşluklu, +00) damgayı da tanır', () => {
    const receipts: ParticipantReceipt[] = [
      { user_id: 'ada', last_delivered_at: '2026-11-05 10:00:01+00', last_read_at: '2026-11-05 10:00:01+00' },
    ]
    expect(messageStatus(own, receipts)).toBe('read')
  })

  it('grupta herkes okumadıkça okundu saymaz', () => {
    const receipts: ParticipantReceipt[] = [
      { user_id: 'ada', last_delivered_at: '2026-11-05T10:01:00.000Z', last_read_at: '2026-11-05T10:01:00.000Z' },
      { user_id: 'can', last_delivered_at: '2026-11-05T10:01:00.000Z', last_read_at: null },
    ]
    expect(messageStatus(own, receipts)).toBe('delivered')
  })
})

describe('unreadUpTo', () => {
  const messages = [
    message('m1', 'ada', '2026-11-05T10:00:00.000Z'),
    message('m2', 'me', '2026-11-05T10:01:00.000Z'),
  ]

  it('okunmamış gelen mesajın zamanını döndürür', () => {
    const receipts: ParticipantReceipt[] = [{ user_id: 'me', last_delivered_at: null, last_read_at: null }]
    expect(unreadUpTo(messages, receipts, 'me')).toBe('2026-11-05T10:00:00.000Z')
  })

  it('zaten okunduysa null döner', () => {
    const receipts: ParticipantReceipt[] = [
      { user_id: 'me', last_delivered_at: null, last_read_at: '2026-11-05T10:00:00.000Z' },
    ]
    expect(unreadUpTo(messages, receipts, 'me')).toBeNull()
  })

  it('yalnızca kendi mesajlarımız varsa null döner', () => {
    expect(unreadUpTo([messages[1]], [], 'me')).toBeNull()
  })
})

describe('mergeReceipt', () => {
  it('aynı kullanıcının damgasını değiştirir', () => {
    const list: ParticipantReceipt[] = [{ user_id: 'ada', last_delivered_at: null, last_read_at: null }]
    const next = mergeReceipt(list, { user_id: 'ada', last_delivered_at: 'a', last_read_at: 'b' })
    expect(next).toEqual([{ user_id: 'ada', last_delivered_at: 'a', last_read_at: 'b' }])
  })
})
