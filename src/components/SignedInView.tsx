import { useEffect, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

type SignedInViewProps = {
  session: Session
  onLogout: () => void
}

function SignedInView({ session, onLogout }: SignedInViewProps) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const accountMenuRef = useRef<HTMLDivElement>(null)

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

  const conversations = [
    { name: 'Ece Yılmaz', handle: '@eceyilmaz', preview: 'Sunum için son dosyayı...', time: '10:42', unread: 2, initials: 'EY', tone: 'peach', status: 'Şu an aktif', messages: ['Selam! Yeni sunum dosyasına bakabildin mi?', 'Baktım, giriş bölümüne birkaç not bıraktım. Genel akış çok iyi görünüyor.', 'Harika, teşekkürler! Son halini birazdan paylaşırım.', 'Sunum için son dosyayı bekliyorum, sonra müşteriye iletebiliriz.'] },
    { name: 'Ürün ekibi', handle: '4 üye', preview: 'Mert: Yeni akış yayında.', time: '09:18', unread: 0, initials: 'ÜE', tone: 'green', status: '3 kişi aktif', messages: ['Yeni akış yayında, test etmek isteyen var mı?', 'Ben şimdi kontrol ediyorum, birkaç dakika içinde not bırakırım.', 'Harika, özellikle mobil görünümü merak ediyorum.', 'Akşam toplantısından önce son geri bildirimleri toplayalım.'] },
    { name: 'Burak Aydın', handle: '@burakaydin', preview: 'Tamam, akşam konuşalım.', time: 'Dün', unread: 0, initials: 'BA', tone: 'blue', status: 'Dün aktifti', messages: ['Hafta sonu için plan kesinleşti mi?', 'Henüz değil, hava durumuna göre karar verelim.', 'Tamam, akşam konuşalım.', 'Olur, sana haber veririm.'] },
    { name: 'Tasarım notları', handle: '3 üye', preview: '3 kişi çevrimiçi', time: 'Pzt', unread: 0, initials: 'TN', tone: 'yellow', status: '3 kişi aktif', messages: ['Yeni renk paletini kanala ekledim.', 'Başlık tipografisiyle çok iyi uyum sağlıyor.', 'Kartların aralığını da biraz açalım.', 'Not aldım, bir sonraki taslakta güncellerim.'] },
  ]
  const selectedConversation = conversations[selectedConversationIndex]

  return (
    <main className="messenger-shell">
      <aside className="conversation-sidebar">
        <header className="sidebar-header">
          <div className="brand-row"><div className="brand-mark" aria-hidden="true">t</div><strong>texting</strong></div>
          <button className="icon-button" type="button" aria-label="Yeni mesaj">+</button>
        </header>
        <div className="sidebar-title"><div><span className="eyebrow">MESAJLAR</span><h1>Konuşmalar</h1></div><span className="conversation-count">4</span></div>
        <label className="search-box"><span aria-hidden="true">⌕</span><input placeholder="Konuşmalarda ara" aria-label="Konuşmalarda ara" /></label>
        <nav className="conversation-list" aria-label="Konuşmalar">
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

      <section className="chat-panel" aria-label={`${selectedConversation.name} ile konuşma`}>
        <header className="chat-header">
          <div className="chat-person"><span className={`avatar avatar-${selectedConversation.tone}`}>{selectedConversation.initials}</span><div><h2>{selectedConversation.name}</h2><span><i className="online-dot" /> {selectedConversation.status}</span></div></div>
          <div className="chat-actions"><button className="icon-button" type="button" aria-label="Ara">⌕</button><button className="icon-button" type="button" aria-label="Daha fazla seçenek">•••</button></div>
        </header>
        <div className="message-area">
          <div className="day-divider"><span>BUGÜN</span></div>
          {selectedConversation.messages.map((message, index) => (
            <div className={`message-row ${index % 2 === 0 ? 'incoming' : 'outgoing'}`} key={`${selectedConversation.name}-${message}`}>
              {index % 2 === 0 && <span className={`avatar avatar-${selectedConversation.tone} small-avatar`}>{selectedConversation.initials}</span>}
              <div>{index === 0 && <span className="message-author">{selectedConversation.name}</span>}<p>{message}</p><time>{['10:37', '10:39', '10:40', '10:42'][index]} {index % 2 === 1 && <span className="read-mark">✓✓</span>}</time></div>
            </div>
          ))}
        </div>
        <div className="composer-wrap"><div className="composer"><button className="composer-tool" type="button" aria-label="Dosya ekle">+</button><input placeholder="Bir mesaj yaz..." aria-label="Mesaj yaz" /><button className="composer-tool" type="button" aria-label="Emoji ekle">☺</button><button className="send-button" type="button" aria-label="Mesaj gönder">↑</button></div><small>Mesajların uçtan uca şifrelenir.</small></div>
      </section>

    </main>
  )
}

export default SignedInView