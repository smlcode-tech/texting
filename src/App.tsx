import { AuthScreen } from './components/AuthScreen'
import { ChatApp } from './components/chat/ChatApp'
import { useAuth } from './hooks/useAuth'

function App() {
  const { session, isSessionLoading, signOut } = useAuth()

  if (isSessionLoading) {
    return (
      <main className="shell loading-shell">
        <span className="eyebrow">YÜKLENİYOR…</span>
      </main>
    )
  }

  if (!session) return <AuthScreen />

  return <ChatApp session={session} onSignOut={() => void signOut()} />
}

export default App
