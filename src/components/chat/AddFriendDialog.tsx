// "Arkadaş ekle" penceresi.
// Mimarideki yeri: eski NewConversationDialog'un yerini alır. O bileşen tüm
// kullanıcıları listeleyip doğrudan sohbet açıyordu; bu bileşen yalnızca tam
// kullanıcı adıyla istek gönderir, sohbet karşı taraf kabul edince oluşur.
import { FormEvent, useState } from 'react'
import { validateUsername } from '../../lib/username'
import type { FriendRequest } from '../../types/chat'
import { UserAvatar } from './UserAvatar'

type Props = {
  ownUsername: string | null
  outgoing: FriendRequest[]
  onSend: (username: string) => Promise<{ ok: true; conversationId: string | null } | { ok: false; error: string }>
  onClose: () => void
  // Karşılıklı istekte sohbet anında açıldığında kullanıcı oraya götürülür.
  onConversationReady: (conversationId: string) => void
}

export function AddFriendDialog({ ownUsername, outgoing, onSend, onClose, onConversationReady }: Props) {
  const [username, setUsername] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setNotice('')

    const validationError = validateUsername(username)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSending(true)
    const result = await onSend(username)
    setIsSending(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    if (result.conversationId) {
      onConversationReady(result.conversationId)
      return
    }

    setUsername('')
    setNotice('İstek gönderildi. Kabul edildiğinde sohbet açılacak.')
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Arkadaş ekle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog-header">
          <h2>Arkadaş ekle</h2>
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Kapat">✕</button>
        </div>

        <p className="dialog-hint">
          Karşı tarafın kullanıcı adını tam olarak yaz. İsteği kabul ederse sohbet başlar.
          {ownUsername && (
            <>
              {' '}Senin kullanıcı adın: <strong>@{ownUsername}</strong>
            </>
          )}
        </p>

        <form className="add-friend-form" onSubmit={(event) => void submit(event)} noValidate>
          <label>
            Kullanıcı adı
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="ornek_kullanici"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </label>
          {error && <p className="form-message error" role="alert">{error}</p>}
          {notice && <p className="form-message notice" role="status">{notice}</p>}
          <button className="submit-button" type="submit" disabled={isSending || !username.trim()}>
            {isSending ? 'Gönderiliyor...' : 'İstek gönder'} <span aria-hidden="true">→</span>
          </button>
        </form>

        {outgoing.length > 0 && (
          <section className="request-section">
            <h3>Yanıt bekleyenler</h3>
            <ul className="profile-items">
              {outgoing.map((request) => (
                <li key={request.id} className="profile-item static">
                  <UserAvatar name={request.other.display_name} />
                  <span className="request-meta">
                    <span className="profile-name">{request.other.display_name}</span>
                    <span className="request-username">@{request.other.username}</span>
                  </span>
                  <span className="request-badge">Bekliyor</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
