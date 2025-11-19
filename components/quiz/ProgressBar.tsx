'use client'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100
  const filledBars = Math.round((current / total) * 12) // 12 é o número de barras visuais

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">
          Etapa {current} de {total}
        </span>
        <span className="text-sm text-gray-400">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#365eff] to-[#4a6eff] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Barras visuais decorativas */}
      <div className="flex gap-1 mt-2 justify-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-all duration-300 ${
              i < filledBars ? 'bg-[#365eff]' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
