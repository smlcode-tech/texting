import { useEffect, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useConversations } from '../hooks/useConversations'
import NewConversationDialog from './NewConversationDialog'

const formatTime = (value: string) => new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))

type SignedInViewProps = {
  session: Session
  onLogout: () => void
}

function SignedInView({ session, onLogout }: SignedInViewProps) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const [messageDraft, setMessageDraft] = useState('')
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)
  const { conversations, isLoading, error, sendMessage } = useConversations(session)

  useEffect(() => {
    if (!isAccountMenuOpen) return

    const closeMenu = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false)
      }
    }
    const closeMenuWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAccountMenuOpen(false)
    }

    document.addEventListener('mousedown', closeMenu)
    document.addEventListener('keydown', closeMenuWithEscape)
    return () => {
      document.removeEventListener('mousedown', closeMenu)
      document.removeEventListener('keydown', closeMenuWithEscape)
    }
  }, [isAccountMenuOpen])

  const selectedConversation = conversations[selectedConversationIndex]
  const submitMessage = async () => {
    if (!selectedConversation) return
    await sendMessage(selectedConversation.id, messageDraft)
    setMessageDraft('')
  }

  return (
    <main className="messenger-shell">
      <aside className="conversation-sidebar">
        <header className="sidebar-header">
          <div className="brand-row"><div className="brand-mark" aria-hidden="true">t</div><strong>texting</strong></div>
          <button className="icon-button" type="button" aria-label="Yeni mesaj" onClick={() => setIsNewConversationDialogOpen(true)}>+</button>
        </header>
        <div className="sidebar-title"><div><span className="eyebrow">MESAJLAR</span><h1>Konuşmalar</h1></div><span className="conversation-count">{conversations.length}</span></div>
        <label className="search-box"><span aria-hidden="true">⌕</span><input placeholder="Konuşmalarda ara" aria-label="Konuşmalarda ara" /></label>
        <nav className="conversation-list" aria-label="Konuşmalar">
          {isLoading && <p className="conversation-state">Konuşmalar yükleniyor...</p>}
          {!isLoading && !error && conversations.length === 0 && <p className="conversation-state">Henüz bir konuşmanız yok.</p>}
          {error && <p className="conversation-state error">{error}</p>}
          {conversations.map((conversation, index) => (
            <button className={`conversation-item ${index === selectedConversationIndex ? 'selected' : ''}`} type="button" key={conversation.name} onClick={() => setSelectedConversationIndex(index)} aria-pressed={index === selectedConversationIndex}>
              <span className={`avatar avatar-${conversation.tone}`}>{conversation.initials}</span>
              <span className="conversation-copy"><strong>{conversation.name}</strong><span>{conversation.preview}</span></span>
              <span className="conversation-meta"><small>{conversation.time}</small>{conversation.unread > 0 && <b>{conversation.unread}</b>}</span>
            </button>
          ))}
        </nav>
        <div className="profile-bar">
          <span className="avatar avatar-profile">{(session.user.email?.[0] ?? 'S').toUpperCase()}</span>
          <span><strong>{session.user.user_metadata?.name ?? 'Sen'}</strong><small>{session.user.email}</small></span>
          <div className="account-menu-wrap" ref={accountMenuRef}>
            <button className="more-button" type="button" aria-label="Hesap seçenekleri" aria-expanded={isAccountMenuOpen} onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}>•••</button>
            {isAccountMenuOpen && (
              <div className="account-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}><span>◉</span> Profil</button>
                <button type="button" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}><span>⚙</span> Ayarlar</button>
                <button type="button" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}><span>◌</span> Bildirimler</button>
                <div className="account-menu-divider" />
                <button className="menu-logout" type="button" role="menuitem" onClick={onLogout}><span>↪</span> Çıkış yap</button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <NewConversationDialog
        session={session}
        isOpen={isNewConversationDialogOpen}
        onClose={() => setIsNewConversationDialogOpen(false)}
        onConversationCreated={(conversationId) => {
          const index = conversations.findIndex((c) => c.id === conversationId)
          if (index >= 0) setSelectedConversationIndex(index)
        }}
      />

      {selectedConversation ? <section className="chat-panel" aria-label={`${selectedConversation.name} ile konuşma`}>
        <header className="chat-header">
          <div className="chat-person"><span className={`avatar avatar-${selectedConversation.tone}`}>{selectedConversation.initials}</span><div><h2>{selectedConversation.name}</h2><span><i className="online-dot" /> {selectedConversation.status}</span></div></div>
          <div className="chat-actions"><button className="icon-button" type="button" aria-label="Ara">⌕</button><button className="icon-button" type="button" aria-label="Daha fazla seçenek">•••</button></div>
        </header>
        <div className="message-area">
          <div className="day-divider"><span>BUGÜN</span></div>
          {selectedConversation.messages.map((message) => (
            <div className={`message-row ${message.isMine ? 'outgoing' : 'incoming'}`} key={message.id}>
              {!message.isMine && <span className={`avatar avatar-${selectedConversation.tone} small-avatar`}>{selectedConversation.initials}</span>}
              <div>{!message.isMine && <span className="message-author">{message.senderName}</span>}<p>{message.body}</p><time>{formatTime(message.createdAt)} {message.isMine && <span className="read-mark">✓</span>}</time></div>
            </div>
          ))}
        </div>
        <div className="composer-wrap"><div className="composer"><button className="composer-tool" type="button" aria-label="Dosya ekle">+</button><input value={messageDraft} onChange={(event) => setMessageDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void submitMessage() }} placeholder="Bir mesaj yaz..." aria-label="Mesaj yaz" /><button className="composer-tool" type="button" aria-label="Emoji ekle">☺</button><button className="send-button" type="button" aria-label="Mesaj gönder" onClick={() => void submitMessage()}>↑</button></div><small>Mesajların uçtan uca şifrelenir.</small></div>
      </section> : <section className="chat-panel empty-chat"><p>{isLoading ? 'Konuşmalar yükleniyor...' : error || 'Başlamak için bir konuşma oluşturun.'}</p></section>}

    </main>
  )
}

export default SignedInView