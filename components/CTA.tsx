'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import Button from './ui/Button'
import { Zap, Lock, Check } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
            <div className="relative bg-primary/10 border border-primary/30 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
            
            <div className="relative z-10">
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" strokeWidth={2} />
                <span className="text-xs sm:text-sm font-semibold text-red-400">
                  Vagas limitadas este mês
                </span>
              </div>

              <h2 className="text-[28px] font-bold mb-3 sm:mb-4 md:mb-6 px-2 leading-tight">
                Pronto Para Ter Seu{' '}
                <span className="text-primary">
                  Sistema + Funil + Tráfego Funcionando?
                </span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-2 leading-relaxed">
                Agende sua consultoria estratégica <span className="text-white font-semibold">100% gratuita</span> e descubra 
                como podemos desenvolver seu sistema, criar suas landing pages, estruturar seu funil e gerar tráfego qualificado.{' '}
                <span className="text-gray-400">Sem compromisso.</span>
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-8"
              >
                <Button 
                  size="lg" 
                  onClick={() => {
                    window.location.href = '/quiz'
                  }}
                  className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] text-base sm:text-lg py-3 sm:py-4 md:py-5 min-h-[44px] sm:min-h-[56px]"
                >
                  Agendar Consultoria Gratuita
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-400 pt-4 sm:pt-6 border-t border-gray-800">
                <span className="flex items-center gap-1.5 sm:gap-2 min-h-[44px] px-2">
                  <Lock className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={2} /> 
                  <span>Seus dados estão seguros</span>
                </span>
                <span className="hidden sm:inline text-gray-700">•</span>
                <span className="flex items-center gap-1.5 sm:gap-2 min-h-[44px] px-2">
                  <Zap className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} /> 
                  <span>Resposta em até 24h</span>
                </span>
                <span className="hidden sm:inline text-gray-700">•</span>
                <span className="flex items-center gap-1.5 sm:gap-2 min-h-[44px] px-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} /> 
                    <span>100% gratuito</span>
                </span>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-500 text-sm mb-3">Junte-se aos nossos clientes:</p>
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <span>★★★★★</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  <span className="text-white font-semibold">95% de satisfação</span> • Mais de 100 projetos entregues
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

