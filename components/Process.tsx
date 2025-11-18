'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'Consultoria Estratégica',
    description: 'Entendemos profundamente seu negócio, objetivos e público-alvo. Sem compromisso.',
    duration: '1 dia',
    icon: '🎯',
    details: null, // Sem detalhes para esta etapa
  },
  {
    number: '02',
    title: 'Planejamento & Estratégia',
    description: 'Criamos uma estratégia sob medida com cronograma, entregas e investimento detalhados.',
    duration: 'Semana 1-2',
    icon: '📋',
    details: [
      'Briefing completo do projeto',
      'Definição de objetivos e KPIs',
      'Estruturação do funil',
      'Wireframes e protótipos',
    ],
  },
  {
    number: '03',
    title: 'Implementação Ágil',
    description: 'Nossa equipe completa trabalha no seu projeto com entregas semanais e total transparência.',
    duration: 'Semana 3-4 + Mês 2',
    icon: '⚡',
    details: [
      'Design finalizado',
      'Desenvolvimento em andamento',
      'Primeiras entregas visuais',
      'Ajustes e refinamentos',
      'Sistema funcional completo',
      'Testes de usabilidade',
      'Otimizações de performance',
      'Preparação para lançamento',
    ],
  },
  {
    number: '04',
    title: 'Lançamento & Escala',
    description: 'Colocamos seu negócio no ar e otimizamos continuamente para maximizar resultados.',
    duration: 'Mês 3+',
    icon: '🚀',
    details: [
      'Sistema no ar e funcionando',
      'Tráfego qualificado ativo',
      'Primeiros resultados mensuráveis',
      'Otimização contínua',
    ],
  },
]

export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Como <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Um processo simples e transparente do início ao fim
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6 md:space-y-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
            >
              <motion.div
                className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 group ${
                  step.details ? 'cursor-pointer' : ''
                } ${openIndex === index ? 'border-primary/50' : 'hover:border-primary/30'}`}
              >
                {/* Expand Icon - Top Right of Card */}
                {step.details && (
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 flex items-center justify-center z-10"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400 group-hover:text-primary transition-colors"
                    >
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                )}

                <motion.button
                  onClick={() => step.details && toggleStep(index)}
                  disabled={!step.details}
                  className="w-full text-left"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-primary">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">{step.icon}</span>
                          <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details - Inside Card */}
                  {step.details && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: openIndex === index ? 'auto' : 0, 
                        opacity: openIndex === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-gray-800/50">
                        <div className="pt-6">
                          <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                            Detalhes da Etapa
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                                <span className="text-gray-300 text-sm md:text-base">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-full w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <p className="text-base sm:text-lg text-gray-300 mb-2">
              ⏱️ <span className="text-white font-semibold">Tempo médio:</span> 60-90 dias do início ao lançamento
            </p>
            <p className="text-sm text-gray-500">Com entregas semanais e total transparência</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
