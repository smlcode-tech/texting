// Seçili sohbetin mesajları: ilk yükleme, Realtime ile canlı güncelleme, gönderme
// ve iletildi/okundu damgaları.
// Mimarideki yeri: MessageThread'in veri kaynağı; ChatApp aktif sohbet id'siyle çağırır.
import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { mergeMessage, mergeMessages } from '../lib/format'
import { subscribeLive, type LiveStatus } from '../lib/realtime'
import { mergeReceipt, unreadUpTo } from '../lib/receipts'
import type { Message, ParticipantReceipt } from '../types/chat'

const MESSAGE_COLUMNS = 'id, conversation_id, sender_id, body, created_at, edited_at'
const RECEIPT_COLUMNS = 'user_id, last_delivered_at, last_read_at'

function toReceipt(row: Record<string, unknown>): ParticipantReceipt {
  return {
    user_id: row.user_id as string,
    last_delivered_at: (row.last_delivered_at as string | null) ?? null,
    last_read_at: (row.last_read_at as string | null) ?? null,
  }
}

// Sekme arka plandayken mesaj ekranda olsa da okunmuş sayılmaz.
function useIsPageVisible() {
  const [isVisible, setIsVisible] = useState(() => document.visibilityState === 'visible')
  useEffect(() => {
    const update = () => setIsVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  return isVisible
}

export function useMessages(conversationId: string | null, currentUserId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [receipts, setReceipts] = useState<ParticipantReceipt[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [live, setLive] = useState<LiveStatus>({ connected: false, error: '' })

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      setReceipts([])
      setError('')
      setIsLoading(false)
      setLive({ connected: false, error: '' })
      return
    }

    let isActive = true
    setIsLoading(true)
    setMessages([])
    setReceipts([])

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

    // Damgalar yalnızca ileri gittiği için replace güvenli; bağlantı kopukken
    // kaçan UPDATE olayları yeniden bağlanınca bu çağrıyla tamamlanır.
    const fetchReceipts = async () => {
      const { data, error: queryError } = await supabase
        .from('conversation_participants')
        .select(RECEIPT_COLUMNS)
        .eq('conversation_id', conversationId)

      if (!isActive || queryError) return
      setReceipts((data ?? []).map((row) => toReceipt(row as Record<string, unknown>)))
    }

    void fetchMessages()
    void fetchReceipts()

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
        ).on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'conversation_participants',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            if (!isActive) return
            setReceipts((current) => mergeReceipt(current, toReceipt(payload.new)))
          },
        ),
      {
        onSubscribed: () => {
          void fetchMessages()
          void fetchReceipts()
        },
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

  // Sohbet açık ve sekme görünürken, gelen son mesaja kadar okundu işaretle.
  // Aynı up_to için tekrar RPC atılmasın diye son istek hatırlanır; damga
  // Realtime'dan döndüğünde unreadUpTo zaten null olur.
  const isPageVisible = useIsPageVisible()
  const requestedReadRef = useRef<string | null>(null)
  const pendingReadUpTo = conversationId && !isLoading ? unreadUpTo(messages, receipts, currentUserId) : null

  useEffect(() => {
    if (!conversationId || !isPageVisible || !pendingReadUpTo) return
    const key = `${conversationId}:${pendingReadUpTo}`
    if (requestedReadRef.current === key) return
    requestedReadRef.current = key

    void supabase
      .rpc('mark_conversation_read', { target_conversation_id: conversationId, up_to: pendingReadUpTo })
      .then(({ error: rpcError }) => {
        // Başarısızsa bir sonraki değişiklikte yeniden denensin.
        if (rpcError && requestedReadRef.current === key) requestedReadRef.current = null
      })
  }, [conversationId, isPageVisible, pendingReadUpTo])

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

  return { messages, receipts, isLoading, error, live, sendMessage }
}
