'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Building2, Users, Target, TrendingUp } from 'lucide-react'

interface BusinessContextStepProps {
  businessContext?: {
    nomeEmpresa?: string
    tipoNegocio?: string
    tamanho?: string
    mercado?: string
    concorrentes?: string
  }
  tipoNegocioJaColetado?: string
  onNext: (businessContext: {
    nomeEmpresa: string
    tipoNegocio?: string
    tamanho?: string
    mercado?: string
    concorrentes?: string
  }) => void
  onBack: () => void
}

const tiposNegocio = [
  'Infoproduto / Curso online / Mentoria',
  'E-commerce / Loja online',
  'SaaS / Software como serviço',
  'Serviços B2B / Consultoria',
  'Serviços locais',
  'Marketplace / Plataforma',
  'Outro',
]

const tamanhos = [
  { value: 'iniciante', label: 'Estou começando', icon: Target },
  { value: 'pequeno', label: 'Pequeno (até 5 funcionários)', icon: Users },
  { value: 'medio', label: 'Médio (6-20 funcionários)', icon: Building2 },
  { value: 'grande', label: 'Grande (20+ funcionários)', icon: TrendingUp },
]

export default function BusinessContextStep({
  businessContext,
  tipoNegocioJaColetado,
  onNext,
  onBack,
}: BusinessContextStepProps) {
  const [nomeEmpresa, setNomeEmpresa] = useState<string>(businessContext?.nomeEmpresa || '')
  const [tipoNegocio, setTipoNegocio] = useState<string>(
    businessContext?.tipoNegocio || tipoNegocioJaColetado || ''
  )
  const [tamanho, setTamanho] = useState<string>(businessContext?.tamanho || '')
  const [mercado, setMercado] = useState<string>(businessContext?.mercado || '')
  const [concorrentes, setConcorrentes] = useState<string>(businessContext?.concorrentes || '')

  const canContinue = () => {
    return nomeEmpresa.trim().length > 0
  }

  const handleSubmit = () => {
    onNext({
      nomeEmpresa: nomeEmpresa.trim(),
      tipoNegocio: tipoNegocio || undefined,
      tamanho: tamanho || undefined,
      mercado: mercado || undefined,
      concorrentes: concorrentes || undefined,
    })
  }

  return (
    <div>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Conte-nos Sobre Seu Negócio
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-400 text-center mb-6"
      >
        Isso nos ajuda a criar uma proposta ainda mais personalizada
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-5 mb-6"
      >
        {/* Nome da Empresa - Obrigatório */}
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome da Empresa <span className="text-[#365eff]">*</span>
          </label>
          <input
            type="text"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
            placeholder="Ex: Minha Empresa LTDA"
            className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors"
          />
        </motion.div>

        {/* Tipo de Negócio - Apenas se não foi coletado antes */}
        {!tipoNegocioJaColetado && (
          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Negócio (opcional)
            </label>
            <select
              value={tipoNegocio}
              onChange={(e) => setTipoNegocio(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#365eff] transition-colors"
            >
              <option value="">Selecione...</option>
              {tiposNegocio.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Tamanho - Opcional */}
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tamanho da Empresa (opcional)
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {tamanhos.map((item) => {
              const Icon = item.icon
              const isSelected = tamanho === item.value
              return (
                <motion.button
                  key={item.value}
                  type="button"
                  onClick={() => setTamanho(isSelected ? '' : item.value)}
                  className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'border-[#365eff] bg-[#365eff]/10 shadow-lg shadow-[#365eff]/20'
                      : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/70'
                  }`}
                >
                  <div className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                    isSelected 
                      ? 'bg-[#365eff]/20' 
                      : 'bg-gray-800/50'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isSelected 
                        ? 'text-[#365eff]' 
                        : 'text-[#365eff]/70'
                    }`} strokeWidth={2} />
                  </div>
                  <span className={`text-xs sm:text-sm leading-tight font-medium flex-1 text-left ${
                    isSelected 
                      ? 'text-white' 
                      : 'text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      <svg
                        className="w-4 h-4 text-[#365eff]"
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
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Mercado/Segmento - Opcional */}
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mercado/Segmento (opcional)
          </label>
          <input
            type="text"
            value={mercado}
            onChange={(e) => setMercado(e.target.value)}
            placeholder="Ex: Saúde, Educação, Tecnologia..."
            className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors"
          />
        </motion.div>

        {/* Concorrentes - Opcional */}
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Principais Concorrentes (opcional)
          </label>
          <textarea
            value={concorrentes}
            onChange={(e) => setConcorrentes(e.target.value)}
            placeholder="Mencione seus principais concorrentes..."
            rows={2}
            className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors resize-none"
          />
        </motion.div>
      </motion.div>

      <div className="flex justify-center mt-6">
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

