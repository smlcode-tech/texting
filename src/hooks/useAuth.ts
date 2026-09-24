import { useCallback, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [isSessionLoading, setIsSessionLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    void supabase.auth.getSession().then(({ data }) => {
      if (!isActive) return
      setSession(data.session)
      setIsSessionLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isActive) return
      setSession(nextSession)
      setIsSessionLoading(false)
    })

    return () => {
      isActive = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  return { session, isSessionLoading, signOut }
}
