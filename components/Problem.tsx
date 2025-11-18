'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { X, DollarSign, Clock, TrendingDown } from 'lucide-react'

const problems = [
  {
    icon: X,
    text: 'Sua ideia incrível está parada porque você não sabe por onde começar',
    solution: 'Criamos o sistema completo do zero: desenvolvimento, landing pages e estruturação do funil'
  },
  {
    icon: DollarSign,
    text: 'Já gastou dinheiro com freelancers ou agências que não entregaram resultados',
    solution: 'Equipe integrada com garantia de entrega: dev + marketing + vendas trabalhando juntos'
  },
  {
    icon: Clock,
    text: 'Está perdendo tempo tentando juntar devs, designers e profissionais de marketing',
    solution: 'Tudo em um só lugar: sistemas web, landing pages, funis e tráfego integrados'
  },
  {
    icon: TrendingDown,
    text: 'Tem um produto digital, mas não consegue gerar vendas consistentes',
    solution: 'Funil estruturado + tráfego qualificado = vendas recorrentes e previsíveis'
  },
]

export default function Problem() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[28px] font-bold mb-3 sm:mb-4 md:mb-6 px-2">
            Você Está Perdendo Dinheiro <span className="text-red-400">Todos os Dias</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2">
            Sem um sistema digital completo<br />funcionando para você 24/7
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4 md:space-y-6 mb-12 md:mb-16"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-r from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-xl p-4 sm:p-5 md:p-6 hover:border-red-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3">
                <problem.icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <p className="text-base sm:text-lg md:text-xl text-gray-300 pt-0.5 flex-1">{problem.text}</p>
              </div>
              <div className="ml-9 sm:ml-11 pl-3 sm:pl-4 border-l-2 border-primary/30">
                <p className="text-xs sm:text-sm text-primary font-semibold mb-1">Nossa solução:</p>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{problem.solution}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
            <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 px-2">
              E se você pudesse<br />ter <span className="text-primary">tudo isso resolvido</span><span className="text-primary">?</span>
            </p>
            <p className="text-sm sm:text-base text-gray-400 px-2">
              Com uma equipe completa desenvolvendo seu sistema, criando suas landing pages, estruturando seu funil e gerando tráfego qualificado
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

