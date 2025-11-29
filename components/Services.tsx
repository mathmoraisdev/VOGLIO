'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Rocket, DollarSign, TrendingUp, Bot, Check, Zap } from 'lucide-react'

const services = [
  {
    title: 'Desenvolvimento de Sistemas',
    description: 'Sistemas web completos, apps mobile e plataformas SaaS. Arquitetura escalável, código limpo e performance otimizada. Do MVP ao produto final.',
    benefits: ['Tecnologia de ponta', 'Escalável desde o dia 1', 'Manutenção facilitada'],
    icon: Rocket,
    serviceType: 'Sistema Web',
  },
  {
    title: 'Automações e Integrações',
    description: 'Automação completa de processos, integrações entre sistemas e workflows inteligentes. Reduza trabalho manual e aumente a eficiência operacional.',
    benefits: ['Processos automatizados', 'Integrações nativas', 'Workflows inteligentes'],
    icon: Zap,
    serviceType: 'Automações',
  },
  {
    title: 'Landing Pages de Alta Conversão',
    description: 'Landing pages otimizadas com copy persuasivo e design que converte. Aumento médio de 340% na conversão. Testes A/B incluídos.',
    benefits: ['Copy que vende', 'Design profissional', 'Conversão otimizada'],
    icon: DollarSign,
    serviceType: 'Landing Page',
  },
  {
    title: 'Funil de Vendas Completo',
    description: 'Estruturação completa de funis: páginas de captura, emails automatizados, upsells e downsells. Tudo integrado e funcionando.',
    benefits: ['Automação completa', 'Integração total', 'Otimização contínua'],
    icon: TrendingUp,
    serviceType: 'Funil de Vendas',
  },
  {
    title: 'Gestão de Tráfego Qualificado',
    description: 'Google Ads, Facebook Ads e estratégias orgânicas. Tráfego que converte com ROI positivo desde o primeiro mês. Gestão mensal incluída.',
    benefits: ['ROI positivo', 'Leads qualificados', 'Estratégias comprovadas'],
    icon: Bot,
    serviceType: 'Tráfego Pago',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white" data-section-type="white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[26px] font-bold mb-3 sm:mb-4 px-2 text-gray-900">
            Nossos <span className="text-primary">Serviços Especializados</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Serviços pontuais ou pacote completo.<br />Escolha o que precisa ou peça tudo.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <span className="text-xs sm:text-sm text-primary/70 font-semibold bg-primary/10 px-2 sm:px-3 py-1 rounded-lg border border-primary/20">
                    {service.serviceType}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 flex-grow transition-colors duration-300">
                  {service.description}
                </p>
                <div className="space-y-1.5 sm:space-y-2 pt-3 sm:pt-4 border-t border-gray-200">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 transition-colors">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" strokeWidth={2.5} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

