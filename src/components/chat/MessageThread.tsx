import { useEffect, useRef } from 'react'
import { conversationDisplayName, otherParticipant } from '../../lib/conversations'
import { formatDayLabel, formatMessageTime } from '../../lib/format'
import type { ConversationSummary, Message } from '../../types/chat'
import { MessageComposer } from './MessageComposer'
import { UserAvatar } from './UserAvatar'

type Props = {
  conversation: ConversationSummary | null
  messages: Message[]
  currentUserId: string
  isLoading: boolean
  error: string
  onSend: (body: string) => Promise<boolean>
}

export function MessageThread({
  conversation,
  messages,
  currentUserId,
  isLoading,
  error,
  onSend,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, conversation?.id])

  if (!conversation) {
    return (
      <section className="thread-panel thread-empty">
        <div className="thread-empty-content">
          <span className="eyebrow">TEXTING</span>
          <h2>Bir sohbet seç.</h2>
          <p>Soldaki listeden bir konuşma seç ya da “Yeni sohbet” ile başla.</p>
        </div>
      </section>
    )
  }

  const displayName = conversationDisplayName(conversation, currentUserId)
  const partner = otherParticipant(conversation, currentUserId)

  return (
    <section className="thread-panel">
      <header className="thread-header">
        <UserAvatar name={partner?.display_name ?? displayName} />
        <div className="thread-heading">
          <span className="thread-name">{displayName}</span>
          <span className="thread-subtitle">Gerçek zamanlı bağlantı</span>
        </div>
      </header>

      <div className="message-list">
        {isLoading && <p className="panel-hint">Mesajlar yükleniyor…</p>}
        {error && <p className="form-message error" role="alert">{error}</p>}
        {!isLoading && messages.length === 0 && (
          <p className="panel-hint">İlk mesajı sen yaz.</p>
        )}

        {messages.map((message, index) => {
          const previous = index > 0 ? messages[index - 1] : null
          const showDay =
            !previous ||
            new Date(previous.created_at).toDateString() !==
              new Date(message.created_at).toDateString()
          const isOwn = message.sender_id === currentUserId

          return (
            <div key={message.id}>
              {showDay && (
                <p className="day-divider"><span>{formatDayLabel(message.created_at)}</span></p>
              )}
              <div className={`message-row${isOwn ? ' own' : ''}`}>
                <div className="message-bubble">
                  <p className="message-body">{message.body}</p>
                  <span className="message-time">{formatMessageTime(message.created_at)}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <MessageComposer onSend={onSend} />
    </section>
  )
}
