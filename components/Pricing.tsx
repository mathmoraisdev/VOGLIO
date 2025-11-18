'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Button from './ui/Button'

const packages = [
  {
    name: 'Starter',
    price: 'A partir de',
    amount: 'R$ 15.000',
    description: 'Ideal para começar',
    features: [
      'Landing page de alta conversão',
      'Funil básico de vendas',
      'Integração com WhatsApp',
      'Design responsivo',
      'Suporte por 30 dias',
      'Entrega em 30 dias',
    ],
    popular: false,
  },
  {
    name: 'Business',
    price: 'A partir de',
    amount: 'R$ 45.000',
    description: 'Solução completa',
    features: [
      'Sistema web completo',
      'Funil de vendas avançado',
      'Tráfego qualificado (3 meses)',
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
    description: 'Para grandes negócios',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Planos Que <span className="text-primary">Crescem</span> Com Você
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Escolha o plano ideal para seu negócio. Todos incluem consultoria gratuita.
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
              className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 border rounded-2xl p-6 md:p-8 ${
                pkg.popular
                  ? 'border-primary/50 shadow-lg shadow-primary/20 scale-105 md:scale-110'
                  : 'border-gray-800/50'
              } hover:border-primary/30 transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  MAIS POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">{pkg.price}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {pkg.amount}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                    <span className="text-sm md:text-base text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
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
            <p className="text-sm sm:text-base text-gray-300">
              💡 <span className="text-white font-semibold">Não sabe qual escolher?</span> Agende uma consultoria gratuita e receba uma recomendação personalizada
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

