// Supabase Realtime kanallarını kullanıcı oturumuyla ve görünür durumla açan ortak yardımcı.
// Mimarideki yeri: useMessages, useConversations ve useFriendRequests hook'ları kanallarını
// bu fonksiyonla açar. Önceden üçü de `.subscribe()`u durum callback'i olmadan çağırıyordu;
// join reddedildiğinde hata hiçbir yere düşmüyor, mesajlar sessizce gelmiyordu.
import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type LiveStatus = { connected: boolean; error: string }

type Options = {
  // Kanal (yeniden) bağlandığında çağrılır: bağlantı yokken kaçan olaylar burada tamamlanır.
  onSubscribed: () => void
  onStatus: (status: LiveStatus) => void
}

/**
 * Kanalı, join'den önce güncel kullanıcı JWT'sini Realtime'a ileterek açar.
 *
 * Neden setAuth bekleniyor: proje JWT olmayan `sb_publishable_…` anahtarı kullanıyor.
 * Kanal, istemci oturum token'ını Realtime'a iletmeden açılırsa join payload'ında
 * access_token olmuyor (bkz. realtime-js RealtimeChannel.subscribe) ve RLS'li
 * postgres_changes aboneliği kullanıcı kimliği olmadan kuruluyor.
 *
 * Dönen fonksiyon kanalı kapatır; setAuth henüz bitmeden çağrılırsa kanal hiç açılmaz.
 */
export function subscribeLive(createChannel: () => RealtimeChannel, { onSubscribed, onStatus }: Options) {
  let channel: RealtimeChannel | null = null
  let isActive = true

  void (async () => {
    try {
      // Argümansız çağrı, supabase-js'in accessToken callback'iyle oturumdaki JWT'yi alır.
      await supabase.realtime.setAuth()
    } catch (error) {
      if (isActive) onStatus({ connected: false, error: `Oturum Realtime'a iletilemedi: ${String(error)}` })
    }
    if (!isActive) return

    channel = createChannel().subscribe((status, error) => {
      if (!isActive) return
      if (status === 'SUBSCRIBED') {
        onStatus({ connected: true, error: '' })
        onSubscribed()
        return
      }
      if (status === 'CLOSED') return
      // CHANNEL_ERROR ve TIMED_OUT: telefonda konsol olmadığı için sebep ekrana taşınır.
      const detail = error?.message || status
      onStatus({ connected: false, error: detail })
    })
  })()

  return () => {
    isActive = false
    if (channel) void supabase.removeChannel(channel)
  }
}
