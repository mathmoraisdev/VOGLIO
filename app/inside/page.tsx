'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProjects } from '@/hooks/useProjects'
import { useAuth } from '@/hooks/useAuth'
import ProjectCard from '@/components/inside/ProjectCard'
import { FolderKanban, CheckCircle2, Clock, Archive } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { role, loading: authLoading } = useAuth()
  const { projects, loading } = useProjects()

  // Redirect admins to admin dashboard
  useEffect(() => {
    if (!authLoading && role === 'admin') {
      router.replace('/admin')
    }
  }, [role, authLoading, router])

  const stats = {
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    paused: projects.filter(p => p.status === 'paused').length,
    total: projects.length,
  }

  const recentProjects = projects.slice(0, 6)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-black rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-black rounded-xl animate-pulse border border-gray-900" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Acompanhe seus projetos e veja o progresso em tempo real</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-black border border-gray-900 rounded-xl p-6 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total de Projetos</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-black border border-gray-900 rounded-xl p-6 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Em Andamento</p>
              <p className="text-3xl font-bold text-primary">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-black border border-gray-900 rounded-xl p-6 hover:border-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Concluídos</p>
              <p className="text-3xl font-bold text-white">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-black border border-gray-900 rounded-xl p-6 hover:border-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Pausados</p>
              <p className="text-3xl font-bold text-white">{stats.paused}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
              <Archive className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Projetos Recentes</h2>
          <Link
            href="/inside/projects"
            className="text-sm text-primary hover:text-primary-400 font-medium transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="bg-black border border-gray-900 rounded-xl p-12 text-center">
            <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Nenhum projeto ainda</h3>
            <p className="text-gray-400 mb-6">
              Seus projetos aparecerão aqui quando forem criados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

