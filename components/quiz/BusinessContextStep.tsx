'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Building2, Users, Target, TrendingUp, ChevronDown } from 'lucide-react'

import { ObjectiveType } from '@/lib/quizLogic'

interface BusinessContextStepProps {
  businessContext?: {
    nomeEmpresa?: string
    tipoNegocio?: string
    tamanho?: string
    mercado?: string
    investimentoAnuncios?: string
  }
  tipoNegocioJaColetado?: string
  objetivo?: ObjectiveType
  onNext: (businessContext: {
    nomeEmpresa: string
    tipoNegocio?: string
    tamanho?: string
    mercado?: string
    investimentoAnuncios?: string
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

const opcoesInvestimento = [
  'de R$ 1.000 a 5.000 por mês',
  'de R$ 6.000 a 10.000 por mês',
  'de R$ 11.000 a 50.000 por mês',
  'de R$ 51.000 a 200.000 por mês',
  'de R$ 201.000 a 500.000 por mês',
  'acima de R$ 500.000 por mês',
]

export default function BusinessContextStep({
  businessContext,
  tipoNegocioJaColetado,
  objetivo,
  onNext,
  onBack,
}: BusinessContextStepProps) {
  const [nomeEmpresa, setNomeEmpresa] = useState<string>(businessContext?.nomeEmpresa || '')
  const [tipoNegocio, setTipoNegocio] = useState<string>(
    businessContext?.tipoNegocio || tipoNegocioJaColetado || ''
  )
  const [tamanho, setTamanho] = useState<string>(businessContext?.tamanho || '')
  const [mercado, setMercado] = useState<string>(businessContext?.mercado || '')
  const [investimentoAnuncios, setInvestimentoAnuncios] = useState<string>(businessContext?.investimentoAnuncios || '')

  const canContinue = () => {
    return nomeEmpresa.trim().length > 0
  }

  const handleSubmit = () => {
    onNext({
      nomeEmpresa: nomeEmpresa.trim(),
      tipoNegocio: tipoNegocio || undefined,
      tamanho: tamanho || undefined,
      mercado: mercado || undefined,
      investimentoAnuncios: investimentoAnuncios || undefined,
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
            <div className="relative">
              <select
                value={tipoNegocio}
                onChange={(e) => setTipoNegocio(e.target.value)}
                className="w-full px-4 py-3 pr-10 bg-gray-950 border-2 border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-[#365eff] focus:ring-2 focus:ring-[#365eff]/20 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-700 hover:bg-gray-900/90 shadow-sm"
              >
                <option value="" className="bg-gray-950 text-gray-300">Selecione...</option>
                {tiposNegocio.map((tipo) => (
                  <option key={tipo} value={tipo} className="bg-gray-950 text-gray-100">
                    {tipo}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </div>
            </div>
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

        {/* Investimento - Opcional */}
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {objetivo === 'gerar-clientes' 
              ? 'Quanto você está disposto a investir em anúncios no seu negócio? (opcional)'
              : 'Quanto você está disposto a investir para iniciar seu projeto? (opcional)'
            }
          </label>
          <div className="relative">
            <select
              value={investimentoAnuncios}
              onChange={(e) => setInvestimentoAnuncios(e.target.value)}
              className="w-full px-4 py-3 pr-10 bg-gray-950 border-2 border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:border-[#365eff] focus:ring-2 focus:ring-[#365eff]/20 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-700 hover:bg-gray-900/90 shadow-sm"
            >
              <option value="" className="bg-gray-950 text-gray-300">Selecione...</option>
              {opcoesInvestimento.map((opcao) => (
                <option key={opcao} value={opcao} className="bg-gray-950 text-gray-100">
                  {opcao}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
            </div>
          </div>
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

