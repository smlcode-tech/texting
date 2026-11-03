// Oturumdaki kullanıcının kendi profili.
// Mimarideki yeri: kullanıcı adının arayüzde gösterilmesi için gerekli; insanlar
// arkadaş eklenebilmek için kendi @kullanıcı adlarını bilip paylaşmak zorunda.
// Google ile girenler kullanıcı adını kendileri seçmediği için bu özellikle önemli.
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/chat'

export function useOwnProfile(userId: string) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    let isActive = true

    void supabase
      .from('profiles')
      .select('id, display_name, username, avatar_url, created_at')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (isActive) setProfile((data as Profile | null) ?? null)
      })

    return () => {
      isActive = false
    }
  }, [userId])

  return profile
}
