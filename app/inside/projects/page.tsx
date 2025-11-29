'use client'

import { useProjects } from '@/hooks/useProjects'
import ProjectCard from '@/components/inside/ProjectCard'
import { FolderKanban } from 'lucide-react'

export default function ProjectsPage() {
  const { projects, loading } = useProjects()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-48 bg-black rounded-xl animate-pulse border border-gray-900" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Meus Projetos</h1>
        <p className="text-gray-400">Gerencie e acompanhe todos os seus projetos</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-black border border-gray-900 rounded-xl p-12 text-center">
          <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Nenhum projeto ainda</h3>
          <p className="text-gray-400">
            Seus projetos aparecerão aqui quando forem criados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

