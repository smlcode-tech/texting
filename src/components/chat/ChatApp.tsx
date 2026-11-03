// Oturum açmış kullanıcının ana ekranı: sohbet listesi, istekler ve mesaj alanı.
// Mimarideki yeri: hook'ları (sohbetler, mesajlar, arkadaşlık istekleri) tek yerde
// toplayıp alt bileşenlere dağıtan kompozisyon katmanı.
import { useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useConversations } from '../../hooks/useConversations'
import { useFriendRequests } from '../../hooks/useFriendRequests'
import { useMessages } from '../../hooks/useMessages'
import { useOwnProfile } from '../../hooks/useOwnProfile'
import { partitionRequests } from '../../lib/friendRequests'
import type { LiveStatus } from '../../lib/realtime'
import { AddFriendDialog } from './AddFriendDialog'
import { ConversationList } from './ConversationList'
import { FriendRequestsPanel } from './FriendRequestsPanel'
import { MessageThread } from './MessageThread'

type Props = {
  session: Session
  onSignOut: () => void
}

export function ChatApp({ session, onSignOut }: Props) {
  const currentUserId = session.user.id
  const {
    conversations,
    isLoading: isLoadingConversations,
    error: conversationsError,
    live: conversationsLive,
    reload,
  } = useConversations()
  const { requests, live: requestsLive, send, respond } = useFriendRequests()
  const ownProfile = useOwnProfile(currentUserId)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    messages,
    isLoading: isLoadingMessages,
    error: messagesError,
    live: messagesLive,
    sendMessage,
  } = useMessages(activeConversationId)

  // Telefonda konsol olmadığı için Realtime join hatası ekranda gösterilir; ilk hata yeterli.
  const liveError = [conversationsLive, requestsLive, messagesLive]
    .map((status: LiveStatus) => status.error)
    .find(Boolean)

  const { incoming, outgoing } = partitionRequests(requests)

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? null

  const handleSend = (body: string) => sendMessage(body, currentUserId)

  // Kabulde (bizim kabulümüz ya da karşılıklı istekte otomatik kabul) yeni sohbete geç.
  const openConversation = (conversationId: string) => {
    setIsDialogOpen(false)
    setActiveConversationId(conversationId)
    void reload()
  }

  return (
    <main className="chat-shell">
      {liveError && (
        <p className="live-banner" role="alert">
          Canlı bağlantı kurulamadı, yeni mesajlar için sayfayı yenilemen gerekebilir. Sebep: {liveError}
        </p>
      )}
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversationId}
        currentUserId={currentUserId}
        ownUsername={ownProfile?.username ?? null}
        isLoading={isLoadingConversations}
        error={conversationsError}
        requestsPanel={
          <FriendRequestsPanel incoming={incoming} onRespond={respond} onAccepted={openConversation} />
        }
        onSelect={setActiveConversationId}
        onAddFriend={() => setIsDialogOpen(true)}
        onSignOut={onSignOut}
      />

      <MessageThread
        conversation={activeConversation}
        messages={messages}
        currentUserId={currentUserId}
        isLoading={isLoadingMessages}
        error={messagesError}
        onSend={handleSend}
      />

      {isDialogOpen && (
        <AddFriendDialog
          ownUsername={ownProfile?.username ?? null}
          outgoing={outgoing}
          onSend={send}
          onClose={() => setIsDialogOpen(false)}
          onConversationReady={openConversation}
        />
      )}
    </main>
  )
}
