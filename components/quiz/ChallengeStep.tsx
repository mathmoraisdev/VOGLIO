'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Lightbulb } from 'lucide-react'
import InsightCard from './InsightCard'

interface ChallengeStepProps {
  desafios?: string[]
  onNext: (desafios: string[]) => void
  onBack: () => void
  microInsights?: Array<{ texto: string; tipo: 'oportunidade' | 'risco' | 'dica' | 'benchmark' }>
}

const desafiosOptions = [
  'Não sei por onde começar',
  'Falta de tempo para gerenciar tudo',
  'Já contratei e não deu certo',
  'Medo de gastar e não ter retorno',
  'Não entendo de tecnologia',
  'Não entendo de marketing digital / tráfego',
  'Difícil coordenar vários fornecedores',
  'Preciso de resultado rápido',
  'Não tenho orçamento grande',
  'Tenho tráfego mas não converte',
  'Gasto em anúncios mas não vejo retorno',
  'Não sei qual plataforma usar para anunciar',
]

export default function ChallengeStep({ desafios = [], onNext, onBack, microInsights = [] }: ChallengeStepProps) {
  const [selected, setSelected] = useState<string[]>(desafios)
  const [outro, setOutro] = useState('')

  const toggleDesafio = (desafio: string) => {
    if (selected.includes(desafio)) {
      setSelected(selected.filter((d) => d !== desafio))
    } else if (selected.length < 3) {
      setSelected([...selected, desafio])
    }
  }

  const handleSubmit = () => {
    const finalDesafios = outro.trim() ? [...selected, outro] : selected
    onNext(finalDesafios)
  }

  return (
    <div>
      {/* Micro-insights anteriores */}
      {microInsights.map((insight, index) => (
        <InsightCard key={index} texto={insight.texto} tipo={insight.tipo} />
      ))}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="bg-[#365eff]/10 border border-[#365eff]/30 rounded-lg p-4 mb-6"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-white font-semibold mb-1">Insight:</p>
            <p className="text-gray-300 text-sm">
              73% dos nossos clientes tinham o mesmo desafio que você acabou de mencionar
            </p>
          </div>
        </div>
      </motion.div>

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
        Selecione até 3 opções:
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
          className="space-y-2 mb-5"
      >
        {desafiosOptions.map((desafio, index) => {
          const isSelected = selected.includes(desafio)
          const isDisabled = !isSelected && selected.length >= 3

          return (
            <motion.label
              key={desafio}
              variants={fadeInUp}
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
                onChange={() => toggleDesafio(desafio)}
                disabled={isDisabled}
                className="mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2 disabled:opacity-50"
              />
              <span className="text-sm text-gray-300 flex-1">{desafio}</span>
            </motion.label>
          )
        })}
      </motion.div>

        <div className="mb-5">
          <input
            type="text"
            value={outro}
            onChange={(e) => setOutro(e.target.value)}
            placeholder="Outro:"
            className="w-full px-3 py-2 text-sm bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors"
          />
        </div>

        {selected.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-400 text-center mb-4"
          >
            {selected.length} de 3 selecionados
          </motion.p>
        )}

        <div className="flex justify-center mt-4">
          <Button
            size="md"
            onClick={handleSubmit}
            disabled={selected.length === 0 && !outro.trim()}
            className="w-full sm:w-auto min-w-[180px]"
          >
            Continuar →
          </Button>
        </div>
    </div>
  )
}
