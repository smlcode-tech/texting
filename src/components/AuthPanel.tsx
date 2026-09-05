import type { FormEvent } from 'react'

type Mode = 'login' | 'register'

type AuthPanelProps = {
  mode: Mode
  step: 'credentials' | 'otp'
  name: string
  email: string
  password: string
  otp: string
  showPassword: boolean
  isBusy: boolean
  error: string
  notice: string
  onModeChange: (mode: Mode) => void
  onNameChange: (name: string) => void
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onOtpChange: (otp: string) => void
  onTogglePassword: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onVerifyOtp: (event: FormEvent<HTMLFormElement>) => void
  onResendOtp: () => void
}

function AuthPanel({
  mode,
  step,
  name,
  email,
  password,
  otp,
  showPassword,
  isBusy,
  error,
  notice,
  onModeChange,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onOtpChange,
  onTogglePassword,
  onSubmit,
  onVerifyOtp,
  onResendOtp,
}: AuthPanelProps) {
  const switchMode = (nextMode: Mode) => onModeChange(nextMode)

  return (
    <section className="auth-panel">
      {step === 'otp' ? (
        <>
          <div className="auth-heading"><span className="eyebrow">E-POSTA ONAYI</span><h2>Kodunu kontrol et.</h2><p>{email} adresine gönderdiğimiz 6 haneli kodu gir.</p></div>
          <form onSubmit={onVerifyOtp} noValidate>
            <label>Doğrulama kodu<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => onOtpChange(event.target.value.replace(/\D/g, ''))} placeholder="123456" /></label>
            {error && <p className="form-message error" role="alert">{error}</p>}
            {notice && <p className="form-message notice" role="status">{notice}</p>}
            <button className="submit-button" type="submit" disabled={isBusy}>{isBusy ? 'Kontrol ediliyor...' : 'E-postayı doğrula'} <span aria-hidden="true">→</span></button>
          </form>
          <div className="otp-actions"><button type="button" onClick={onResendOtp} disabled={isBusy}>Kodu tekrar gönder</button><button type="button" onClick={() => switchMode('register')}>E-postayı değiştir</button></div>
        </>
      ) : (
        <>
          <div className="auth-heading"><span className="eyebrow">BAŞLAYALIM</span><h2>{mode === 'login' ? 'Tekrar hoş geldin.' : 'Kendi alanını aç.'}</h2><p>{mode === 'login' ? 'Konuşmaların seni bekliyor.' : 'Birkaç saniyede ücretsiz hesabını oluştur.'}</p></div>
          <div className="tabs" role="tablist" aria-label="Kimlik doğrulama">
            <button className={mode === 'login' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'login'} onClick={() => switchMode('login')}>Giriş yap</button>
            <button className={mode === 'register' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'register'} onClick={() => switchMode('register')}>Kayıt ol</button>
          </div>
          <form onSubmit={onSubmit} noValidate>
            {mode === 'register' && <label>Ad soyad<input value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Örn. Deniz Yılmaz" autoComplete="name" /></label>}
            <label>E-posta adresi<input type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="sen@ornek.com" autoComplete="email" /></label>
            <label>Parola<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => onPasswordChange(event.target.value)} placeholder="En az 8 karakter" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button type="button" className="show-password" onClick={onTogglePassword} aria-label={showPassword ? 'Parolayı gizle' : 'Parolayı göster'}>{showPassword ? 'Gizle' : 'Göster'}</button></div></label>
            {error && <p className="form-message error" role="alert">{error}</p>}
            {notice && <p className="form-message notice" role="status">{notice}</p>}
            <button className="submit-button" type="submit" disabled={isBusy}>{isBusy ? 'Bekleyin...' : mode === 'login' ? 'Giriş yap' : 'Hesabımı oluştur'} <span aria-hidden="true">→</span></button>
          </form>
          <p className="fine-print">Devam ederek kullanım koşullarımızı ve gizlilik politikamızı kabul edersin.</p>
          <p className="demo-note">E-posta doğrulaması Supabase Auth ile korunur.</p>
        </>
      )}
    </section>
  )
}

export default AuthPanel