import type { Session } from '@supabase/supabase-js'

type SignedInViewProps = {
  session: Session
  onLogout: () => void
}

function SignedInView({ session, onLogout }: SignedInViewProps) {
  const conversations = [
    { name: 'Ece Yılmaz', preview: 'Sunum için son dosyayı...', time: '10:42', unread: 2, initials: 'EY', tone: 'peach' },
    { name: 'Ürün ekibi', preview: 'Mert: Yeni akış yayında.', time: '09:18', unread: 0, initials: 'ÜE', tone: 'green' },
    { name: 'Burak Aydın', preview: 'Tamam, akşam konuşalım.', time: 'Dün', unread: 0, initials: 'BA', tone: 'blue' },
    { name: 'Tasarım notları', preview: '3 kişi çevrimiçi', time: 'Pzt', unread: 0, initials: 'TN', tone: 'yellow' },
  ]

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
            <button className={`conversation-item ${index === 0 ? 'selected' : ''}`} type="button" key={conversation.name}>
              <span className={`avatar avatar-${conversation.tone}`}>{conversation.initials}</span>
              <span className="conversation-copy"><strong>{conversation.name}</strong><span>{conversation.preview}</span></span>
              <span className="conversation-meta"><small>{conversation.time}</small>{conversation.unread > 0 && <b>{conversation.unread}</b>}</span>
            </button>
          ))}
        </nav>
        <div className="profile-bar">
          <span className="avatar avatar-profile">{(session.user.email?.[0] ?? 'S').toUpperCase()}</span>
          <span><strong>{session.user.user_metadata?.name ?? 'Sen'}</strong><small>{session.user.email}</small></span>
          <button className="more-button" type="button" aria-label="Hesap seçenekleri">•••</button>
        </div>
      </aside>

      <section className="chat-panel" aria-label="Ece Yılmaz ile konuşma">
        <header className="chat-header">
          <div className="chat-person"><span className="avatar avatar-peach">EY</span><div><h2>Ece Yılmaz</h2><span><i className="online-dot" /> Şu an aktif</span></div></div>
          <div className="chat-actions"><button className="icon-button" type="button" aria-label="Ara">⌕</button><button className="icon-button" type="button" aria-label="Daha fazla seçenek">•••</button></div>
        </header>
        <div className="message-area">
          <div className="day-divider"><span>BUGÜN</span></div>
          <div className="message-row incoming"><span className="avatar avatar-peach small-avatar">EY</span><div><span className="message-author">Ece Yılmaz</span><p>Selam! Yeni sunum dosyasına bakabildin mi?</p><time>10:37</time></div></div>
          <div className="message-row outgoing"><div><p>Baktım, giriş bölümüne birkaç not bıraktım. Genel akış çok iyi görünüyor.</p><time>10:39 <span className="read-mark">✓✓</span></time></div></div>
          <div className="message-row incoming"><span className="avatar avatar-peach small-avatar">EY</span><div><p>Harika, teşekkürler! Son halini birazdan paylaşırım.</p><time>10:40</time></div></div>
          <div className="message-row outgoing"><div><p>Sunum için son dosyayı bekliyorum, sonra müşteriye iletebiliriz.</p><time>10:42 <span className="read-mark">✓✓</span></time></div></div>
        </div>
        <div className="composer-wrap"><div className="composer"><button className="composer-tool" type="button" aria-label="Dosya ekle">+</button><input placeholder="Bir mesaj yaz..." aria-label="Mesaj yaz" /><button className="composer-tool" type="button" aria-label="Emoji ekle">☺</button><button className="send-button" type="button" aria-label="Mesaj gönder">↑</button></div><small>Mesajların uçtan uca şifrelenir.</small></div>
      </section>

      <aside className="details-sidebar">
        <div className="details-top"><span className="eyebrow">KİŞİ BİLGİSİ</span><button className="icon-button" type="button" aria-label="Paneli kapat">×</button></div>
        <div className="contact-summary"><span className="avatar avatar-peach large-avatar">EY</span><h2>Ece Yılmaz</h2><p>@eceyilmaz</p><span className="active-label"><i className="online-dot" /> Aktif şimdi</span></div>
        <div className="details-section"><span className="detail-label">PAYLAŞILAN MEDYA</span><div className="media-grid"><span>Sunum-v3.pdf</span><span>brief-notes.docx</span><span>IMG_2048.png</span></div></div>
        <button className="logout-button" type="button" onClick={onLogout}>Oturumu kapat <span>↗</span></button>
      </aside>
    </main>
  )
}

export default SignedInView