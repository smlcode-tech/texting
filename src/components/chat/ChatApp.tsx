import { useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useConversations } from '../../hooks/useConversations'
import { useMessages } from '../../hooks/useMessages'
import { ConversationList } from './ConversationList'
import { MessageThread } from './MessageThread'
import { NewConversationDialog } from './NewConversationDialog'

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
    reload,
  } = useConversations()
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    messages,
    isLoading: isLoadingMessages,
    error: messagesError,
    sendMessage,
  } = useMessages(activeConversationId)

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? null

  const handleSend = (body: string) => sendMessage(body, currentUserId)

  const handleCreated = (conversationId: string) => {
    setIsDialogOpen(false)
    setActiveConversationId(conversationId)
    void reload()
  }

  return (
    <main className="chat-shell">
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversationId}
        currentUserId={currentUserId}
        isLoading={isLoadingConversations}
        error={conversationsError}
        onSelect={setActiveConversationId}
        onNewConversation={() => setIsDialogOpen(true)}
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
        <NewConversationDialog
          currentUserId={currentUserId}
          onClose={() => setIsDialogOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </main>
  )
}
