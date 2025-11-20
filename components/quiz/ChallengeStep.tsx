'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { NichoType } from '@/lib/quizLogic'

interface ChallengeStepProps {
  desafios?: string[]
  nicho?: NichoType
  onNext: (desafios: string[]) => void
  onBack: () => void
}

// Desafios por nicho - apenas os essenciais e não redundantes
// Removidos: perguntas sobre plataformas (será etapa separada), orçamento (BudgetStep), histórico (HistoryStep), situação (DiagnosticStep)
const desafiosTrafegoPuro = [
  'Não entendo de marketing digital / tráfego',
  'Falta de tempo para gerenciar tudo',
  'Preciso de resultado rápido',
  'Difícil coordenar vários fornecedores',
]

const desafiosDesenvolvimento = [
  'Não entendo de tecnologia',
  'Falta de tempo para gerenciar tudo',
  'Difícil coordenar vários fornecedores',
  'Preciso de resultado rápido',
]

const desafiosOtimizacao = [
  'Falta de tempo para gerenciar tudo',
  'Difícil coordenar vários fornecedores',
  'Preciso de resultado rápido',
  'Não sei como otimizar o que já tenho',
]

const desafiosIntegrado = [
  'Falta de tempo para gerenciar tudo',
  'Difícil coordenar vários fornecedores',
  'Não entendo de tecnologia',
  'Preciso de resultado rápido',
]

export default function ChallengeStep({ desafios = [], nicho, onNext, onBack }: ChallengeStepProps) {
  // Selecionar desafios baseado no nicho
  const desafiosOptions = useMemo(() => {
    switch (nicho) {
      case 'trafego-puro':
        return desafiosTrafegoPuro
      case 'desenvolvimento':
        return desafiosDesenvolvimento
      case 'otimizacao':
        return desafiosOtimizacao
      case 'integrado':
        return desafiosIntegrado
      default:
        // Fallback: retorna todos os desafios únicos se nicho não estiver definido
        return [...new Set([...desafiosTrafegoPuro, ...desafiosDesenvolvimento, ...desafiosOtimizacao, ...desafiosIntegrado])]
    }
  }, [nicho])
  
  const [selected, setSelected] = useState<string[]>([])

  // Sincronizar desafios quando o componente montar ou quando desafiosOptions mudar
  useEffect(() => {
    if (desafios && desafios.length > 0 && desafiosOptions.length > 0) {
      const validDesafios = desafios.filter(d => desafiosOptions.includes(d))
      if (validDesafios.length > 0) {
        setSelected(validDesafios.slice(0, 2))
      }
    }
  }, [desafiosOptions, desafios]) // Quando desafiosOptions ou desafios mudar

  const toggleDesafio = (desafio: string) => {
    setSelected(prev => {
      if (prev.includes(desafio)) {
        // Desmarcar
        return prev.filter((d) => d !== desafio)
      } else if (prev.length < 2) {
        // Marcar (se ainda não atingiu o limite)
        return [...prev, desafio]
      }
      // Não fazer nada se já atingiu o limite
      return prev
    })
  }

  const handleSubmit = () => {
    onNext(selected)
  }

  return (
    <div>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Qual o Maior Desafio Que Te Impede
        <br />
        De Crescer Agora?
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-400 text-center mb-5"
      >
        Selecione até 2 opções:
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
          className="space-y-2 mb-5"
      >
        {desafiosOptions.map((desafio, index) => {
          const isSelected = selected.includes(desafio)
          const isDisabled = !isSelected && selected.length >= 2

          return (
            <motion.div
              key={desafio}
              variants={fadeInUp}
              onClick={() => {
                if (!isDisabled) {
                  toggleDesafio(desafio)
                }
              }}
              className={`flex items-start gap-2 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-[#365eff] bg-[#365eff]/10 cursor-pointer'
                  : isDisabled
                  ? 'border-gray-800 bg-gray-900/30 cursor-not-allowed opacity-50'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 cursor-pointer'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation()
                  if (!isDisabled) {
                    toggleDesafio(desafio)
                  }
                }}
                disabled={isDisabled}
                className="mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2 disabled:opacity-50 cursor-pointer"
              />
              <span className="text-sm text-gray-300 flex-1 cursor-pointer select-none">{desafio}</span>
            </motion.div>
          )
        })}
        </motion.div>

        {selected.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-400 text-center mb-4"
          >
            {selected.length} de 2 selecionados
          </motion.p>
        )}

        <div className="flex justify-center mt-4">
          <Button
            size="md"
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="w-full sm:w-auto min-w-[180px]"
          >
            Continuar →
          </Button>
        </div>
    </div>
  )
}

