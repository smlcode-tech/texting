// Arkadaşlık isteklerinin istemci durumu.
// Mimarideki yeri: 0007_friend_requests.sql'deki send_friend_request,
// respond_friend_request ve get_friend_requests RPC'lerinin tek giriş noktası.
// Silinen useProfiles.ts'in yerini alır: artık tüm kullanıcılar listelenmez,
// yalnızca bekleyen isteklerin karşı tarafı görünür.
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { normalizeUsername } from '../lib/username'
import type { FriendRequest, SendFriendRequestResult } from '../types/chat'

type ActionResult =
  | { ok: true; conversationId: string | null }
  | { ok: false; error: string }

/**
 * Bekleyen istekleri yükler ve Realtime ile güncel tutar.
 * Bileşenler RPC ayrıntısını bilmesin, sadece gönder/yanıtla çağırsın diye var.
 */
export function useFriendRequests() {
  const [requests, setRequests] = useState<FriendRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    const { data, error: rpcError } = await supabase.rpc('get_friend_requests')

    if (rpcError) {
      setError(rpcError.message)
      setIsLoading(false)
      return
    }

    setError('')
    setRequests((data ?? []) as FriendRequest[])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  useEffect(() => {
    // Filtre yok: Realtime RLS'e uyduğu için yalnızca gönderen ve alıcı olay alır.
    // UPDATE de dinlenir; karşı taraf kabul/ret edince giden istek listeden düşmeli.
    const channel = supabase
      .channel('friend-requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'friend_requests' }, () => {
        void reload()
      })
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [reload])

  const send = useCallback(
    async (username: string): Promise<ActionResult> => {
      const { data, error: rpcError } = await supabase.rpc('send_friend_request', {
        target_username: normalizeUsername(username),
      })
      if (rpcError) return { ok: false, error: rpcError.message }

      void reload()
      const result = data as SendFriendRequestResult
      // Karşı taraf zaten istek atmışsa veritabanı otomatik kabul edip sohbeti açar.
      return { ok: true, conversationId: result.status === 'accepted' ? result.conversation_id : null }
    },
    [reload],
  )

  const respond = useCallback(
    async (requestId: string, accept: boolean): Promise<ActionResult> => {
      const { data, error: rpcError } = await supabase.rpc('respond_friend_request', {
        request_id: requestId,
        accept,
      })
      if (rpcError) return { ok: false, error: rpcError.message }

      void reload()
      return { ok: true, conversationId: typeof data === 'string' ? data : null }
    },
    [reload],
  )

  return { requests, isLoading, error, reload, send, respond }
}
