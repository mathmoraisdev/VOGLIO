'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { Project } from '@/lib/supabase/types'
import ProjectForm from '@/components/admin/ProjectForm'
import { useRouter } from 'next/navigation'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

      if (error) throw error
      setProject(data)
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="h-96 bg-black rounded-xl animate-pulse border border-gray-900" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projeto não encontrado</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Editar Projeto</h1>
        <p className="text-gray-400">Atualize as informações do projeto</p>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <ProjectForm project={project} onSuccess={() => router.push('/admin/projects')} />
      </div>
    </div>
  )
}

