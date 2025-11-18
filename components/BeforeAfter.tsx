'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const transformations = [
  {
    metric: 'Conversão',
    before: '2%',
    after: '18%',
    improvement: '+800%',
    icon: '📈',
  },
  {
    metric: 'Leads/Mês',
    before: '200',
    after: '2.500',
    improvement: '+1.150%',
    icon: '🎯',
  },
  {
    metric: 'CAC',
    before: 'R$ 150',
    after: 'R$ 45',
    improvement: '-70%',
    icon: '💰',
  },
  {
    metric: 'Tempo de Resposta',
    before: '24h',
    after: '5min',
    improvement: '-96%',
    icon: '⚡',
  },
]

export default function BeforeAfter() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Veja a <span className="text-primary">Transformação</span> Real
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Resultados reais de clientes que transformaram seus negócios conosco
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white">{item.metric}</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">ANTES</div>
                  <div className="text-2xl md:text-3xl font-bold text-red-400">{item.before}</div>
                </div>

                <div className="text-center border-x border-gray-800">
                  <div className="text-xs text-gray-500 mb-2">MELHORIA</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {item.improvement}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">DEPOIS</div>
                  <div className="text-2xl md:text-3xl font-bold text-green-400">{item.after}</div>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="mt-6 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <p className="text-base sm:text-lg text-gray-300">
              📊 <span className="text-white font-semibold">Média de melhoria:</span> 450% em 90 dias
            </p>
            <p className="text-sm text-gray-500 mt-2">Resultados baseados em projetos reais entregues</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

