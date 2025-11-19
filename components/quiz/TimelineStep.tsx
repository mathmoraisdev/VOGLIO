'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Clock, CheckCircle, Calendar, Search } from 'lucide-react'

interface TimelineStepProps {
  timeline?: string
  onNext: (timeline: string) => void
  onBack: () => void
}

const opcoes = [
  {
    value: 'urgente',
    label: 'Urgente — Preciso em até 30 dias',
    feedback: 'Temos vagas para projetos express',
    icon: Clock,
    color: 'text-yellow-400',
  },
  {
    value: 'rapido',
    label: 'Rápido — Em 1 a 2 meses',
    feedback: 'Nosso prazo médio é 45-60 dias',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    value: 'normal',
    label: 'Normal — Em 2 a 3 meses',
    feedback: 'Tempo ideal para projetos completos',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    value: 'sem-pressa',
    label: 'Sem pressa — Posso aguardar 3+ meses',
    feedback: 'Podemos planejar com calma',
    icon: Calendar,
    color: 'text-blue-400',
  },
  {
    value: 'pesquisando',
    label: 'Ainda estou pesquisando',
    feedback: 'Sem problema! Vamos te ajudar a decidir',
    icon: Search,
    color: 'text-gray-400',
  },
]

export default function TimelineStep({ timeline, onNext, onBack }: TimelineStepProps) {
  const [selected, setSelected] = useState<string>(timeline || '')

  const opcaoSelecionada = opcoes.find((o) => o.value === selected)

  return (
    <div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#365eff]/10 border border-[#365eff]/30 rounded-full">
          <Clock className="w-5 h-5 text-[#365eff]" strokeWidth={2} />
          <span className="text-white font-semibold">Estamos quase lá! Mais 2 perguntas...</span>
        </div>
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Qual o Prazo Ideal Para Você
        <br />
        Ter Isso Funcionando?
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-8"
      >
        {opcoes.map((opcao, index) => {
          const Icon = opcao.icon
          const isSelected = selected === opcao.value

          return (
            <motion.button
              key={opcao.value}
              variants={fadeInUp}
              onClick={() => setSelected(opcao.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#365eff] bg-[#365eff]/10 shadow-lg shadow-[#365eff]/20'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#365eff]' : 'bg-gray-800'}`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : opcao.color}`} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-semibold mb-0.5">{opcao.label}</p>
                  <p className={`text-xs ${opcao.color}`}>→ {opcao.feedback}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#365eff] flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="flex justify-center mt-4">
        <Button
          size="md"
          onClick={() => onNext(selected)}
          disabled={!selected}
          className="w-full sm:w-auto min-w-[180px]"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
