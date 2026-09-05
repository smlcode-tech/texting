import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { AuthFormEvent, AuthStep, Mode } from '../types/auth'
import { isSupabaseConfigured, supabase } from '../supabase'

export function useAuth() {
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

  const clearMessages = () => {
    setError('')
    setNotice('')
  }

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode)
    setStep('credentials')
    setOtp('')
    clearMessages()
  }

  const submit = async (event: AuthFormEvent) => {
    event.preventDefault()
    clearMessages()

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

  const verifyOtp = async (event: AuthFormEvent) => {
    event.preventDefault()
    clearMessages()
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
    clearMessages()
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

  return {
    mode, step, name, email, password, otp, showPassword, isBusy, error, notice, session,
    switchMode, setName, setEmail, setPassword, setOtp, setShowPassword,
    submit, verifyOtp, resendOtp, logout,
  }
}