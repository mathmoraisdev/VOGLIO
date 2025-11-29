'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { Project, ProjectType, ProjectStatus } from '@/lib/supabase/types'
import { getProjectTypePhases } from '@/lib/projectTypes'
import ProjectTypeSelector from './ProjectTypeSelector'
import Button from '@/components/ui/Button'
import { Loader2, AlertCircle } from 'lucide-react'
import { useUsers } from '@/hooks/useUsers'

interface ProjectFormProps {
  project?: Project
  onSuccess?: () => void
}

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const router = useRouter()
  const supabase = createSupabaseClient()
  const { users } = useUsers()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    user_id: project?.user_id || '',
    project_type: (project?.project_type || null) as ProjectType | null,
    status: (project?.status || 'draft') as ProjectStatus,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (project) {
        // Update existing project
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            name: formData.name,
            description: formData.description || null,
            user_id: formData.user_id,
            project_type: formData.project_type,
            status: formData.status,
          })
          .eq('id', project.id)

        if (updateError) throw updateError

        // Update phases if type changed
        if (formData.project_type && formData.project_type !== project.project_type) {
          const phases = getProjectTypePhases(formData.project_type)
          // Delete old phases and create new ones
          await supabase
            .from('project_phases')
            .delete()
            .eq('project_id', project.id)

          for (const phase of phases) {
            await supabase
              .from('project_phases')
              .insert({
                project_id: project.id,
                name: phase.name,
                description: phase.description,
                order: phase.order,
                status: 'pending',
              })
          }
        }

        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/projects')
        }
      } else {
        // Create new project
        const { data: newProject, error: insertError } = await supabase
          .from('projects')
          .insert({
            name: formData.name,
            description: formData.description || null,
            user_id: formData.user_id,
            project_type: formData.project_type,
            status: formData.status,
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Create default phases if type is selected
        if (newProject && formData.project_type) {
          const phases = getProjectTypePhases(formData.project_type)
          for (const phase of phases) {
            await supabase
              .from('project_phases')
              .insert({
                project_id: newProject.id,
                name: phase.name,
                description: phase.description,
                order: phase.order,
                status: 'pending',
              })
          }
        }

        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/admin/projects')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar projeto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Nome do Projeto *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="Nome do projeto"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Descrição
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            placeholder="Descrição do projeto"
          />
        </div>

        <div>
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-300 mb-2">
            Cliente *
          </label>
          <select
            id="user_id"
            value={formData.user_id}
            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="">Selecione um cliente...</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name || user.id.substring(0, 8)} - {user.company_name || 'Sem empresa'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="draft">Rascunho</option>
            <option value="active">Ativo</option>
            <option value="paused">Pausado</option>
            <option value="completed">Concluído</option>
            <option value="archived">Arquivado</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <ProjectTypeSelector
            value={formData.project_type}
            onChange={(type) => setFormData({ ...formData, project_type: type })}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Salvando...
            </>
          ) : (
            project ? 'Atualizar' : 'Criar'
          )}
        </Button>
      </div>
    </form>
  )
}

