import { conversationDisplayName, otherParticipant } from '../../lib/conversations'
import { formatConversationTimestamp, messagePreview } from '../../lib/format'
import type { ConversationSummary } from '../../types/chat'
import { UserAvatar } from './UserAvatar'

type Props = {
  conversations: ConversationSummary[]
  activeConversationId: string | null
  currentUserId: string
  isLoading: boolean
  error: string
  onSelect: (conversationId: string) => void
  onNewConversation: () => void
  onSignOut: () => void
}

export function ConversationList({
  conversations,
  activeConversationId,
  currentUserId,
  isLoading,
  error,
  onSelect,
  onNewConversation,
  onSignOut,
}: Props) {
  return (
    <aside className="conversation-panel">
      <header className="conversation-header">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">t</div>
          <strong>texting</strong>
        </div>
        <button className="signout-button" type="button" onClick={onSignOut}>Çıkış</button>
      </header>

      <button className="new-conversation-button" type="button" onClick={onNewConversation}>
        + Yeni sohbet
      </button>

      {error && <p className="form-message error" role="alert">{error}</p>}

      {isLoading ? (
        <p className="panel-hint">Sohbetler yükleniyor…</p>
      ) : conversations.length === 0 ? (
        <p className="panel-hint">Henüz sohbet yok. “Yeni sohbet” ile başla.</p>
      ) : (
        <ul className="conversation-items">
          {conversations.map((conversation) => {
            const partner = otherParticipant(conversation, currentUserId)
            const displayName = conversationDisplayName(conversation, currentUserId)
            const lastMessage = conversation.last_message
            return (
              <li key={conversation.id}>
                <button
                  className={`conversation-item${conversation.id === activeConversationId ? ' active' : ''}`}
                  type="button"
                  onClick={() => onSelect(conversation.id)}
                >
                  <UserAvatar name={partner?.display_name ?? displayName} />
                  <span className="conversation-meta">
                    <span className="conversation-name">{displayName}</span>
                    <span className="conversation-preview">
                      {lastMessage
                        ? `${lastMessage.sender_id === currentUserId ? 'Sen: ' : ''}${messagePreview(lastMessage.body)}`
                        : 'Henüz mesaj yok'}
                    </span>
                  </span>
                  {lastMessage && (
                    <span className="conversation-time">
                      {formatConversationTimestamp(lastMessage.created_at)}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </aside>
  )
}
