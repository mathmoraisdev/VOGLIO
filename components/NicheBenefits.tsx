'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Briefcase, ShoppingBag, GraduationCap, Handshake, Check } from 'lucide-react'

const niches = [
  {
    name: 'SaaS',
    icon: Briefcase,
    description: 'Sistemas que escalam e geram receita recorrente',
    benefits: [
      'Onboarding automatizado',
      'Dashboard de métricas',
      'Integrações via API',
      'Modelo de assinatura',
    ],
  },
  {
    name: 'E-commerce',
    icon: ShoppingBag,
    description: 'Lojas online que convertem visitantes em clientes',
    benefits: [
      'Checkout otimizado',
      'Gestão de estoque',
      'Integração com pagamentos',
      'Automação de entregas',
    ],
  },
  {
    name: 'Infoprodutos',
    icon: GraduationCap,
    description: 'Funis de vendas que transformam conhecimento em receita',
    benefits: [
      'Landing pages de alta conversão',
      'Upsell e downsell automatizados',
      'Email marketing integrado',
      'Área de membros',
    ],
  },
  {
    name: 'Serviços B2B',
    icon: Handshake,
    description: 'Sistemas que qualificam leads e fecham mais vendas',
    benefits: [
      'CRM integrado',
      'Automação de follow-up',
      'Propostas automatizadas',
      'Gestão de contratos',
    ],
  },
]

export default function NicheBenefits() {
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
          <h2 className="text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4">
            Soluções Para Cada<br /><span className="text-primary">Tipo de Negócio</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Encontre a solução ideal para o seu nicho. Cada negócio tem necessidades únicas.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {niches.map((niche, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <niche.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold mb-2 group-hover:text-primary transition-colors">
                    {niche.name}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">{niche.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {niche.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-gray-300 text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
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
          <p className="text-gray-400 mb-4">Não encontrou seu nicho?</p>
          <button
            onClick={() => {
              document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-primary hover:text-primary-300 font-semibold underline transition-colors"
          >
            Fale conosco e descubra<br />sua solução personalizada →
          </button>
        </motion.div>
      </div>
    </section>
  )
}

