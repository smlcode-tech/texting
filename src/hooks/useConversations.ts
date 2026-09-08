import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../supabase'

export type Conversation = {
  id: string
  name: string
  handle: string
  preview: string
  time: string
  unread: number
  initials: string
  tone: 'peach' | 'green' | 'blue' | 'yellow'
  status: string
  messages: Message[]
}

export type Message = {
  id: string
  body: string
  senderId: string
  senderName: string
  createdAt: string
  isMine: boolean
}

type ConversationRow = {
  id: string
  title: string | null
  updated_at: string
}

type MemberRow = {
  conversation_id: string
  user_id: string
  display_name: string | null
  username: string | null
}

type MessageRow = {
  id: string
  conversation_id: string
  sender_id: string
  body: string
  created_at: string
}

const initialsFor = (name: string) => name.split(/\s+/).filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '?'
const formatTime = (value: string) => new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))

export function useConversations(session: Session) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadConversations = async () => {
    setIsLoading(true)
    setError('')

    const { data: ownMemberships, error: membershipsError } = await supabase
      .from('conversation_members')
      .select('conversation_id')
      .eq('user_id', session.user.id)

    if (membershipsError) {
      setError(membershipsError.message)
      setIsLoading(false)
      return
    }

    const conversationIds = (ownMemberships ?? []).map((row) => row.conversation_id)

    if (conversationIds.length === 0) {
      setConversations([])
      setIsLoading(false)
      return
    }

    const { data: memberships, error: allMembershipsError } = await supabase
      .from('conversation_members')
      .select('conversation_id, user_id, profiles(display_name, username)')
      .in('conversation_id', conversationIds)

    if (allMembershipsError) {
      setError(allMembershipsError.message)
      setIsLoading(false)
      return
    }

    const memberRows = ((memberships ?? []) as unknown as Array<{ conversation_id: string; user_id: string; profiles: { display_name: string | null; username: string | null } | null }>).map((row) => ({
      ...row,
      display_name: row.profiles?.display_name ?? null,
      username: row.profiles?.username ?? null,
    }))

    const [{ data: conversationRows, error: conversationsError }, { data: messageRows, error: messagesError }] = await Promise.all([
      supabase.from('conversations').select('id, title, updated_at').in('id', conversationIds).order('updated_at', { ascending: false }),
      supabase.from('messages').select('id, conversation_id, sender_id, body, created_at, profiles(display_name)').in('conversation_id', conversationIds).order('created_at', { ascending: true }),
    ])

    if (conversationsError || messagesError) {
      setError((conversationsError ?? messagesError)?.message ?? 'Konuşmalar yüklenemedi.')
      setIsLoading(false)
      return
    }

    const rows = (messageRows ?? []) as unknown as Array<MessageRow & { profiles: { display_name: string | null } | null }>
    const nextConversations = ((conversationRows ?? []) as ConversationRow[]).map((conversation, index) => {
      const members = memberRows.filter((member) => member.conversation_id === conversation.id)
      const otherMember = members.find((member) => member.user_id !== session.user.id)
      const name = conversation.title || otherMember?.display_name || otherMember?.username || 'Konuşma'
      const messages = rows.filter((message) => message.conversation_id === conversation.id).map((message) => ({
        id: message.id,
        body: message.body,
        senderId: message.sender_id,
        senderName: message.profiles?.display_name || (message.sender_id === session.user.id ? 'Sen' : name),
        createdAt: message.created_at,
        isMine: message.sender_id === session.user.id,
      }))
      const lastMessage = messages[messages.length - 1]

      return {
        id: conversation.id,
        name,
        handle: otherMember?.username ? `@${otherMember.username}` : `${members.length} üye`,
        preview: lastMessage?.body || 'Henüz mesaj yok.',
        time: lastMessage ? formatTime(lastMessage.createdAt) : formatTime(conversation.updated_at),
        unread: 0,
        initials: initialsFor(name),
        tone: (['peach', 'green', 'blue', 'yellow'] as const)[index % 4],
        status: 'Çevrimiçi',
        messages,
      }
    })

    setConversations(nextConversations)
    setIsLoading(false)
  }

  useEffect(() => {
    void loadConversations()
    const channel = supabase.channel(`conversations:${session.user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => void loadConversations())
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [session.user.id])

  const sendMessage = async (conversationId: string, body: string) => {
    const trimmedBody = body.trim()
    if (!trimmedBody) return
    const { error: sendError } = await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: session.user.id, body: trimmedBody })
    if (sendError) {
      setError(sendError.message)
      return
    }
    await supabase.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', conversationId)
    await loadConversations()
  }

  return { conversations, isLoading, error, sendMessage, reload: loadConversations }
}