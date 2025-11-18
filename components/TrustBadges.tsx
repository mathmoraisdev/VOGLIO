'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const badges = [
  {
    icon: '🔒',
    title: 'Pagamento Seguro',
    description: 'Transações protegidas e criptografadas',
  },
  {
    icon: '🛡️',
    title: 'Dados Protegidos',
    description: 'LGPD compliant e segurança máxima',
  },
  {
    icon: '✅',
    title: 'Satisfação Garantida',
    description: '95% dos clientes recomendam',
  },
  {
    icon: '💬',
    title: 'Suporte 24/7',
    description: 'Equipe disponível quando precisar',
  },
  {
    icon: '⚡',
    title: 'Entrega Rápida',
    description: 'Projetos entregues no prazo',
  },
  {
    icon: '🎯',
    title: 'Foco em Resultados',
    description: 'ROI comprovado em cada projeto',
  },
]

export default function TrustBadges() {
  return (
    <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/30 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-xl p-4 md:p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl mb-3">{badge.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

