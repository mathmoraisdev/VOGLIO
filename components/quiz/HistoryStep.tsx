'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { 
  Sparkles, 
  User, 
  Building2, 
  UserX, 
  RotateCw,
  CheckCircle2
} from 'lucide-react'

interface HistoryStepProps {
  historico?: { tentou?: string; detalhes?: string }
  onNext: (historico: { tentou: string; detalhes: string }) => void
  onBack: () => void
}

const opcoes = [
  {
    value: 'nao-tentou',
    label: 'Primeira vez investindo em anúncios',
    precisaDetalhes: false,
    icon: Sparkles,
  },
  {
    value: 'freelancer',
    label: 'Sim, já contratei freelancer',
    precisaDetalhes: true,
    placeholder: 'O que deu errado?',
    icon: User,
  },
  {
    value: 'agencia',
    label: 'Sim, já contratei outra agência',
    precisaDetalhes: true,
    placeholder: 'O que deu errado?',
    icon: Building2,
  },
  {
    value: 'sozinho',
    label: 'Sim, tentei fazer sozinho',
    precisaDetalhes: true,
    placeholder: 'O que te travou?',
    icon: UserX,
  },
  {
    value: 'varias-vezes',
    label: 'Sim, já tentei várias vezes',
    precisaDetalhes: true,
    placeholder: 'Conte um pouco:',
    icon: RotateCw,
  },
]

export default function HistoryStep({ historico, onNext, onBack }: HistoryStepProps) {
  const [selected, setSelected] = useState<string>(historico?.tentou || '')
  const [detalhes, setDetalhes] = useState<string>(historico?.detalhes || '')

  const opcaoSelecionada = opcoes.find((o) => o.value === selected)

  const handleSubmit = () => {
    onNext({
      tentou: selected,
      detalhes: opcaoSelecionada?.precisaDetalhes ? detalhes : '',
    })
  }

  const canContinue = () => {
    // Apenas verifica se uma opção foi selecionada, o textarea é opcional
    return selected !== ''
  }

  return (
    <div>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Você Já Tentou Resolver Isso
        <br />
        De Alguma Forma?
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-400 text-center mb-3"
      >
        Isso nos ajuda a não repetir erros e criar algo realmente novo
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5"
      >
        {opcoes.map((opcao, index) => {
          const Icon = opcao.icon
          const isSelected = selected === opcao.value
          
          return (
            <motion.div key={opcao.value} variants={fadeInUp} className="space-y-3">
              <motion.button
                type="button"
                onClick={() => {
                  setSelected(opcao.value)
                  setDetalhes('')
                }}
                className={`relative w-full p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  isSelected
                    ? 'border-[#365eff] bg-[#365eff]/10 shadow-lg shadow-[#365eff]/20'
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/70'
                }`}
              >
                <div className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-[#365eff]/20' 
                    : 'bg-gray-800/50'
                }`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isSelected 
                      ? 'text-[#365eff]' 
                      : 'text-[#365eff]/70'
                  }`} strokeWidth={2} />
                </div>
                <span className={`text-[13px] sm:text-sm leading-tight font-medium flex-1 text-left ${
                  isSelected 
                    ? 'text-white' 
                    : 'text-gray-300'
                }`}>
                  {opcao.label}
                </span>
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#365eff]" strokeWidth={2.5} />
                  </motion.div>
                )}
              </motion.button>

              {isSelected && opcao.precisaDetalhes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <textarea
                    value={detalhes}
                    onChange={(e) => setDetalhes(e.target.value)}
                    placeholder={opcao.placeholder}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors resize-none"
                  />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

        <div className="flex justify-center mt-4">
          <Button
            size="md"
            onClick={handleSubmit}
            disabled={!canContinue()}
            className="w-full sm:w-auto min-w-[180px]"
          >
            Continuar →
          </Button>
        </div>
    </div>
  )
}
