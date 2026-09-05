import AuthPanel from './components/AuthPanel'
import IntroPanel from './components/IntroPanel'
import SignedInView from './components/SignedInView'
import { useAuth } from './hooks/useAuth'

function App() {
  const auth = useAuth()

  if (auth.session) {
    return <SignedInView session={auth.session} onLogout={() => void auth.logout()} />
  }

  return (
    <main className="shell">
      <IntroPanel />
      <AuthPanel
        mode={auth.mode}
        step={auth.step}
        name={auth.name}
        email={auth.email}
        password={auth.password}
        otp={auth.otp}
        showPassword={auth.showPassword}
        isBusy={auth.isBusy}
        error={auth.error}
        notice={auth.notice}
        onModeChange={auth.switchMode}
        onNameChange={auth.setName}
        onEmailChange={auth.setEmail}
        onPasswordChange={auth.setPassword}
        onOtpChange={auth.setOtp}
        onTogglePassword={() => auth.setShowPassword(!auth.showPassword)}
        onSubmit={(event) => void auth.submit(event)}
        onVerifyOtp={(event) => void auth.verifyOtp(event)}
        onResendOtp={() => void auth.resendOtp()}
      />
    </main>
  )
}

export default App
