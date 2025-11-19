'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Mail, MessageCircle, Lock } from 'lucide-react'

interface ContactStepProps {
  contato?: {
    nome?: string
    email?: string
    whatsapp?: string
    empresa?: string
    optIn?: boolean
  }
  onNext: (contato: any) => void
  onBack: () => void
}

export default function ContactStep({ contato, onNext, onBack }: ContactStepProps) {
  const [formData, setFormData] = useState({
    nome: contato?.nome || '',
    email: contato?.email || '',
    whatsapp: contato?.whatsapp || '',
    empresa: contato?.empresa || '',
    optIn: contato?.optIn || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateWhatsApp = (whatsapp: string) => {
    // Remove caracteres não numéricos
    const numbers = whatsapp.replace(/\D/g, '')
    return numbers.length >= 10 && numbers.length <= 13
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório'
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp inválido (formato: DDD + número)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onNext(formData)
  }

  return (
    <div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
          <span className="text-2xl">🎉</span>
          <span className="text-white font-semibold">Perfeito! Agora Vamos Preparar Sua Análise Personalizada</span>
        </div>
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[20px] sm:text-2xl md:text-3xl font-bold text-white text-center mb-3"
      >
        Para Onde Enviamos Sua
        <br />
        Proposta Personalizada Com Roadmap?
      </motion.h2>

      <div className="space-y-4 mb-6">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            className={`w-full px-3 py-2 text-sm bg-gray-900/50 border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.nome ? 'border-red-500' : 'border-gray-800 focus:border-[#365eff]'
            }`}
            placeholder="Seu nome completo"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            E-mail Profissional *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-3 py-2 text-sm bg-gray-900/50 border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-800 focus:border-[#365eff]'
            }`}
            placeholder="seu@email.com"
          />
          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
            <Mail className="w-3 h-3" strokeWidth={2} />
            <span>Sua proposta chegará em até 2h</span>
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WhatsApp (com DDD) *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            className={`w-full px-3 py-2 text-sm bg-gray-900/50 border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.whatsapp ? 'border-red-500' : 'border-gray-800 focus:border-[#365eff]'
            }`}
            placeholder="(11) 99999-9999"
          />
          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
            <MessageCircle className="w-3 h-3" strokeWidth={2} />
            <span>Para agendar sua consultoria</span>
          </div>
          {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome da Empresa (opcional)
          </label>
          <input
            type="text"
            value={formData.empresa}
            onChange={(e) => handleChange('empresa', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors"
            placeholder="Nome da sua empresa"
          />
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="mb-5"
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.optIn}
            onChange={(e) => handleChange('optIn', e.target.checked)}
            className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#365eff] focus:ring-[#365eff] focus:ring-2"
          />
          <span className="text-xs text-gray-400">Quero receber conteúdos sobre crescimento digital</span>
        </label>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-5"
      >
        <Lock className="w-3 h-3" strokeWidth={2} />
        <span className="text-xs">
          Seus dados estão protegidos. Não compartilhamos com terceiros.{' '}
          <a href="#" className="text-[#365eff] hover:underline">
            Ver nossa Política de Privacidade
          </a>
        </span>
      </motion.div>

      <div className="flex justify-center mt-4">
        <Button
          size="md"
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[240px]"
        >
          Ver Minha Análise Personalizada →
        </Button>
      </div>
    </div>
  )
}
