'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { fadeInUp } from '@/lib/animations'
import { Building2, ShoppingBag, Rocket, Briefcase, Zap } from 'lucide-react'

const clients = [
  {
    title: 'SaaS',
    description: 'Sistemas escaláveis, soluções inovadoras criadas do zero que convertem assinantes recorrentes.',
    icon: Rocket,
    services: ['Desenvolvimento', 'UX & Design', 'Marketing'],
  },
  {
    title: 'Infoprodutores',
    description: 'Funis completos, landing pages otimizadas e tráfego qualificado para maximizar conversões.',
    icon: Zap,
    services: ['Funil de Vendas', 'Landing Pages', 'Tráfego Pago'],
  },
  {
    title: 'E-commerce',
    description: 'Plataformas completas, páginas de produto otimizadas e tráfego que gera vendas recorrentes.',
    icon: ShoppingBag,
    services: ['Criação & Manutenção', 'UX & Design', 'Mídia Paga'],
  },
  {
    title: 'Serviços B2B',
    description: 'Sistemas de gestão, automações de processos e landing pages que geram leads qualificados.',
    icon: Briefcase,
    services: ['Sistemas Web', 'Automações', 'Landing Pages'],
  },
  {
    title: 'Startups',
    description: 'MVP rápido, landing pages de validação e tráfego para testar e escalar seu produto.',
    icon: Rocket,
    services: ['Sistemas Web', 'Landing Pages', 'Tráfego Pago'],
  },
  {
    title: 'Agências',
    description: 'Sistemas white-label, automações de atendimento e ferramentas para escalar operações.',
    icon: Building2,
    services: ['Sistemas Web', 'Automações', 'Integrações'],
  },
]

export default function WhoWeServe() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % clients.length)
      }, 4000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <section className="relative py-20 md:py-32 bg-white" data-section-type="white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[26px] font-bold mb-3 sm:mb-4 px-2 text-gray-900">
            <span className="text-primary">Quem</span> Atendemos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Soluções personalizadas para diferentes tipos de negócios
          </p>
        </motion.div>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="min-w-full flex-shrink-0 w-full"
              >
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  <motion.div
                    key={`card-${index}-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <client.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{client.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                          {client.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {client.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-primary/80 bg-primary/5 border border-primary/10 px-3 py-1 rounded-md whitespace-nowrap"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsPaused(true)
                  setTimeout(() => setIsPaused(false), 2000)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

