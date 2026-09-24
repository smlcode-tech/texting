import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/chat'

const PROFILE_COLUMNS = 'id, display_name, avatar_url, created_at'

export function useProfiles(currentUserId: string | undefined) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setIsLoading(true)
    const { data, error: queryError } = await supabase
      .from('profiles')
      .select(PROFILE_COLUMNS)
      .order('display_name', { ascending: true })

    if (queryError) {
      setError(queryError.message)
      setProfiles([])
      setIsLoading(false)
      return
    }

    setError('')
    setProfiles(
      ((data ?? []) as Profile[]).filter((profile) => profile.id !== currentUserId),
    )
    setIsLoading(false)
  }, [currentUserId])

  useEffect(() => {
    void reload()
  }, [reload])

  return { profiles, isLoading, error, reload }
}
