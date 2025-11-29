'use client'

import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react'
import StatusBadge from './StatusBadge'
import UpdateCard from './UpdateCard'
import type { ProjectPhase, ProjectUpdate, ProjectFile } from '@/lib/supabase/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface PhaseTimelineProps {
  phases: ProjectPhase[]
  updates: ProjectUpdate[]
  files: ProjectFile[]
}

export default function PhaseTimeline({ phases, updates, files }: PhaseTimelineProps) {
  const getPhaseIcon = (status: ProjectPhase['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-primary animate-spin" />
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-500" />
    }
  }

  const getPhaseUpdates = (phaseId: string) => {
    return updates.filter(update => update.phase_id === phaseId)
  }

  const getPhaseFiles = (phaseId: string) => {
    return files.filter(file => file.phase_id === phaseId)
  }

  return (
    <div className="space-y-8">
      {phases.map((phase, index) => {
        const phaseUpdates = getPhaseUpdates(phase.id)
        const phaseFiles = getPhaseFiles(phase.id)
        const isLast = index === phases.length - 1

        return (
          <div key={phase.id} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-800" />
            )}

            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-black border-2 border-gray-900 flex items-center justify-center">
                  {getPhaseIcon(phase.status)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-black border border-gray-900 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{phase.name}</h3>
                        <StatusBadge status={phase.status} />
                      </div>
                      {phase.description && (
                        <p className="text-sm text-gray-400 mb-3">{phase.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {phase.start_date && (
                          <span>Início: {format(new Date(phase.start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                        )}
                        {phase.end_date && (
                          <span>Prazo: {format(new Date(phase.end_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                        )}
                        {phase.completed_at && (
                          <span className="text-green-400 font-medium">
                            Concluído em {format(new Date(phase.completed_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Updates */}
                  {phaseUpdates.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Atualizações</h4>
                      {phaseUpdates.map(update => (
                        <UpdateCard key={update.id} update={update} />
                      ))}
                    </div>
                  )}

                  {/* Files */}
                  {phaseFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Arquivos</h4>
                      <div className="space-y-2">
                        {phaseFiles.map(file => (
                          <a
                            key={file.id}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary-400 transition-colors"
                          >
                            <span>{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

