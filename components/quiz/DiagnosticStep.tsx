'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { ObjectiveType } from '@/lib/quizLogic'
import InsightCard from './InsightCard'

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
  const [outro, setOutro] = useState<string>(diagnostico?.outro || '')

  const handleSubmit = async () => {
    const diagnosticoData = objective === 'criar-zero' 
      ? { tipo: selectedItems, outro }
      : { [objective === 'gerar-clientes' ? 'situacao' : objective === 'corrigir' ? 'problema' : 'negocio']: selectedOption, outro }
    
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
      return selectedItems.length > 0 || outro.trim() !== ''
    }
    return selectedOption !== '' || outro.trim() !== ''
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
          {tipos.map((tipo, index) => (
            <motion.label
              key={tipo}
              variants={fadeInUp}
              className="flex items-center gap-2 p-3 rounded-lg border-2 border-gray-800 bg-gray-900/50 hover:border-gray-700 cursor-pointer transition-all"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(tipo)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems([...selectedItems, tipo])
                  } else {
                    setSelectedItems(selectedItems.filter((item) => item !== tipo))
                  }
                }}
                className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2"
              />
              <span className="text-sm text-gray-300 flex-1">{tipo}</span>
            </motion.label>
          ))}
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
      'Tenho site/sistema mas nenhum tráfego',
      'Tenho visitantes mas não convertem em clientes',
      'Já anuncio mas não tenho retorno',
      'Não sei nem por onde começar a divulgar',
      'Preciso aumentar minhas vendas online',
      'Quero escalar meu negócio com tráfego pago',
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
          Entendi! Conte-me Sobre Sua
          <br />
          Situação Atual:
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2 mb-5"
        >
          {opcoes.map((opcao, index) => (
            <motion.label
              key={opcao}
              variants={fadeInUp}
              className={`flex items-start gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedOption === opcao
                  ? 'border-[#365eff] bg-[#365eff]/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="situacao"
                value={opcao}
                checked={selectedOption === opcao}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-1 w-5 h-5 border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2"
              />
              <span className="text-sm text-gray-300 flex-1">{opcao}</span>
            </motion.label>
          ))}
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

        <div className="mb-5">
          <input
            type="text"
            value={outro}
            onChange={(e) => setOutro(e.target.value)}
            placeholder="Outro:"
            className="w-full px-3 py-2 text-sm bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors"
          />
        </div>

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
    'Infoproduto / Curso online / Mentoria',
    'E-commerce / Loja online',
    'SaaS / Software como serviço',
    'Serviços B2B / Consultoria',
    'Serviços locais (clínica, escritório, etc)',
    'Marketplace / Plataforma',
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
        {negocios.map((negocio, index) => (
          <motion.label
            key={negocio}
            variants={fadeInUp}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedOption === negocio
                ? 'border-[#365eff] bg-[#365eff]/10'
                : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
            }`}
          >
            <input
              type="radio"
              name="negocio"
              value={negocio}
              checked={selectedOption === negocio}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1 w-5 h-5 border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2"
            />
            <span className="text-gray-300 flex-1">{negocio}</span>
          </motion.label>
        ))}
      </motion.div>

      <div className="mb-6">
        <input
          type="text"
          value={outro}
          onChange={(e) => setOutro(e.target.value)}
          placeholder="Outro:"
          className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors"
        />
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleSubmit} disabled={!canContinue()} className="w-full sm:w-auto min-w-[200px]">
          Continuar →
        </Button>
      </div>
    </div>
  )
}
