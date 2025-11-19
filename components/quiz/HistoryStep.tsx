'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'

interface HistoryStepProps {
  historico?: { tentou?: string; detalhes?: string }
  onNext: (historico: { tentou: string; detalhes: string }) => void
  onBack: () => void
}

const opcoes = [
  {
    value: 'nao-tentou',
    label: 'Não, é a primeira vez que vou investir nisso',
    precisaDetalhes: false,
  },
  {
    value: 'freelancer',
    label: 'Sim, já contratei freelancer',
    precisaDetalhes: true,
    placeholder: 'O que deu errado?',
  },
  {
    value: 'agencia',
    label: 'Sim, já contratei outra agência',
    precisaDetalhes: true,
    placeholder: 'O que deu errado?',
  },
  {
    value: 'sozinho',
    label: 'Sim, tentei fazer sozinho',
    precisaDetalhes: true,
    placeholder: 'O que te travou?',
  },
  {
    value: 'varias-vezes',
    label: 'Sim, já tentei várias vezes',
    precisaDetalhes: true,
    placeholder: 'Conte um pouco:',
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
    if (!selected) return false
    if (opcaoSelecionada?.precisaDetalhes) {
      return detalhes.trim().length > 0
    }
    return true
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
          className="space-y-2 mb-5"
      >
        {opcoes.map((opcao, index) => (
          <motion.div key={opcao.value} variants={fadeInUp}>
            <motion.label
              className={`flex items-start gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selected === opcao.value
                  ? 'border-[#365eff] bg-[#365eff]/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="historico"
                value={opcao.value}
                checked={selected === opcao.value}
                onChange={(e) => {
                  setSelected(e.target.value)
                  setDetalhes('')
                }}
                className="mt-1 w-5 h-5 border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2"
              />
              <span className="text-sm text-gray-300 flex-1">{opcao.label}</span>
            </motion.label>

            {selected === opcao.value && opcao.precisaDetalhes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 ml-8"
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
        ))}
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
