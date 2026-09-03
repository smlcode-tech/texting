import { FormEvent, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from './supabase'

type Mode = 'login' | 'register'
type AuthStep = 'credentials' | 'otp'

function App() {
  const [mode, setMode] = useState<Mode>('login')
  const [step, setStep] = useState<AuthStep>('credentials')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode)
    setStep('credentials')
    setOtp('')
    setError('')
    setNotice('')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!isSupabaseConfigured) {
      setError('Supabase bağlantısı yapılandırılmamış. .env dosyasını oluşturun.')
      return
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Geçerli bir e-posta adresi girin.')
      return
    }
    if (password.length < 8) {
      setError('Parolanız en az 8 karakter olmalı.')
      return
    }

    setIsBusy(true)
    if (mode === 'register') {
      if (name.trim().length < 2) {
        setError('Adınız en az 2 karakter olmalı.')
        setIsBusy(false)
        return
      }
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: { data: { name: name.trim() } },
      })
      setIsBusy(false)
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      if (data.session) return
      setEmail(normalizedEmail)
      setStep('otp')
      setNotice('Doğrulama kodunu e-posta adresinize gönderdik.')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password })
    setIsBusy(false)
    if (signInError) setError('E-posta veya parola hatalı ya da e-posta henüz doğrulanmadı.')
  }

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setNotice('')
    if (!/^\d{6}$/.test(otp)) {
      setError('6 haneli doğrulama kodunu girin.')
      return
    }
    setIsBusy(true)
    const { error: verifyError } = await supabase.auth.verifyOtp({ email, token: otp, type: 'signup' })
    setIsBusy(false)
    if (verifyError) setError('Kod geçersiz veya süresi dolmuş.')
  }

  const resendOtp = async () => {
    setError('')
    setNotice('')
    setIsBusy(true)
    const { error: resendError } = await supabase.auth.resend({ type: 'signup', email })
    setIsBusy(false)
    setNotice(resendError ? '' : 'Yeni doğrulama kodu gönderildi.')
    if (resendError) setError(resendError.message)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setPassword('')
    setNotice('Oturumunuz kapatıldı.')
  }

  if (session) {
    return (
      <main className="shell signed-in-shell">
        <section className="welcome-panel">
          <div className="brand-mark" aria-hidden="true">t</div>
          <span className="eyebrow">TEXTING / HESAP</span>
          <h1>Mesajlaşma<br /><em>alanın.</em></h1>
          <p>Hesabın doğrulandı. Gerçek zamanlı sohbetleri bir sonraki adımda bağlayacağız.</p>
          <div className="account-chip"><span>{session.user.email}</span><button type="button" onClick={() => void logout()}>Çıkış yap</button></div>
        </section>
        <aside className="status-card"><span className="status-dot" /> Oturum aktif</aside>
      </main>
    )
  }

  return (
    <main className="shell">
      <section className="intro-panel">
        <div className="brand-row"><div className="brand-mark" aria-hidden="true">t</div><strong>texting</strong></div>
        <div className="intro-copy">
          <span className="eyebrow">SÖZÜNÜN YERİ</span>
          <h1>Yakın olanla<br /><em>anında</em> konuş.</h1>
          <p>Duraksamadan paylaş. Küçük anları, önemli haberleri ve aradaki her şeyi tek bir yerde tut.</p>
        </div>
        <div className="signal"><span className="status-dot" /> Her zaman bağlı</div>
      </section>

      <section className="auth-panel">
        {step === 'otp' ? <>
          <div className="auth-heading"><span className="eyebrow">E-POSTA ONAYI</span><h2>Kodunu kontrol et.</h2><p>{email} adresine gönderdiğimiz 6 haneli kodu gir.</p></div>
          <form onSubmit={verifyOtp} noValidate>
            <label>Doğrulama kodu<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="123456" /></label>
            {error && <p className="form-message error" role="alert">{error}</p>}
            {notice && <p className="form-message notice" role="status">{notice}</p>}
            <button className="submit-button" type="submit" disabled={isBusy}>{isBusy ? 'Kontrol ediliyor...' : 'E-postayı doğrula'} <span aria-hidden="true">→</span></button>
          </form>
          <div className="otp-actions"><button type="button" onClick={() => void resendOtp()} disabled={isBusy}>Kodu tekrar gönder</button><button type="button" onClick={() => switchMode('register')}>E-postayı değiştir</button></div>
        </> : <>
        <div className="auth-heading"><span className="eyebrow">BAŞLAYALIM</span><h2>{mode === 'login' ? 'Tekrar hoş geldin.' : 'Kendi alanını aç.'}</h2><p>{mode === 'login' ? 'Konuşmaların seni bekliyor.' : 'Birkaç saniyede ücretsiz hesabını oluştur.'}</p></div>
        <div className="tabs" role="tablist" aria-label="Kimlik doğrulama">
          <button className={mode === 'login' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'login'} onClick={() => switchMode('login')}>Giriş yap</button>
          <button className={mode === 'register' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'register'} onClick={() => switchMode('register')}>Kayıt ol</button>
        </div>
        <form onSubmit={submit} noValidate>
          {mode === 'register' && <label>Ad soyad<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Örn. Deniz Yılmaz" autoComplete="name" /></label>}
          <label>E-posta adresi<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="sen@ornek.com" autoComplete="email" /></label>
          <label>Parola<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="En az 8 karakter" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Parolayı gizle' : 'Parolayı göster'}>{showPassword ? 'Gizle' : 'Göster'}</button></div></label>
          {error && <p className="form-message error" role="alert">{error}</p>}
          {notice && <p className="form-message notice" role="status">{notice}</p>}
          <button className="submit-button" type="submit" disabled={isBusy}>{isBusy ? 'Bekleyin...' : mode === 'login' ? 'Giriş yap' : 'Hesabımı oluştur'} <span aria-hidden="true">→</span></button>
        </form>
        <p className="fine-print">Devam ederek kullanım koşullarımızı ve gizlilik politikamızı kabul edersin.</p>
        <p className="demo-note">E-posta doğrulaması Supabase Auth ile korunur.</p>
        </>}
      </section>
    </main>
  )
}

export default App
