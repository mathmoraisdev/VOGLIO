'use client'

import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { Project } from '@/lib/supabase/types'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const timeAgo = formatDistanceToNow(new Date(project.created_at), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Link href={`/inside/projects/${project.id}`}>
      <div className="bg-black border border-gray-900 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                {project.description}
              </p>
            )}
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Criado {timeAgo}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}

