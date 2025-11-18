'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const technologies = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Framework' },
  { name: 'TypeScript', icon: '📘', category: 'Linguagem' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Linguagem' },
  { name: 'AI/ML', icon: '🤖', category: 'Inteligência' },
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
]

export default function Technologies() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Tecnologias de <span className="text-primary">Ponta</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Utilizamos as melhores ferramentas do mercado para garantir performance, escalabilidade e resultados
          </p>
        </motion.div>

      </div>
    </section>
  )
}

