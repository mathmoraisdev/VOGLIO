'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const problems = [
  {
    icon: '❌',
    text: 'Sua ideia incrível está parada porque você não sabe por onde começar'
  },
  {
    icon: '💸',
    text: 'Já gastou dinheiro com freelancers ou agências que não entregaram resultados'
  },
  {
    icon: '⏰',
    text: 'Está perdendo tempo tentando juntar devs, designers e profissionais de marketing'
  },
  {
    icon: '📉',
    text: 'Tem um produto digital, mas não consegue gerar vendas consistentes'
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Você Está Perdendo Dinheiro <span className="text-red-400">Todos os Dias</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Sem um sistema digital completo funcionando para você 24/7
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
              className="flex items-start gap-4 bg-gradient-to-r from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-xl p-4 md:p-6 hover:border-gray-700/50 transition-all duration-300"
            >
              <span className="text-2xl sm:text-3xl flex-shrink-0">{problem.icon}</span>
              <p className="text-base sm:text-lg text-gray-300 pt-1">{problem.text}</p>
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
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              E se você pudesse ter <span className="text-primary">tudo isso resolvido</span>?
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Com uma equipe completa trabalhando no seu projeto
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

