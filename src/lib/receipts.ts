// İletildi/okundu hesaplaması. Mimarideki yeri: useMessages'ın çektiği katılımcı
// damgalarından (0008_message_receipts.sql) MessageThread'deki tikleri üretir.
import { timestampOf } from './format'
import type { Message, MessageStatus, ParticipantReceipt } from '../types/chat'

function reached(stamp: string | null, createdAt: number): boolean {
  return stamp !== null && timestampOf(stamp) >= createdAt
}

/**
 * Gönderen dışındaki tüm katılımcılar okuduysa 'read', hepsine ulaştıysa
 * 'delivered', aksi halde 'sent'. Grupta "herkes" kuralı WhatsApp'takiyle aynıdır.
 */
export function messageStatus(message: Message, receipts: ParticipantReceipt[]): MessageStatus {
  const others = receipts.filter((receipt) => receipt.user_id !== message.sender_id)
  // Damgalar henüz yüklenmediyse yanlışlıkla "okundu" göstermemek için.
  if (others.length === 0) return 'sent'

  const createdAt = timestampOf(message.created_at)
  if (others.every((receipt) => reached(receipt.last_read_at, createdAt))) return 'read'
  if (others.every((receipt) => reached(receipt.last_delivered_at, createdAt))) return 'delivered'
  return 'sent'
}

/**
 * Başkasından gelen ve henüz okundu işaretlenmemiş son mesajın zamanı; yoksa null.
 * mark_conversation_read'e up_to olarak gider, null ise gereksiz RPC atılmaz.
 */
export function unreadUpTo(
  messages: Message[],
  receipts: ParticipantReceipt[],
  currentUserId: string,
): string | null {
  const own = receipts.find((receipt) => receipt.user_id === currentUserId)
  const lastIncoming = [...messages].reverse().find((message) => message.sender_id !== currentUserId)
  if (!lastIncoming) return null
  if (own && reached(own.last_read_at, timestampOf(lastIncoming.created_at))) return null
  return lastIncoming.created_at
}

/** Realtime UPDATE ile gelen damgayı listeye yazar (kullanıcı başına tek kayıt). */
export function mergeReceipt(list: ParticipantReceipt[], incoming: ParticipantReceipt): ParticipantReceipt[] {
  const exists = list.some((receipt) => receipt.user_id === incoming.user_id)
  if (!exists) return [...list, incoming]
  return list.map((receipt) => (receipt.user_id === incoming.user_id ? incoming : receipt))
}
