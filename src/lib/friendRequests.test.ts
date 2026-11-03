// friendRequests.ts yardımcılarının testleri.
import { describe, expect, it } from 'vitest'
import { partitionRequests } from './friendRequests'
import type { FriendRequest, Profile } from '../types/chat'

const profile = (id: string, username: string): Profile => ({
  id,
  display_name: username,
  username,
  avatar_url: null,
  created_at: '2026-01-01T10:00:00.000Z',
})

const request = (id: string, direction: FriendRequest['direction'], other: Profile): FriendRequest => ({
  id,
  direction,
  status: 'pending',
  created_at: '2026-01-01T10:00:00.000Z',
  other,
})

describe('partitionRequests', () => {
  it('istekleri gelen ve giden olarak ayırır, sırayı korur', () => {
    const result = partitionRequests([
      request('r1', 'incoming', profile('u1', 'ada')),
      request('r2', 'outgoing', profile('u2', 'cem')),
      request('r3', 'incoming', profile('u3', 'eda')),
    ])

    expect(result.incoming.map((item) => item.id)).toEqual(['r1', 'r3'])
    expect(result.outgoing.map((item) => item.id)).toEqual(['r2'])
  })

  it('boş listede iki boş grup döndürür', () => {
    expect(partitionRequests([])).toEqual({ incoming: [], outgoing: [] })
  })
})
