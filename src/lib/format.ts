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

export function mergeMessage(list: Message[], incoming: Message): Message[] {
  if (list.some((message) => message.id === incoming.id)) return list
  return [...list, incoming].sort((a, b) => a.created_at.localeCompare(b.created_at))
}
