'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

const differentials = [
  {
    icon: '🚫',
    title: 'Sem Dor de Cabeça Com Múltiplos Fornecedores',
    description: 'Você não precisa gerenciar dev, designer, copywriter e tráfego separadamente. Uma equipe integrada, um ponto de contato, zero estresse.',
    highlight: 'Tudo em um só lugar',
    metric: '1 equipe',
    metricLabel: 'vs. 5 fornecedores',
  },
  {
    icon: '⏱️',
    title: 'Do Zero ao Primeiro Cliente em 45 Dias',
    description: 'Enquanto outros levam 6 meses tentando juntar peças, você já está vendendo. Sistema completo funcionando: produto + funil + tráfego.',
    highlight: '3x mais rápido',
    metric: '45 dias',
    metricLabel: 'vs. 6 meses',
  },
  {
    icon: '💰',
    title: 'Sem Custos Ocultos ou Surpresas',
    description: 'Freelancers = retrabalho. Agências separadas = integração quebrada. Com a Voglio: preço fixo, escopo claro, resultados garantidos.',
    highlight: 'Transparência total',
    metric: 'R$ 0',
    metricLabel: 'custos extras',
  },
]

export default function About() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight px-2">
            A Única Agência Que Une{' '}
            <span className="text-primary">
              Dev + Marketing + Vendas
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto px-2 mb-8">
            Enquanto você perde tempo coordenando fornecedores, nossos clientes já estão vendendo. <span className="text-white font-semibold">Veja por quê:</span>
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">120+ Projetos Entregues</span>
            </div>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">R$ 50M+ em Vendas</span>
            </div>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">95% de Satisfação</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Metric Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {item.metric}
                  </div>
                  <div className="text-xs text-gray-500">{item.metricLabel}</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Highlight Badge */}
              <div className="inline-block bg-primary/20 border border-primary/30 rounded-lg px-3 py-1.5 mt-auto">
                <span className="text-xs sm:text-sm font-semibold text-primary">{item.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

