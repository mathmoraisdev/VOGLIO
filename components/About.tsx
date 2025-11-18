'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Ban, Clock, DollarSign, Check } from 'lucide-react'

const differentials = [
  {
    icon: Ban,
    title: 'Sem Dor de Cabeça Com Múltiplos Fornecedores',
    description: 'Você não precisa gerenciar dev, designer, copywriter e tráfego separadamente. Uma equipe integrada, um ponto de contato, zero estresse.',
    highlight: 'Tudo em um só lugar',
    metric: '1 equipe',
    metricLabel: 'vs. 5 fornecedores',
  },
  {
    icon: Clock,
    title: 'Do Zero ao Primeiro\nCliente em 45 Dias',
    description: 'Enquanto outros levam 6 meses tentando juntar peças, você já está vendendo. Sistema completo funcionando: produto + funil + tráfego.',
    highlight: '3x mais rápido',
    metric: '45 dias',
    metricLabel: 'vs. 6 meses',
  },
  {
    icon: DollarSign,
    title: 'Sem Custos Ocultos\nou Surpresas',
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
          <h2 className="text-[28px] font-bold mb-4 sm:mb-6 leading-tight px-2">
            A Única Agência Que Une
            <br />
            <span className="text-primary">
              Desenvolvimento + Marketing + Vendas
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto px-2 mb-6 sm:mb-8">
            Enquanto você perde tempo coordenando fornecedores, nossos clientes já estão vendendo. 
            Oferecemos: <span className="text-white font-semibold">sistemas web, landing pages, 
            funis de vendas e gestão de tráfego</span> — tudo integrado e funcionando em sincronia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-2xl p-5 sm:p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Metric Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />
                </div>
                <div className="text-right">
                  <div className="text-[18px] font-bold text-primary">
                    {item.metric}
                  </div>
                  <div className="text-xs text-gray-500">{item.metricLabel}</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-[18px] font-bold mb-2 sm:mb-3 text-white group-hover:text-primary transition-colors whitespace-pre-line">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
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

