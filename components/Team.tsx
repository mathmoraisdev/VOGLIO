'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Code, TrendingUp, Palette, Briefcase } from 'lucide-react'

const teamMembers = [
  {
    name: 'Processos definidos',
    role: 'Consultores estratégicos que estruturam roadmaps validados e processos eficientes para acelerar a execução e garantir resultados do seu projeto.',
    experience: '5+ anos',
    expertise: 'React, Node.js, Python',
    icon: Code,
  },
  {
    name: 'Desenvolvimento Robusto e Veloz',
    role: 'Contamos com desenvolvedores e arquitetos que criam soluções de qualidade e alto desempenho para seu negócio.',
    experience: '8+ anos',
    expertise: 'Performance, Tráfego, Copywriting',
    icon: TrendingUp,
  },
  {
    name: 'Tráfego Pago que Vende',
    role: 'Equipe de especialistas em mídia paga que estruturam um processo eficiente de escala para seu negócio.',
    experience: '6+ anos',
    expertise: 'Design Systems, Conversão',
    icon: Palette,
  },
  {
    name: 'Branding que Converte',
    role: 'Designers experientes e editores profissionais que geram resultados para seu negócio.',
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
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <member.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

