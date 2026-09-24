import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { mergeMessage } from '../lib/format'
import type { Message } from '../types/chat'

const MESSAGE_COLUMNS = 'id, conversation_id, sender_id, body, created_at, edited_at'

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      setError('')
      setIsLoading(false)
      return
    }

    let isActive = true
    setIsLoading(true)

    void (async () => {
      const { data, error: queryError } = await supabase
        .from('messages')
        .select(MESSAGE_COLUMNS)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (!isActive) return

      if (queryError) {
        setError(queryError.message)
        setMessages([])
        setIsLoading(false)
        return
      }

      setError('')
      setMessages((data ?? []) as Message[])
      setIsLoading(false)
    })()

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (!isActive) return
          setMessages((current) => mergeMessage(current, payload.new as Message))
        },
      )
      .subscribe()

    return () => {
      isActive = false
      void supabase.removeChannel(channel)
    }
  }, [conversationId])

  const sendMessage = useCallback(
    async (body: string, senderId: string) => {
      const trimmedBody = body.trim()
      if (!conversationId || !trimmedBody) return false

      const { error: insertError } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_id: senderId,
        body: trimmedBody,
      })

      if (insertError) {
        setError(insertError.message)
        return false
      }

      setError('')
      return true
    },
    [conversationId],
  )

  return { messages, isLoading, error, sendMessage }
}
