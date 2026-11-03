// Kullanıcının sohbet listesi (katılımcılar + son mesaj) ve canlı güncellemesi.
// Mimarideki yeri: ConversationList'in veri kaynağı. Yeni mesaj veya yeni katılımcı
// (arkadaşlık kabulü) olayında get_conversation_summaries RPC'sini yeniden çağırır.
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { subscribeLive, type LiveStatus } from '../lib/realtime'
import type { ConversationSummary } from '../types/chat'

export function useConversations() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [live, setLive] = useState<LiveStatus>({ connected: false, error: '' })

  const reload = useCallback(async () => {
    const { data, error: rpcError } = await supabase.rpc('get_conversation_summaries')

    if (rpcError) {
      setError(rpcError.message)
      setIsLoading(false)
      return
    }

    setError('')
    setConversations(((data ?? []) as ConversationSummary[]))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  useEffect(
    () =>
      subscribeLive(
        () =>
          supabase
            .channel('conversation-list')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
              void reload()
            })
            .on(
              'postgres_changes',
              { event: 'INSERT', schema: 'public', table: 'conversation_participants' },
              () => {
                void reload()
              },
            ),
        // Bağlantı yokken kaçan yeni sohbet/mesaj olayları yeniden bağlanınca tamamlanır.
        { onSubscribed: () => void reload(), onStatus: setLive },
      ),
    [reload],
  )

  return { conversations, isLoading, error, live, reload }
}
