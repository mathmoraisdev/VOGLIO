'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const cases = [
  {
    client: 'Tech Startup',
    industry: 'SaaS',
    challenge: 'Sem sistema de vendas estruturado',
    result: 'R$ 2.5M em 6 meses',
    metric: '+450%',
    metricLabel: 'ROI',
    time: '90 dias',
    icon: '🚀',
  },
  {
    client: 'Infoprodutos',
    industry: 'Educação Online',
    challenge: 'Landing pages com baixa conversão',
    result: 'De 2% para 18% de conversão',
    metric: '9x',
    metricLabel: 'Mais Vendas',
    time: '45 dias',
    icon: '📚',
  },
  {
    client: 'E-commerce',
    industry: 'Moda',
    challenge: 'Tráfego sem qualificação',
    result: '15 mil leads qualificados/mês',
    metric: '-65%',
    metricLabel: 'CAC',
    time: '60 dias',
    icon: '🛍️',
  },
]

export default function CaseStudies() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Cases de <span className="text-primary">Sucesso</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Veja como transformamos ideias em negócios lucrativos
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{caseItem.icon}</div>
              
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {caseItem.client}
                </h3>
                <p className="text-sm text-gray-500">{caseItem.industry}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-800">
                <p className="text-sm text-gray-400 mb-2">Desafio:</p>
                <p className="text-gray-300">{caseItem.challenge}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Resultado:</p>
                <p className="text-lg font-semibold text-white">{caseItem.result}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {caseItem.metric}
                  </div>
                  <div className="text-xs text-gray-500">{caseItem.metricLabel}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary">{caseItem.time}</div>
                  <div className="text-xs text-gray-500">Prazo</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

