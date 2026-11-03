// Sohbet alanının paylaşılan tipleri; Supabase tablolarının ve RPC
// dönüşlerinin istemci tarafı karşılıkları.

export type Profile = {
  id: string
  display_name: string
  // Benzersiz, küçük harf; tüm kullanıcılar listelenmediği için arkadaş
  // eklemenin tek yolu (bkz. 0007_friend_requests.sql).
  username: string
  avatar_url: string | null
  created_at: string
}

/** get_friend_requests RPC'sinin bir satırı; yalnızca bekleyen istekler döner. */
export type FriendRequest = {
  id: string
  // Çağıran kullanıcıya göre: 'incoming' ise yanıtlayabilir, 'outgoing' ise bekler.
  direction: 'incoming' | 'outgoing'
  status: 'pending' | 'accepted' | 'declined'
  created_at: string
  other: Profile
}

/** send_friend_request RPC dönüşü; karşılıklı istekte doğrudan 'accepted' gelir. */
export type SendFriendRequestResult =
  | { status: 'pending' }
  | { status: 'accepted'; conversation_id: string }

export type Conversation = {
  id: string
  is_group: boolean
  title: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  conversation_id: string
  sender_id: string
  body: string
  created_at: string
  edited_at: string | null
}

export type ConversationSummary = Conversation & {
  participants: Profile[]
  last_message: Message | null
}
