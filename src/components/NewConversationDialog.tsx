import { useEffect, useState } from 'react'
import type { User } from '../hooks/useConversations'

type NewConversationDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConversationCreated: (conversationId: string) => void
  getAvailableUsers: () => Promise<User[]>
  createConversation: (otherUserId: string) => Promise<string | null>
}

function NewConversationDialog({ isOpen, onClose, onConversationCreated, getAvailableUsers, createConversation }: NewConversationDialogProps) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!isOpen) return

    const loadUsers = async () => {
      setIsLoading(true)
      setError('')
      const availableUsers = await getAvailableUsers()
      setUsers(availableUsers)
      setIsLoading(false)
    }

    void loadUsers()
  }, [isOpen, getAvailableUsers])

  const handleCreateConversation = async () => {
    if (!selectedUserId) {
      setError('Lütfen bir kullanıcı seçin.')
      return
    }

    setIsLoading(true)
    setError('')
    const conversationId = await createConversation(selectedUserId)
    setIsLoading(false)

    if (conversationId) {
      onConversationCreated(conversationId)
      onClose()
      setSelectedUserId(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Yeni konuşma başlat</h2>
          <button className="dialog-close" type="button" onClick={onClose} aria-label="Kapat">✕</button>
        </div>

        <div className="dialog-body">
          {isLoading && <p className="dialog-state">Kullanıcılar yükleniyor...</p>}
          {!isLoading && users.length === 0 && <p className="dialog-state">Herhangi bir kullanıcı bulunamadı.</p>}
          {error && <p className="dialog-error" role="alert">{error}</p>}

          {!isLoading && users.length > 0 && (
            <div className="users-list">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className={`user-item ${selectedUserId === user.id ? 'selected' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="user-avatar">
                    {((user.displayName?.[0] ?? user.username?.[0] ?? 'U')).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <strong>{user.displayName || user.username || 'Kullanıcı'}</strong>
                    {user.username && <small>@{user.username}</small>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="dialog-footer">
          <button type="button" className="secondary-button" onClick={onClose} disabled={isLoading}>
            İptal
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={handleCreateConversation}
            disabled={!selectedUserId || isLoading}
          >
            {isLoading ? 'Oluşturuluyor...' : 'Konuşmayı başlat'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewConversationDialog
