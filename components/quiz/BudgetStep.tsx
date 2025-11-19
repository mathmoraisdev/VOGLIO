'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Lightbulb, CheckCircle, Trophy, Gem, BarChart, Lock } from 'lucide-react'

interface BudgetStepProps {
  budget?: string
  onNext: (budget: string) => void
  onBack: () => void
}

const faixas = [
  {
    value: 'ate-10k',
    label: 'Até R$ 10 mil',
    feedback: 'Recomendaremos soluções enxutas',
    icon: Lightbulb,
    color: 'text-yellow-400',
  },
  {
    value: '10k-30k',
    label: 'R$ 10 a R$ 30 mil',
    feedback: 'Faixa ideal para projetos iniciais',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    value: '30k-60k',
    label: 'R$ 30 a R$ 60 mil',
    feedback: 'Soluções completas e integradas',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    value: '60k-100k',
    label: 'R$ 60 a R$ 100 mil',
    feedback: 'Projetos premium com equipe dedicada',
    icon: Trophy,
    color: 'text-orange-400',
  },
  {
    value: 'acima-100k',
    label: 'Acima de R$ 100 mil',
    feedback: 'Soluções enterprise customizadas',
    icon: Gem,
    color: 'text-purple-400',
  },
  {
    value: 'nao-definido',
    label: 'Ainda não defini orçamento',
    feedback: 'Vamos te ajudar a entender o investimento',
    icon: BarChart,
    color: 'text-gray-400',
  },
]

export default function BudgetStep({ budget, onNext, onBack }: BudgetStepProps) {
  const [selected, setSelected] = useState<string>(budget || '')

  const opcaoSelecionada = faixas.find((f) => f.value === selected)

  return (
    <div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-6"
      >
        <p className="text-gray-400 text-lg mb-2">Última Pergunta Antes Dos Seus Dados</p>
        <div className="h-1 w-24 bg-[#365eff] mx-auto rounded-full" />
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Para Criar Uma Proposta Adequada,
        <br />
        Qual Faixa de Investimento Faz
        <br />
        Sentido Para Você?
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-400 text-center mb-5"
      >
        (Isso nos ajuda a recomendar a melhor solução)
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-6"
      >
        {faixas.map((faixa, index) => {
          const Icon = faixa.icon
          const isSelected = selected === faixa.value

          return (
            <motion.button
              key={faixa.value}
              variants={fadeInUp}
              onClick={() => setSelected(faixa.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#365eff] bg-[#365eff]/10 shadow-lg shadow-[#365eff]/20'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#365eff]' : 'bg-gray-800'}`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : faixa.color}`} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-semibold mb-0.5">{faixa.label}</p>
                  <p className={`text-xs ${faixa.color}`}>→ {faixa.feedback}</p>
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

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-5"
      >
        <Lock className="w-3 h-3" strokeWidth={2} />
        <span className="text-xs">Estas informações são confidenciais e usadas apenas para personalizar sua proposta</span>
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
