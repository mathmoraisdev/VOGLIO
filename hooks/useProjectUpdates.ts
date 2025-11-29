'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { ProjectUpdate } from '@/lib/supabase/types'

export function useProjectUpdates(projectId: string, phaseId?: string | null) {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!projectId) {
      setLoading(false)
      return
    }

    const fetchUpdates = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('project_updates')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })
          .limit(20)

        if (phaseId) {
          query = query.eq('phase_id', phaseId)
        }

        const { data, error: fetchError } = await query

        if (fetchError) throw fetchError
        setUpdates(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar atualizações')
      } finally {
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [projectId, phaseId, supabase])

  return { updates, loading, error }
}

