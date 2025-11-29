'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from './ui/Button'
import { Check, Lightbulb } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: 'A partir de',
    amount: 'R$ 15.000',
    description: 'Ideal para começar com serviços pontuais',
    services: ['Landing Page', 'Funil Básico'],
    roi: 'ROI esperado: 3-5x em 6 meses',
    features: [
      'Landing page de alta conversão',
      'Funil básico de vendas',
      'Integração com WhatsApp',
      'Design responsivo',
      'Copy otimizado',
      'Suporte por 30 dias',
      'Entrega em 30 dias',
    ],
    popular: false,
  },
  {
    name: 'Business',
    price: 'A partir de',
    amount: 'R$ 45.000',
    description: 'Solução completa: sistema + funil + tráfego',
    services: ['Sistema Web', 'Landing Pages', 'Funil Completo', 'Tráfego'],
    roi: 'ROI esperado: 5-10x em 90 dias',
    features: [
      'Sistema web completo',
      'Funil de vendas avançado',
      'Landing pages otimizadas',
      'Gestão de tráfego (3 meses)',
      'Automações e IA',
      'Dashboard de resultados',
      'Suporte prioritário',
      'Entrega em 60 dias',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    amount: 'Personalizado',
    description: 'Para grandes negócios que precisam de tudo',
    services: ['Sistema Customizado', 'Múltiplas Landing Pages', 'Funil Avançado', 'Tráfego Ilimitado'],
    roi: 'ROI personalizado conforme objetivos',
    features: [
      'Solução totalmente customizada',
      'Equipe dedicada',
      'Tráfego ilimitado',
      'Integrações avançadas',
      'Suporte 24/7',
      'Consultoria estratégica',
      'Escalabilidade garantida',
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[40px] font-bold mb-3 sm:mb-4 px-2">
            Planos Que <span className="text-primary">Crescem</span> Com Você
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2">
            Escolha serviços pontuais ou solução completa. Todos incluem consultoria gratuita.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 border rounded-2xl p-5 sm:p-6 md:p-8 ${
                pkg.popular
                  ? 'border-primary/50 shadow-lg shadow-primary/20 md:scale-105'
                  : 'border-gray-800/50'
              } hover:border-primary/30 hover:shadow-lg transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  MAIS POPULAR
                </div>
              )}

              <div className="mb-5 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3">{pkg.description}</p>
                {pkg.services && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                    {pkg.services.map((service, idx) => (
                      <span key={idx} className="text-[10px] sm:text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">
                        {service}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-gray-500">{pkg.price}</span>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[32px] font-bold text-primary mb-2">
                  {pkg.amount}
                </div>
                {pkg.roi && (
                  <div className="text-xs sm:text-sm text-green-400 font-semibold bg-green-500/10 border border-green-500/20 px-2 sm:px-3 py-1 rounded-lg inline-block">
                    {pkg.roi}
                  </div>
                )}
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm md:text-base text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? 'primary' : 'outline'}
                size="lg"
                className="w-full text-sm sm:text-base py-3 sm:py-4 min-h-[44px]"
                onClick={() => {
                  document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Escolher {pkg.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
              <p className="text-sm sm:text-base text-gray-300">
                <span className="text-white font-semibold">Não sabe qual escolher?</span> Agende uma consultoria gratuita e receba uma recomendação personalizada
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

