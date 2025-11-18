'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const comparisonData = [
  {
    feature: 'Equipe Completa',
    voglio: true,
    voglioLabel: 'Equipe integrada',
    freelancers: false,
    freelancersLabel: 'Apenas 1 profissional',
    agencies: false,
    agenciesLabel: 'Equipes separadas',
    icon: '👥',
  },
  {
    feature: 'Dev + Marketing + Vendas',
    voglio: true,
    voglioLabel: 'Tudo integrado',
    freelancers: false,
    freelancersLabel: 'Apenas desenvolvimento',
    agencies: 'Parcial',
    agenciesLabel: 'Falta integração',
    icon: '🚀',
  },
  {
    feature: 'Tempo de Entrega',
    voglio: '30-90 dias',
    voglioLabel: 'Sistema completo',
    freelancers: '3-6 meses',
    freelancersLabel: 'Atrasos frequentes',
    agencies: '60-120 dias',
    agenciesLabel: 'Processo lento',
    icon: '⏱️',
  },
  {
    feature: 'Suporte Pós-Lançamento',
    voglio: '30 dias incluso',
    voglioLabel: 'Sem custo extra',
    freelancers: 'Não incluso',
    freelancersLabel: 'Cobrado à parte',
    agencies: 'Cobrado à parte',
    agenciesLabel: 'Custo adicional',
    icon: '🛟',
  },
  {
    feature: 'Preço Transparente',
    voglio: true,
    voglioLabel: 'Orçamento claro',
    freelancers: 'Variável',
    freelancersLabel: 'Custos ocultos',
    agencies: 'Oculto',
    agenciesLabel: 'Sem transparência',
    icon: '💰',
  },
  {
    feature: 'Foco em ROI',
    voglio: true,
    voglioLabel: 'Resultados garantidos',
    freelancers: false,
    freelancersLabel: 'Apenas entrega técnica',
    agencies: 'Parcial',
    agenciesLabel: 'Foco em processos',
    icon: '📈',
  },
  {
    feature: 'Tecnologias Modernas',
    voglio: true,
    voglioLabel: 'Stack atualizado',
    freelancers: 'Variável',
    freelancersLabel: 'Depende do profissional',
    agencies: true,
    agenciesLabel: 'Tecnologias modernas',
    icon: '⚡',
  },
  {
    feature: 'Consultoria Gratuita',
    voglio: true,
    voglioLabel: 'Estratégia sem custo',
    freelancers: false,
    freelancersLabel: 'Não oferece',
    agencies: false,
    agenciesLabel: 'Cobrado separadamente',
    icon: '🎯',
  },
]

function ComparisonCard({ item, index }: { item: typeof comparisonData[0], index: number }) {
  const getVoglioDisplay = () => {
    if (item.voglio === true) {
      return { icon: '✓', text: item.voglioLabel, color: 'text-green-500' }
    }
    return { icon: '', text: item.voglio, color: 'text-white' }
  }

  const getFreelancersDisplay = () => {
    if (item.freelancers === false) {
      return { icon: '✗', text: item.freelancersLabel, color: 'text-red-500/70' }
    }
    return { icon: '', text: item.freelancers, color: 'text-gray-400' }
  }

  const getAgenciesDisplay = () => {
    if (item.agencies === true) {
      return { icon: '✓', text: item.agenciesLabel, color: 'text-green-500' }
    }
    if (item.agencies === false) {
      return { icon: '✗', text: item.agenciesLabel, color: 'text-red-500/70' }
    }
    return { icon: '', text: item.agencies, color: 'text-gray-400' }
  }

  const voglio = getVoglioDisplay()
  const freelancers = getFreelancersDisplay()
  const agencies = getAgenciesDisplay()

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
    >
      {/* Feature Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">{item.icon}</div>
        <h3 className="text-lg md:text-xl font-bold text-white flex-1">{item.feature}</h3>
      </div>

      {/* Comparison - Mobile: Stacked, Desktop: Side by side */}
      <div className="space-y-4 md:space-y-3">
        {/* Voglio - Highlighted */}
        <div className="bg-primary/20 border border-primary/30 rounded-xl p-4 md:p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wide">Voglio</span>
            {voglio.icon && <span className={`text-xl ${voglio.color}`}>{voglio.icon}</span>}
          </div>
          <p className={`text-sm md:text-base font-medium ${voglio.color}`}>{voglio.text}</p>
        </div>

        {/* Freelancers */}
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-4 md:p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">Freelancers</span>
            {freelancers.icon && <span className={`text-xl ${freelancers.color}`}>{freelancers.icon}</span>}
          </div>
          <p className={`text-sm md:text-base ${freelancers.color}`}>{freelancers.text}</p>
        </div>

        {/* Agencies */}
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-4 md:p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">Agências</span>
            {agencies.icon && <span className={`text-xl ${agencies.color}`}>{agencies.icon}</span>}
          </div>
          <p className={`text-sm md:text-base ${agencies.color}`}>{agencies.text}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Comparison() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/30 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Por Que Escolher a <span className="text-primary">Voglio</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Veja a diferença que faz trabalhar com uma equipe completa e integrada
          </p>
        </motion.div>

        {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {comparisonData.map((item, index) => (
            <ComparisonCard key={index} item={item} index={index} />
          ))}
        </motion.div>

        {/* CTA Summary */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <p className="text-base sm:text-lg text-gray-300 mb-2">
              <span className="text-white font-semibold">Resultado:</span> Mais rápido, mais barato e mais eficiente
            </p>
            <p className="text-sm text-gray-500">Tudo em um só lugar, sem dor de cabeça</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
