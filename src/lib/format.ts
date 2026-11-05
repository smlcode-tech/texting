import type { Message } from '../types/chat'

const timeFormatter = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' })
const shortDateFormatter = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short' })
const longDateFormatter = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' })

function toDate(iso: string): Date | null {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString()
}

export function formatMessageTime(iso: string): string {
  const date = toDate(iso)
  return date ? timeFormatter.format(date) : ''
}

export function formatConversationTimestamp(iso: string): string {
  const date = toDate(iso)
  if (!date) return ''
  return isSameDay(date, new Date()) ? timeFormatter.format(date) : shortDateFormatter.format(date)
}

export function formatDayLabel(iso: string): string {
  const date = toDate(iso)
  if (!date) return ''
  const now = new Date()
  if (isSameDay(date, now)) return 'Bugün'
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (isSameDay(date, yesterday)) return 'Dün'
  return longDateFormatter.format(date)
}

export function messagePreview(body: string, maxLength = 60): string {
  const singleLine = body.replace(/\s+/g, ' ').trim()
  if (singleLine.length <= maxLength) return singleLine
  return `${singleLine.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`
}

export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toLocaleUpperCase('tr-TR')
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toLocaleUpperCase('tr-TR')
}

// Realtime `2026-11-03 10:41:26.97+00`, REST ise `2026-11-03T10:41:26.97+00:00`
// biçiminde tarih gönderiyor; metin olarak karşılaştırmak iki kaynağı karıştırınca
// sırayı bozuyordu (boşluk 'T'den önce sıralanır). Bu yüzden zamana çevrilip kıyaslanır.
export function timestampOf(iso: string): number {
  // '+00' gibi dakikasız ofsetleri Date.parse tanımıyor; '+00:00' biçimine tamamlanır.
  const normalized = iso.replace(' ', 'T').replace(/([+-]\d{2})$/, '$1:00')
  const time = Date.parse(normalized)
  return Number.isNaN(time) ? 0 : time
}

function byCreatedAt(a: Message, b: Message): number {
  return timestampOf(a.created_at) - timestampOf(b.created_at)
}

/** Tek mesajı ekler; aynı id zaten varsa (ör. hem insert dönüşü hem Realtime) listeyi değiştirmez. */
export function mergeMessage(list: Message[], incoming: Message): Message[] {
  if (list.some((message) => message.id === incoming.id)) return list
  return [...list, incoming].sort(byCreatedAt)
}

/**
 * Yeniden yüklenen mesaj listesini mevcut listeyle birleştirir.
 * Neden replace değil: yükleme sürerken Realtime veya gönderme ile gelen mesaj kaybolmasın.
 */
export function mergeMessages(list: Message[], incoming: Message[]): Message[] {
  const known = new Set(list.map((message) => message.id))
  const additions = incoming.filter((message) => !known.has(message.id))
  if (additions.length === 0) return list
  return [...list, ...additions].sort(byCreatedAt)
}
