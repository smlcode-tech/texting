import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ConversationSummary } from '../types/chat'

export function useConversations() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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

  useEffect(() => {
    const channel = supabase
      .channel('conversation-list')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        () => {
          void reload()
        },
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversation_participants' },
        () => {
          void reload()
        },
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [reload])

  return { conversations, isLoading, error, reload }
}
