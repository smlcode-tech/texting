import { FormEvent, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import AuthPanel from './components/AuthPanel'
import IntroPanel from './components/IntroPanel'
import SignedInView from './components/SignedInView'
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
    return <SignedInView session={session} onLogout={() => void logout()} />
  }

  return (
    <main className="shell">
      <IntroPanel />
      <AuthPanel
        mode={mode}
        step={step}
        name={name}
        email={email}
        password={password}
        otp={otp}
        showPassword={showPassword}
        isBusy={isBusy}
        error={error}
        notice={notice}
        onModeChange={switchMode}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onOtpChange={setOtp}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onSubmit={(event) => void submit(event)}
        onVerifyOtp={(event) => void verifyOtp(event)}
        onResendOtp={() => void resendOtp()}
      />
    </main>
  )
}

export default App
