'use client'

import { useProject } from '@/hooks/useProject'
import PhaseTimeline from '@/components/inside/PhaseTimeline'
import StatusBadge from '@/components/inside/StatusBadge'
import FileUpload from '@/components/inside/FileUpload'
import { useParams } from 'next/navigation'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const { project, loading, error } = useProject(projectId)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="h-96 bg-black rounded-xl animate-pulse border border-gray-900" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="bg-black border border-red-500/30 rounded-xl p-8 text-center">
        <p className="text-red-400 mb-4">{error || 'Projeto não encontrado'}</p>
        <Link
          href="/inside"
          className="text-primary hover:text-primary-400 font-medium transition-colors"
        >
          Voltar para o dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/inside"
          className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          {project.description && (
            <p className="text-gray-400">{project.description}</p>
          )}
        </div>
      </div>

      {/* Project Timeline */}
      {project.phases.length > 0 ? (
        <PhaseTimeline
          phases={project.phases}
          updates={project.updates}
          files={project.files}
        />
      ) : (
        <div className="bg-black border border-gray-900 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">Este projeto ainda não possui fases configuradas.</p>
          <p className="text-sm text-gray-500">
            As fases serão adicionadas pela equipe Voglio em breve.
          </p>
        </div>
      )}

      {/* File Upload Section */}
      <div className="bg-black border border-gray-900 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Enviar Arquivo</h2>
        <FileUpload
          projectId={project.id}
          onUploadComplete={() => {
            // Refresh page to show new files
            window.location.reload()
          }}
        />
      </div>
    </div>
  )
}

