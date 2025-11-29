'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, FileText, Zap, Rocket, Check, Clock } from 'lucide-react'
import { useScrollAnimation, getStaggerDelay } from '@/hooks/useScrollAnimation'

const steps = [
  {
    number: '01',
    title: 'Consultoria Estratégica',
    description: 'Entendemos seu negócio e definimos: sistema necessário, estrutura do funil, estratégia de tráfego e landing pages. Sem compromisso.',
    duration: '1 dia',
    icon: Target,
    services: ['Análise do sistema necessário', 'Estruturação do funil', 'Planejamento de tráfego', 'Definição de landing pages'],
    details: null,
  },
  {
    number: '02',
    title: 'Planejamento & Estratégia',
    description: 'Criamos roadmap detalhado: desenvolvimento do sistema, criação das landing pages, estruturação do funil e planejamento de tráfego.',
    duration: 'Semana 1-2',
    icon: FileText,
    services: ['Roadmap do sistema', 'Estrutura do funil', 'Planejamento de campanhas'],
    details: [
      'Briefing completo do projeto',
      'Definição de objetivos e KPIs',
      'Estruturação do funil',
    ],
  },
  {
    number: '03',
    title: 'Implementação Ágil',
    description: 'Desenvolvimento do sistema, criação das landing pages, estruturação do funil e início da gestão de tráfego tudo em paralelo.',
    duration: 'Semana 3-4 + Mês 2',
    icon: Zap,
    services: ['Desenvolvimento do sistema', 'Criação das landing pages', 'Estruturação do funil', 'Configuração de tráfego'],
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
    title: 'Do Lançamento à Escala',
    description: 'Sistema no ar, funil funcionando, tráfego gerando leads qualificados e vendas acontecendo. Otimização contínua.',
    duration: 'Mês 3+',
    icon: Rocket,
    services: ['Sistema no ar', 'Funil ativo', 'Tráfego gerando leads', 'Otimização contínua'],
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
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50"
    >
      <div className="max-w-6xl lg:max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`text-[20px] md:text-[28px] font-bold mb-3 sm:mb-4 px-2 scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
          >
            Como <span className="text-primary">Entregamos</span><br />Seus Serviços
          </h2>
          <p 
            className={`text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2 scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            Processo simples e transparente: do planejamento do sistema até o tráfego gerando vendas
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative scroll-animate-card ${isVisible ? 'is-visible' : ''}`}
              style={{ animationDelay: `${0.5 + index * 1.2}s` }}
            >
              <div
                className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 group lg:max-w-3xl lg:mx-auto ${
                  step.details ? 'cursor-pointer' : ''
                } ${openIndex === index ? 'border-primary/50 shadow-lg shadow-primary/20' : 'hover:border-primary/30 hover:shadow-lg'}`}
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

                <button
                  onClick={() => step.details && toggleStep(index)}
                  disabled={!step.details}
                  className="w-full text-left"
                >
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6 p-5 sm:p-6 md:p-8">
                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-sm sm:text-base font-bold text-primary">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <step.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                          <h3 className="text-xl sm:text-2xl lg:text-lg font-bold group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                          {step.description}
                        </p>
                        {step.services && (
                          <div className="flex flex-wrap gap-2">
                            {step.services.map((service, idx) => (
                              <span key={idx} className="text-xs sm:text-sm bg-primary/10 text-primary border border-primary/20 px-2 sm:px-3 py-1 rounded-lg">
                                {service}
                              </span>
                            ))}
                          </div>
                        )}
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
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                <span className="text-gray-300 text-sm md:text-base">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </button>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-full w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div 
          className={`text-center mt-12 md:mt-16 scroll-animate-scale ${isVisible ? 'is-visible' : ''}`}
          style={{ animationDelay: '5.5s' }}
        >
          <div className="relative inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6 text-center">
            <Clock className="absolute top-3 left-3 sm:top-4 sm:left-4 w-5 h-5 text-primary" strokeWidth={2} />
            <div>
              <p className="text-base sm:text-lg text-gray-300 mb-2">
                <span className="text-white font-semibold">Tempo médio:</span><br />30-90 dias do início ao lançamento
              </p>
              <p className="text-sm text-gray-500">Com entregas semanais e total transparência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
