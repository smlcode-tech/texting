import { describe, expect, it } from 'vitest'
import { conversationDisplayName, otherParticipant } from './conversations'
import type { ConversationSummary } from '../types/chat'

const directConversation: ConversationSummary = {
  id: 'conversation-1',
  is_group: false,
  title: null,
  created_by: 'user-1',
  created_at: '2026-01-01T10:00:00.000Z',
  updated_at: '2026-01-01T10:00:00.000Z',
  participants: [
    { id: 'user-1', display_name: 'Deniz Yılmaz', avatar_url: null, created_at: '2026-01-01T10:00:00.000Z' },
    { id: 'user-2', display_name: 'Ada Demir', avatar_url: null, created_at: '2026-01-01T10:00:00.000Z' },
  ],
  last_message: null,
}

describe('otherParticipant', () => {
  it('mevcut kullanıcı dışındaki katılımcıyı döndürür', () => {
    expect(otherParticipant(directConversation, 'user-1')?.display_name).toBe('Ada Demir')
  })
})

describe('conversationDisplayName', () => {
  it('1:1 sohbette karşı tarafın adını döndürür', () => {
    expect(conversationDisplayName(directConversation, 'user-1')).toBe('Ada Demir')
  })

  it('grup sohbetinde başlığı döndürür', () => {
    const groupConversation: ConversationSummary = {
      ...directConversation,
      is_group: true,
      title: 'Ekip',
    }

    expect(conversationDisplayName(groupConversation, 'user-1')).toBe('Ekip')
  })

  it('başlıksız grup sohbetinde katılımcı adlarını birleştirir', () => {
    const groupConversation: ConversationSummary = {
      ...directConversation,
      is_group: true,
      title: null,
    }

    expect(conversationDisplayName(groupConversation, 'user-1')).toBe('Ada Demir')
  })
})
