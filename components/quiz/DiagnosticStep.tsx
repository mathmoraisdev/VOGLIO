'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { ObjectiveType } from '@/lib/quizLogic'
import InsightCard from './InsightCard'
import { 
  Globe, 
  Users, 
  TrendingDown, 
  Search, 
  TrendingUp, 
  Rocket,
  CheckCircle2,
  Circle,
  CircleDot,
  GraduationCap,
  ShoppingCart,
  Cloud,
  Briefcase,
  Building,
  Network,
  CheckSquare2,
  Square
} from 'lucide-react'

interface DiagnosticStepProps {
  objective: ObjectiveType
  diagnostico?: any
  onNext: (diagnostico: any) => void
  onBack: () => void
  onInsightGenerated?: (insight: any) => void
  microInsights?: Array<{ texto: string; tipo: 'oportunidade' | 'risco' | 'dica' | 'benchmark' }>
}

export default function DiagnosticStep({ objective, diagnostico, onNext, onBack, onInsightGenerated, microInsights = [] }: DiagnosticStepProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(diagnostico?.tipo || [])
  const [selectedOption, setSelectedOption] = useState<string>(diagnostico?.situacao || diagnostico?.problema || diagnostico?.negocio || '')

  const handleSubmit = async () => {
    const diagnosticoData = objective === 'criar-zero' 
      ? { tipo: selectedItems }
      : { [objective === 'gerar-clientes' ? 'situacao' : objective === 'corrigir' ? 'problema' : 'negocio']: selectedOption }
    
    // Gerar micro-insight após diagnóstico
    if (onInsightGenerated) {
      try {
        const response = await fetch('/api/quiz/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizData: { objetivo: objective, diagnostico: diagnosticoData },
            tipo: 'micro-insight',
            etapaAtual: 2,
          }),
        })
        if (response.ok) {
          const data = await response.json()
          if (data.insight) {
            onInsightGenerated(data.insight)
          }
        }
      } catch (error) {
        console.error('Erro ao gerar insight:', error)
      }
    }
    
    onNext(diagnosticoData)
  }

  const canContinue = () => {
    if (objective === 'criar-zero') {
      return selectedItems.length > 0
    }
    return selectedOption !== ''
  }

  // Criar do Zero
  if (objective === 'criar-zero') {
    const tipos = [
      'Site institucional',
      'E-commerce / Loja online',
      'Sistema web / Plataforma',
      'Aplicativo mobile',
      'Área de membros / Curso online',
      'Sistema de automação',
      'Landing pages de vendas',
    ]

    return (
      <div>
        {/* Micro-insights anteriores */}
        {microInsights.map((insight, index) => (
          <InsightCard key={index} texto={insight.texto} tipo={insight.tipo} />
        ))}

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
        >
          Perfeito! E O Que Você Precisa Criar?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-400 text-center mb-5"
        >
          Pode selecionar mais de uma opção:
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2 mb-5"
        >
          {tipos.map((tipo, index) => {
            const isSelected = selectedItems.includes(tipo)
            return (
              <motion.label
                key={tipo}
                variants={fadeInUp}
                className="flex items-center gap-2 p-3 rounded-lg border-2 border-gray-800 bg-gray-900/50 hover:border-gray-700 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems([...selectedItems, tipo])
                    } else {
                      setSelectedItems(selectedItems.filter((item) => item !== tipo))
                    }
                  }}
                  className="hidden"
                />
                <div className={`flex-shrink-0 p-1 rounded transition-colors ${
                  isSelected 
                    ? 'bg-[#365eff]/20' 
                    : 'bg-gray-800/50'
                }`}>
                  {isSelected ? (
                    <CheckSquare2 className="w-5 h-5 text-[#365eff]" strokeWidth={2} />
                  ) : (
                    <Square className="w-5 h-5 text-[#365eff]/60" strokeWidth={2} />
                  )}
                </div>
                <span className="text-sm text-gray-300 flex-1">{tipo}</span>
              </motion.label>
            )
          })}
        </motion.div>

        <div className="flex justify-center mt-4">
          <Button size="md" onClick={handleSubmit} disabled={!canContinue()} className="w-full sm:w-auto min-w-[180px]">
            Continuar →
          </Button>
        </div>
      </div>
    )
  }

  // Gerar Mais Clientes
  if (objective === 'gerar-clientes') {
    const opcoes = [
      {
        texto: 'Tenho site/sistema mas nenhum tráfego',
        icon: Globe,
        color: 'text-blue-400',
      },
      {
        texto: 'Tenho visitantes mas não convertem em clientes',
        icon: Users,
        color: 'text-purple-400',
      },
      {
        texto: 'Já anuncio mas não tenho retorno',
        icon: TrendingDown,
        color: 'text-red-400',
      },
      {
        texto: 'Não sei nem por onde começar a divulgar',
        icon: Search,
        color: 'text-yellow-400',
      },
      {
        texto: 'Preciso aumentar minhas vendas online',
        icon: TrendingUp,
        color: 'text-green-400',
      },
      {
        texto: 'Quero escalar meu negócio com tráfego pago',
        icon: Rocket,
        color: 'text-orange-400',
      },
    ]

    return (
      <div>
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
        >
          Entendi! Conte-me Sobre Sua
          <br />
          Situação Atual:
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-400 text-center mb-6"
        >
          Na próxima etapa vamos detalhar mais sobre tráfego
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6"
        >
          {opcoes.map((opcao, index) => {
            const Icon = opcao.icon
            const isSelected = selectedOption === opcao.texto
            
            return (
              <motion.button
                key={opcao.texto}
                type="button"
                variants={fadeInUp}
                onClick={() => setSelectedOption(opcao.texto)}
                className={`relative p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 min-h-[120px] sm:min-h-[140px] ${
                  isSelected
                    ? 'border-[#365eff] bg-[#365eff]/10 shadow-lg shadow-[#365eff]/20'
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/70'
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 h-full">
                  <div className={`p-2 sm:p-3 rounded-lg transition-colors ${
                    isSelected 
                      ? 'bg-[#365eff]/20' 
                      : 'bg-gray-800/50'
                  }`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-7 ${
                      isSelected 
                        ? 'text-[#365eff]' 
                        : opcao.color
                    }`} strokeWidth={2} />
                  </div>
                  <span className={`text-[13px] sm:text-sm leading-tight font-medium px-1 ${
                    isSelected 
                      ? 'text-white' 
                      : 'text-gray-300'
                  }`}>
                    {opcao.texto}
                  </span>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#365eff]" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        <div className="flex justify-center mt-4">
          <Button size="md" onClick={handleSubmit} disabled={!canContinue()} className="w-full sm:w-auto min-w-[180px]">
            Continuar →
          </Button>
        </div>
      </div>
    )
  }

  // Corrigir o que tenho
  if (objective === 'corrigir') {
    const problemas = [
      'O sistema trava / tem bugs constantes',
      'O design está desatualizado / não profissional',
      'Tenho tráfego mas conversão é baixíssima',
      'O sistema não escala / está lento',
      'Gastei em anúncios mas não vejo resultado',
      'Tudo foi feito separado e nada se integra',
    ]

    return (
      <div>
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
        >
          Ok! Qual o Principal Problema Hoje?
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2 mb-5"
        >
          {problemas.map((problema, index) => (
            <motion.label
              key={problema}
              variants={fadeInUp}
              className={`flex items-start gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedOption === problema
                  ? 'border-[#365eff] bg-[#365eff]/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="problema"
                value={problema}
                checked={selectedOption === problema}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-1 w-5 h-5 border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2"
              />
              <span className="text-gray-300 flex-1">{problema}</span>
            </motion.label>
          ))}
        </motion.div>

        <div className="flex justify-center mt-4">
          <Button size="md" onClick={handleSubmit} disabled={!canContinue()} className="w-full sm:w-auto min-w-[180px]">
            Continuar →
          </Button>
        </div>
      </div>
    )
  }

  // Solução Completa
  const negocios = [
    { 
      label: 'Infoproduto / Curso online / Mentoria',
      icon: GraduationCap
    },
    { 
      label: 'E-commerce / Loja online',
      icon: ShoppingCart
    },
    { 
      label: 'SaaS / Software como serviço',
      icon: Cloud
    },
    { 
      label: 'Serviços B2B / Consultoria',
      icon: Briefcase
    },
    { 
      label: 'Serviços locais (clínica, escritório, etc)',
      icon: Building
    },
    { 
      label: 'Marketplace / Plataforma',
      icon: Network
    },
  ]

  return (
    <div>
      {/* Micro-insights anteriores */}
      {microInsights.map((insight, index) => (
        <InsightCard key={index} texto={insight.texto} tipo={insight.tipo} />
      ))}

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4"
      >
        Excelente Escolha! Qual Tipo de Negócio?
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-6"
      >
        {negocios.map((negocio, index) => {
          const isSelected = selectedOption === negocio.label
          const Icon = negocio.icon
          return (
            <motion.label
              key={negocio.label}
              variants={fadeInUp}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#365eff] bg-[#365eff]/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="negocio"
                value={negocio.label}
                checked={isSelected}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="hidden"
              />
              <div className={`mt-1 flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                isSelected 
                  ? 'bg-[#365eff]/20' 
                  : 'bg-gray-800/50'
              }`}>
                <Icon className={`w-5 h-5 transition-colors ${
                  isSelected 
                    ? 'text-[#365eff]' 
                    : 'text-[#365eff]/60'
                }`} strokeWidth={2} />
              </div>
              <span className="text-gray-300 flex-1">{negocio.label}</span>
            </motion.label>
          )
        })}
      </motion.div>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleSubmit} disabled={!canContinue()} className="w-full sm:w-auto min-w-[200px]">
          Continuar →
        </Button>
      </div>
    </div>
  )
}
