'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Code, TrendingUp, Palette, Briefcase } from 'lucide-react'

const teamMembers = [
  {
    name: 'Equipe Voglio',
    role: 'Desenvolvedores Full-Stack',
    experience: '5+ anos',
    expertise: 'React, Node.js, Python',
    icon: Code,
  },
  {
    name: 'Equipe Voglio',
    role: 'Especialistas em Marketing',
    experience: '8+ anos',
    expertise: 'Performance, Tráfego, Copywriting',
    icon: TrendingUp,
  },
  {
    name: 'Equipe Voglio',
    role: 'Designers UX/UI',
    experience: '6+ anos',
    expertise: 'Design Systems, Conversão',
    icon: Palette,
  },
  {
    name: 'Equipe Voglio',
    role: 'Especialistas em Vendas',
    experience: '10+ anos',
    expertise: 'Funis, Automações, CRM',
    icon: Briefcase,
  },
]

export default function Team() {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Os <span className="text-primary">Experts</span> Por<br />Trás dos Resultados
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Uma equipe multidisciplinar com anos de experiência em desenvolvimento,<br />marketing e vendas
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <member.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>{member.experience} de experiência</p>
                <p className="text-gray-500">{member.expertise}</p>
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
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <p className="text-base sm:text-lg text-gray-300">
              <span className="text-white font-semibold">+30 profissionais</span> trabalhando em cada projeto
            </p>
            <p className="text-sm text-gray-500 mt-2">Devs, designers, marketeiros e especialistas em vendas</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

