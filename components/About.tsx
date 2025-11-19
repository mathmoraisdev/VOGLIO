'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { CheckCircle2, X, AlertTriangle, DollarSign, Clock, AlertCircle, TrendingDown } from 'lucide-react'

const sections = [
  {
    title: 'Você contrata um desenvolvedor',
    items: [
      { type: 'success', Icon: CheckCircle2, text: 'Sistema funcional' },
      { type: 'error', Icon: X, text: 'Não converte' },
      { type: 'error', Icon: X, text: 'Sem estrutura para tráfego' },
      { type: 'error', Icon: X, text: 'Analytics quebrado' },
    ],
  },
  {
    title: 'Aí você contrata tráfego',
    items: [
      { type: 'warning', Icon: AlertTriangle, text: 'Site não preparado' },
      { type: 'warning', Icon: AlertTriangle, text: 'Precisa refazer tudo' },
      { type: 'warning', Icon: AlertTriangle, text: 'Tracking quebrado' },
    ],
  },
  {
    title: 'Resultado:',
    items: [
      { type: 'consequence', Icon: DollarSign, text: 'Gasta 2x mais' },
      { type: 'consequence', Icon: Clock, text: 'Perde 6 meses' },
      { type: 'consequence', Icon: AlertCircle, text: 'Sem saber quem culpar' },
      { type: 'consequence', Icon: TrendingDown, text: 'Tráfego que não converte' },
    ],
  },
]

const iconStyles = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  consequence: 'text-orange-500',
}

const iconBgStyles = {
  success: 'bg-green-500/10 border-green-500/20',
  error: 'bg-red-500/10 border-red-500/20',
  warning: 'bg-yellow-500/10 border-yellow-500/20',
  consequence: 'bg-orange-500/10 border-orange-500/20',
}

export default function About() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Título Principal */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-[24px] sm:text-4xl md:text-5xl font-bold mb-4 leading-tight px-2">
            O QUE ACONTECE QUANDO VOCÊ CONTRATA{' '}
            <span className="text-primary">EMPRESAS SEPARADAS</span>
          </h2>
        </motion.div>

        {/* Seções Principais */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-10 md:space-y-12"
        >
          {sections.map((section, sectionIndex) => {
            const isResultCard = sectionIndex === sections.length - 1
            
            return (
              <motion.div key={sectionIndex} variants={fadeInUp}>
                {/* Card da Seção */}
                <div className={`rounded-2xl p-8 md:p-10 lg:p-12 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isResultCard 
                    ? 'bg-gradient-to-br from-red-950/20 to-red-900/10 border border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10' 
                    : 'bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 hover:border-primary/30 hover:shadow-primary/5'
                }`}>
                  {/* Título da Seção */}
                  <div className={`mb-8 md:mb-10 pb-5 border-b ${
                    isResultCard ? 'border-red-500/20' : 'border-gray-800/50'
                  }`}>
                    <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${
                      isResultCard ? 'text-red-200' : 'text-white'
                    }`}>
                      {section.title}
                    </h3>
                  </div>

                  {/* Lista de Itens */}
                  <div className="space-y-5 md:space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="flex items-center gap-5 md:gap-6 group"
                      >
                        {/* Ícone com Background */}
                        <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                          isResultCard 
                            ? 'bg-red-500/10 border-red-500/20' 
                            : iconBgStyles[item.type]
                        }`}>
                          <item.Icon 
                            className={`w-6 h-6 md:w-7 md:h-7 ${
                              isResultCard 
                                ? 'text-red-400' 
                                : iconStyles[item.type]
                            }`} 
                            strokeWidth={2}
                          />
                        </div>
                        
                        {/* Texto */}
                        <div className="flex-1">
                          <p className={`text-lg md:text-xl font-medium leading-relaxed transition-colors ${
                            isResultCard 
                              ? 'text-red-200 group-hover:text-red-100' 
                              : 'text-gray-300 group-hover:text-gray-200'
                          }`}>
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Separador Visual */}
                {sectionIndex < sections.length - 1 && (
                  <div className="flex items-center justify-center py-8 md:py-10">
                    <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
