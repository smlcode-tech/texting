// Gelen arkadaşlık isteklerini kabul/ret düğmeleriyle gösteren kenar çubuğu bölümü.
// Mimarideki yeri: ConversationList'in üstünde durur; istek yoksa hiç render edilmez
// ki boş bir kutu sohbet listesini aşağı itmesin.
import { useState } from 'react'
import type { FriendRequest } from '../../types/chat'
import { UserAvatar } from './UserAvatar'

type Props = {
  incoming: FriendRequest[]
  onRespond: (requestId: string, accept: boolean) => Promise<{ ok: true; conversationId: string | null } | { ok: false; error: string }>
  onAccepted: (conversationId: string) => void
}

export function FriendRequestsPanel({ incoming, onRespond, onAccepted }: Props) {
  // Yalnızca tıklanan satırın düğmeleri kilitlensin diye tek bir id tutulur.
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  if (incoming.length === 0) return null

  const respond = async (requestId: string, accept: boolean) => {
    setBusyId(requestId)
    setError('')
    const result = await onRespond(requestId, accept)
    setBusyId(null)

    if (!result.ok) {
      setError(result.error)
      return
    }
    if (result.conversationId) onAccepted(result.conversationId)
  }

  return (
    <section className="friend-requests" aria-label="Arkadaşlık istekleri">
      <h3>
        Arkadaşlık istekleri <span className="request-count">{incoming.length}</span>
      </h3>
      {error && <p className="form-message error" role="alert">{error}</p>}
      <ul className="friend-request-items">
        {incoming.map((request) => (
          <li key={request.id} className="friend-request-item">
            <UserAvatar name={request.other.display_name} />
            <span className="request-meta">
              <span className="conversation-name">{request.other.display_name}</span>
              <span className="request-username">@{request.other.username}</span>
            </span>
            <span className="request-actions">
              <button
                type="button"
                className="request-accept"
                disabled={busyId === request.id}
                onClick={() => void respond(request.id, true)}
              >
                Kabul et
              </button>
              <button
                type="button"
                className="request-decline"
                disabled={busyId === request.id}
                onClick={() => void respond(request.id, false)}
              >
                Reddet
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
