import type { Session } from '@supabase/supabase-js'

type SignedInViewProps = {
  session: Session
  onLogout: () => void
}

function SignedInView({ session, onLogout }: SignedInViewProps) {
  return (
    <main className="shell signed-in-shell">
      <section className="welcome-panel">
        <div className="brand-mark" aria-hidden="true">t</div>
        <span className="eyebrow">TEXTING / HESAP</span>
        <h1>Mesajlaşma<br /><em>alanın.</em></h1>
        <p>Hesabın doğrulandı. Gerçek zamanlı sohbetleri bir sonraki adımda bağlayacağız.</p>
        <div className="account-chip"><span>{session.user.email}</span><button type="button" onClick={onLogout}>Çıkış yap</button></div>
      </section>
      <aside className="status-card"><span className="status-dot" /> Oturum aktif</aside>
    </main>
  )
}

export default SignedInView