'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import Button from './ui/Button'

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
          <div className="relative bg-primary/10 border border-primary/30 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
            
            <div className="relative z-10">
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                <span className="text-xl">⚡</span>
                <span className="text-sm font-semibold text-red-400">
                  Apenas 5 vagas disponíveis este mês
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2 leading-tight">
                Pronto Para Ser Nosso Próximo{' '}
                <span className="text-primary">
                  Case de Sucesso
                </span>
                ?
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto px-2">
                Agende sua consultoria estratégica <span className="text-white font-semibold">100% gratuita</span> agora.{' '}
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
                    // Substitua o número abaixo pelo número real do WhatsApp da Voglio
                    const whatsappNumber = '5511999999999' // Formato: código do país + DDD + número
                    const message = encodeURIComponent('Olá! Quero agendar minha consultoria gratuita com a Voglio.')
                    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
                  }}
                  className="w-full sm:w-auto min-w-[320px] text-lg py-5"
                >
                  Sim, Quero Agendar Minha Consultoria Gratuita
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400 pt-6 border-t border-gray-800">
                <span className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">🔒</span> Seus dados estão seguros
                </span>
                <span className="hidden sm:inline text-gray-700">•</span>
                <span className="flex items-center gap-2">
                  <span className="text-primary text-lg">⚡</span> Resposta em até 24h
                </span>
                <span className="hidden sm:inline text-gray-700">•</span>
                <span className="flex items-center gap-2">
                    <span className="text-primary text-lg">✓</span> 100% gratuito
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

