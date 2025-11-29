'use client'

import type { ProjectType } from '@/lib/supabase/types'
import { getProjectTypeLabel, getProjectTypePhases } from '@/lib/projectTypes'

interface ProjectTypeSelectorProps {
  value: ProjectType | null
  onChange: (type: ProjectType | null) => void
  onPhasesChange?: (phases: ReturnType<typeof getProjectTypePhases>) => void
}

const projectTypes: ProjectType[] = [
  'sistema_web',
  'automacoes',
  'landing_page',
  'funil_vendas',
  'trafego_pago',
]

export default function ProjectTypeSelector({ value, onChange, onPhasesChange }: ProjectTypeSelectorProps) {
  const handleChange = (newType: ProjectType) => {
    onChange(newType)
    if (onPhasesChange) {
      onPhasesChange(getProjectTypePhases(newType))
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Tipo de Projeto
      </label>
      <select
        value={value || ''}
        onChange={(e) => handleChange(e.target.value as ProjectType)}
        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-primary"
      >
        <option value="">Selecione um tipo...</option>
        {projectTypes.map(type => (
          <option key={type} value={type}>
            {getProjectTypeLabel(type)}
          </option>
        ))}
      </select>
      {value && (
        <p className="mt-2 text-xs text-gray-400">
          Este tipo de projeto terá {getProjectTypePhases(value).length} fases padrão configuradas.
        </p>
      )}
    </div>
  )
}

