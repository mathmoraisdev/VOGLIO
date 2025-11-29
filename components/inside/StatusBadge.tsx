'use client'

import { ProjectStatus, PhaseStatus } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: ProjectStatus | PhaseStatus
  className?: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Project statuses
  draft: { label: 'Rascunho', className: 'bg-gray-800 text-gray-400 border-gray-700' },
  active: { label: 'Ativo', className: 'bg-primary/20 text-primary border-primary/30' },
  paused: { label: 'Pausado', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  completed: { label: 'Concluído', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  archived: { label: 'Arquivado', className: 'bg-gray-800 text-gray-500 border-gray-700' },
  // Phase statuses
  pending: { label: 'Pendente', className: 'bg-gray-800 text-gray-400 border-gray-700' },
  in_progress: { label: 'Em Andamento', className: 'bg-primary/20 text-primary border-primary/30' },
  blocked: { label: 'Bloqueado', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

