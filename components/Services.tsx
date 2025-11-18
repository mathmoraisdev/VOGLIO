'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import Card from './ui/Card'

const services = [
  {
    title: 'Desenvolvimento & Tecnologia',
    description: 'Apps, sites e sistemas que escalam com seu negócio. Código limpo, performance otimizada e arquitetura pensada para crescimento.',
    benefits: ['Tecnologia de ponta', 'Escalável desde o dia 1', 'Manutenção facilitada'],
    icon: '🚀',
  },
  {
    title: 'Funil de Vendas Completo',
    description: 'Landing pages de alta conversão, copywriting persuasivo e design que vende. Transformamos visitantes em compradores.',
    benefits: ['Conversão otimizada', 'Copy que vende', 'Design profissional'],
    icon: '💰',
  },
  {
    title: 'Tráfego & Leads Qualificados',
    description: 'Estratégias que geraram R$ 50M+ em vendas. Tráfego pago, orgânico e automações que trazem clientes prontos para comprar.',
    benefits: ['Leads qualificados', 'ROI positivo', 'Estratégias comprovadas'],
    icon: '📈',
  },
  {
    title: 'Automação & Inteligência Artificial',
    description: 'Automatize processos, reduza custos e escale sem aumentar sua equipe. IA aplicada para resultados reais.',
    benefits: ['Economia de tempo', 'Redução de custos', 'Escala inteligente'],
    icon: '🤖',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Sistema Completo Para Seu Negócio{' '}
            <span className="text-primary">
              Decolar
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Tudo que você precisa em um só lugar
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card delay={index * 0.1} className="h-full flex flex-col group">
                <motion.div 
                  className="text-4xl md:text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 flex-grow group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="space-y-2 pt-4 border-t border-gray-800/50">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      <span className="text-green-500">✓</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

