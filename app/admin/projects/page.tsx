'use client'

import Link from 'next/link'
import { useAdminProjects } from '@/hooks/useAdminProjects'
import ProjectTable from '@/components/admin/ProjectTable'
import Button from '@/components/ui/Button'
import { Plus, FolderKanban } from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function ProjectsPage() {
  const { projects, loading, refetch } = useAdminProjects()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createSupabaseClient()

  const handleDelete = async (projectId: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      setDeletingId(projectId)
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error
      refetch()
    } catch (error) {
      alert('Erro ao excluir projeto: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
    } finally {
      setDeletingId(null)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projetos</h1>
          <p className="text-gray-400">Gerencie todos os projetos do sistema</p>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Criar Projeto
          </Button>
        </Link>
      </div>

      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FolderKanban className="w-5 h-5 text-primary" />
          <span className="text-sm text-gray-400">
            Total: <span className="text-white font-medium">{projects.length}</span> projetos
          </span>
        </div>
        <ProjectTable projects={projects} onDelete={handleDelete} />
      </div>
    </div>
  )
}

