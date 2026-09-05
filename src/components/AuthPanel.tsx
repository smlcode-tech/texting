import type { AuthFormEvent, Mode } from '../types/auth'

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
  onSubmit: (event: AuthFormEvent) => void
  onGoogleSignIn: () => void
  onVerifyOtp: (event: AuthFormEvent) => void
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
  onGoogleSignIn,
  onVerifyOtp,
  onResendOtp,
}: AuthPanelProps) {
  const switchMode = (nextMode: Mode) => onModeChange(nextMode)

  return (
    <section className="auth-panel">
      {step === 'otp' ? (
        <>
          <div className="auth-heading"><span className="eyebrow">E-POSTA ONAYI</span><h2>Kodunu kontrol et.</h2><p>{email} adresine gÃ¶nderdiÄŸimiz 6 haneli kodu gir.</p></div>
          <form onSubmit={onVerifyOtp} noValidate>
            <label>DoÄŸrulama kodu<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => onOtpChange(event.target.value.replace(/\D/g, ''))} placeholder="123456" /></label>
            {error && <p className="form-message error" role="alert">{error}</p>}
            {notice && <p className="form-message notice" role="status">{notice}</p>}
            <button className="submit-button" type="submit" disabled={isBusy}>{isBusy ? 'Kontrol ediliyor...' : 'E-postayÄ± doÄŸrula'} <span aria-hidden="true">â†’</span></button>
          </form>
          <div className="otp-actions"><button type="button" onClick={onResendOtp} disabled={isBusy}>Kodu tekrar gÃ¶nder</button><button type="button" onClick={() => switchMode('register')}>E-postayÄ± deÄŸiÅŸtir</button></div>
        </>
      ) : (
        <>
          <div className="auth-heading"><span className="eyebrow">BAÅLAYALIM</span><h2>{mode === 'login' ? 'Tekrar hoÅŸ geldin.' : 'Kendi alanÄ±nÄ± aÃ§.'}</h2><p>{mode === 'login' ? 'KonuÅŸmalarÄ±n seni bekliyor.' : 'BirkaÃ§ saniyede Ã¼cretsiz hesabÄ±nÄ± oluÅŸtur.'}</p></div>
          <div className="tabs" role="tablist" aria-label="Kimlik doÄŸrulama">
            <button className={mode === 'login' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'login'} onClick={() => switchMode('login')}>GiriÅŸ yap</button>
            <button className={mode === 'register' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'register'} onClick={() => switchMode('register')}>KayÄ±t ol</button>
          </div>
          <button className="google-button" type="button" onClick={onGoogleSignIn} disabled={isBusy}><span className="google-mark" aria-hidden="true">G</span>{isBusy ? 'Bekleyin...' : 'Google ile devam et'}</button>
          <div className="auth-divider"><span>veya e-posta ile</span></div>
          <form onSubmit={onSubmit} noValidate>
            {mode === 'register' && <label>Ad soyad<input value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Ã–rn. Deniz YÄ±lmaz" autoComplete="name" /></label>}
            <label>E-posta adresi<input type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="sen@ornek.com" autoComplete="email" /></label>
            <label>Parola<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => onPasswordChange(event.target.value)} placeholder="En az 8 karakter" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button type="button" className="show-password" onClick={onTogglePassword} aria-label={showPassword ? 'ParolayÄ± gizle' : 'ParolayÄ± gÃ¶ster'}>{showPassword ? 'Gizle' : 'GÃ¶ster'}</button></div></label>
            {error && <p className="form-message error" role="alert">{error}</p>}
            {notice && <p className="form-message notice" role="status">{notice}</p>}
            <button className="submit-button" type="submit" disabled={isBusy}>{isBusy ? 'Bekleyin...' : mode === 'login' ? 'GiriÅŸ yap' : 'HesabÄ±mÄ± oluÅŸtur'} <span aria-hidden="true">â†’</span></button>
          </form>
          <p className="fine-print">Devam ederek kullanÄ±m koÅŸullarÄ±mÄ±zÄ± ve gizlilik politikamÄ±zÄ± kabul edersin.</p>
          <p className="demo-note">E-posta doÄŸrulamasÄ± Supabase Auth ile korunur.</p>
        </>
      )}
    </section>
  )
}

export default AuthPanel