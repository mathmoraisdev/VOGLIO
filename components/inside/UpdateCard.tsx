'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { CheckCircle2, AlertCircle, Info, Flag } from 'lucide-react'
import type { ProjectUpdate, UpdateType } from '@/lib/supabase/types'

interface UpdateCardProps {
  update: ProjectUpdate
}

const updateTypeConfig: Record<UpdateType, { icon: typeof CheckCircle2; className: string }> = {
  progress: { icon: CheckCircle2, className: 'text-primary' },
  milestone: { icon: Flag, className: 'text-green-500' },
  issue: { icon: AlertCircle, className: 'text-red-500' },
  note: { icon: Info, className: 'text-gray-400' },
}

export default function UpdateCard({ update }: UpdateCardProps) {
  const timeAgo = formatDistanceToNow(new Date(update.created_at), {
    addSuffix: true,
    locale: ptBR,
  })

  const config = updateTypeConfig[update.type]
  const Icon = config.icon

  return (
    <div className="bg-black border border-gray-900 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-black border border-gray-900 flex items-center justify-center ${config.className}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-sm font-semibold text-white">{update.title}</h4>
            <span className="text-xs text-gray-500 ml-2">{timeAgo}</span>
          </div>
          <p className="text-sm text-gray-400 whitespace-pre-wrap">{update.content}</p>
        </div>
      </div>
    </div>
  )
}

