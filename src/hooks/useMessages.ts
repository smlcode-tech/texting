// Seçili sohbetin mesajları: ilk yükleme, Realtime ile canlı güncelleme ve gönderme.
// Mimarideki yeri: MessageThread'in veri kaynağı; ChatApp aktif sohbet id'siyle çağırır.
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { mergeMessage, mergeMessages } from '../lib/format'
import { subscribeLive, type LiveStatus } from '../lib/realtime'
import type { Message } from '../types/chat'

const MESSAGE_COLUMNS = 'id, conversation_id, sender_id, body, created_at, edited_at'

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [live, setLive] = useState<LiveStatus>({ connected: false, error: '' })

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      setError('')
      setIsLoading(false)
      setLive({ connected: false, error: '' })
      return
    }

    let isActive = true
    setIsLoading(true)
    setMessages([])

    // Hem ilk yüklemede hem kanal her (yeniden) bağlandığında çalışır. Birleştirme
    // (replace değil) kullanılır ki bu arada Realtime'dan gelmiş mesajlar kaybolmasın.
    const fetchMessages = async () => {
      const { data, error: queryError } = await supabase
        .from('messages')
        .select(MESSAGE_COLUMNS)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (!isActive) return

      if (queryError) {
        setError(queryError.message)
        setIsLoading(false)
        return
      }

      setError('')
      setMessages((current) => mergeMessages(current, (data ?? []) as Message[]))
      setIsLoading(false)
    }

    void fetchMessages()

    const unsubscribe = subscribeLive(
      () =>
        supabase.channel(`messages-${conversationId}`).on(
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
        ),
      {
        onSubscribed: () => void fetchMessages(),
        onStatus: (status) => {
          if (isActive) setLive(status)
        },
      },
    )

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [conversationId])

  const sendMessage = useCallback(
    async (body: string, senderId: string) => {
      const trimmedBody = body.trim()
      if (!conversationId || !trimmedBody) return false

      // Eklenen satır geri istenir ve hemen listeye konur: gönderen kendi mesajını
      // Realtime'a bağlı olmadan görür. Realtime'dan aynı mesaj gelirse id ile tekilleşir.
      const { data, error: insertError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
          body: trimmedBody,
        })
        .select(MESSAGE_COLUMNS)
        .single()

      if (insertError) {
        setError(insertError.message)
        return false
      }

      setError('')
      if (data) setMessages((current) => mergeMessage(current, data as Message))
      return true
    },
    [conversationId],
  )

  return { messages, isLoading, error, live, sendMessage }
}
