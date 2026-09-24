import type { ConversationSummary, Profile } from '../types/chat'

export function otherParticipant(
  conversation: ConversationSummary,
  currentUserId: string,
): Profile | null {
  return conversation.participants.find((participant) => participant.id !== currentUserId) ?? null
}

export function conversationDisplayName(
  conversation: ConversationSummary,
  currentUserId: string,
): string {
  if (conversation.is_group) {
    if (conversation.title && conversation.title.trim()) return conversation.title.trim()
    return conversation.participants
      .filter((participant) => participant.id !== currentUserId)
      .map((participant) => participant.display_name)
      .join(', ') || 'Grup sohbeti'
  }

  const partner = otherParticipant(conversation, currentUserId)
  return partner?.display_name ?? 'Bilinmeyen kişi'
}
