'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Rocket, TrendingUp, Wrench, Sparkles } from 'lucide-react'
import { ObjectiveType } from '@/lib/quizLogic'

interface ObjectiveStepProps {
  selected?: ObjectiveType
  onSelect: (objective: ObjectiveType) => void
  onNext: () => void
  onBack: () => void
}

const objectives = [
  {
    id: 'criar-zero' as ObjectiveType,
    icon: Rocket,
    title: 'CRIAR ALGO DO ZERO',
    description: 'Preciso desenvolver meu sistema, app ou site e colocar no ar',
  },
  {
    id: 'gerar-clientes' as ObjectiveType,
    icon: TrendingUp,
    title: 'GERAR MAIS CLIENTES',
    description: 'Já tenho meu site/sistema, mas preciso divulgar e trazer clientes',
  },
  {
    id: 'corrigir' as ObjectiveType,
    icon: Wrench,
    title: 'CORRIGIR O QUE TENHO',
    description: 'Tenho algo funcionando mas não traz resultado, preciso otimizar',
  },
  {
    id: 'solucao-completa' as ObjectiveType,
    icon: Sparkles,
    title: 'SOLUÇÃO COMPLETA',
    description: 'Quero criar e divulgar ao mesmo tempo, tudo integrado e funcionando',
  },
]

export default function ObjectiveStep({ selected, onSelect, onNext, onBack }: ObjectiveStepProps) {
  return (
    <div>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Qual é Seu Principal Objetivo
        <br />
        Neste Momento?
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-400 text-center mb-5"
      >
        Escolha a opção que mais combina com você:
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-6"
      >
        {objectives.map((objective, index) => {
          const Icon = objective.icon
          const isSelected = selected === objective.id

          return (
            <motion.button
              key={objective.id}
              variants={fadeInUp}
              onClick={() => onSelect(objective.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#365eff] bg-[#365eff]/10 shadow-lg shadow-[#365eff]/20'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? 'bg-[#365eff]' : 'bg-gray-800'
                  } transition-colors`}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">{objective.title}</h3>
                  <p className="text-sm text-gray-400">{objective.description}</p>
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
          onClick={onNext}
          disabled={!selected}
          className="w-full sm:w-auto min-w-[180px]"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
