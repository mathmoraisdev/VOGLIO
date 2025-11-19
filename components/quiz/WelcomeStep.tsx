'use client'

import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { Check, Lock, MessageSquare } from 'lucide-react'

interface WelcomeStepProps {
  onStart: () => void
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="text-center">
      {/* Logo placeholder */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <div className="text-3xl font-bold text-white mb-2">VOGLIO</div>
        <div className="h-1 w-24 bg-[#365eff] mx-auto rounded-full" />
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[24px] sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
      >
        Ótimo! Vamos Descobrir a Solução
        <br />
        Perfeita Para Seu Negócio
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
      >
        Em 2 minutos, vamos entender sua situação e criar uma estratégia personalizada para você.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 sm:p-8 mb-8 text-left"
      >
        <p className="text-white font-semibold mb-4">Ao final, você vai receber:</p>
        <div className="space-y-3">
          {[
            'Análise do que você realmente precisa',
            'Roadmap personalizado com prazos',
            'Estimativa de investimento e ROI esperado',
            'Próximos passos claros',
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Button size="lg" onClick={onStart} className="w-full sm:w-auto min-w-[280px]">
          Começar Minha Análise →
        </Button>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8"
      >
        <Lock className="w-4 h-4" strokeWidth={2} />
        <span>Suas informações são 100% confidenciais</span>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="border-t border-gray-800 pt-8"
      >
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-start gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-[#365eff] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div className="text-left">
              <p className="text-gray-300 italic mb-1">
                &quot;Levei 90 segundos e a proposta que recebi foi exatamente o que eu precisava&quot;
              </p>
              <p className="text-gray-500 text-sm">— Carlos M., CEO TechFlow</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
