'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { Project, ProjectPhase, ProjectUpdate, ProjectFile } from '@/lib/supabase/types'

interface ProjectWithDetails extends Project {
  phases: ProjectPhase[]
  updates: ProjectUpdate[]
  files: ProjectFile[]
}

export function useProject(projectId: string) {
  const [project, setProject] = useState<ProjectWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (!projectId) {
      setLoading(false)
      return
    }

    const fetchProject = async () => {
      try {
        setLoading(true)

        // Fetch project
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single()

        if (projectError) throw projectError

        // Fetch phases
        const { data: phasesData, error: phasesError } = await supabase
          .from('project_phases')
          .select('*')
          .eq('project_id', projectId)
          .order('order', { ascending: true })

        if (phasesError) throw phasesError

        // Fetch updates
        const { data: updatesData, error: updatesError } = await supabase
          .from('project_updates')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })
          .limit(50)

        if (updatesError) throw updatesError

        // Fetch files
        const { data: filesData, error: filesError } = await supabase
          .from('project_files')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })

        if (filesError) throw filesError

        setProject({
          ...projectData,
          phases: phasesData || [],
          updates: updatesData || [],
          files: filesData || [],
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projeto')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()

    const subscription = supabase
      .channel(`project-${projectId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'project_phases',
          filter: `project_id=eq.${projectId}`
        },
        () => fetchProject()
      )
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_updates',
          filter: `project_id=eq.${projectId}`
        },
        () => fetchProject()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [projectId, supabase])

  return { project, loading, error }
}

