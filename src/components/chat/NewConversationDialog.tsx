import { useState } from 'react'
import { useProfiles } from '../../hooks/useProfiles'
import { supabase } from '../../lib/supabase'
import { UserAvatar } from './UserAvatar'

type Props = {
  currentUserId: string
  onClose: () => void
  onCreated: (conversationId: string) => void
}

export function NewConversationDialog({ currentUserId, onClose, onCreated }: Props) {
  const { profiles, isLoading, error } = useProfiles(currentUserId)
  const [selectedId, setSelectedId] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  const startConversation = async () => {
    if (!selectedId) return

    setIsCreating(true)
    setCreateError('')
    const { data, error: rpcError } = await supabase.rpc('create_direct_conversation', {
      other_user_id: selectedId,
    })
    setIsCreating(false)

    if (rpcError) {
      setCreateError(rpcError.message)
      return
    }

    if (typeof data === 'string') onCreated(data)
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Yeni sohbet"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog-header">
          <h2>Yeni sohbet</h2>
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Kapat">✕</button>
        </div>

        <p className="panel-hint">Konuşmak istediğin kişiyi seç.</p>

        {error && <p className="form-message error" role="alert">{error}</p>}
        {isLoading && <p className="panel-hint">Kişiler yükleniyor…</p>}

        {!isLoading && profiles.length === 0 && (
          <p className="panel-hint">Henüz başka kullanıcı yok.</p>
        )}

        {!isLoading && profiles.length > 0 && (
          <ul className="profile-items">
            {profiles.map((profile) => (
              <li key={profile.id}>
                <button
                  className={`profile-item${profile.id === selectedId ? ' active' : ''}`}
                  type="button"
                  onClick={() => setSelectedId(profile.id)}
                >
                  <UserAvatar name={profile.display_name} />
                  <span className="profile-name">{profile.display_name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {createError && <p className="form-message error" role="alert">{createError}</p>}

        <button
          className="submit-button"
          type="button"
          onClick={() => void startConversation()}
          disabled={!selectedId || isCreating}
        >
          {isCreating ? 'Oluşturuluyor...' : 'Sohbeti başlat'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
