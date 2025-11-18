'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

const trustItems = [
  { label: '+100', description: 'Projetos Entregues' },
  { label: 'R$ 50M+', description: 'Faturamento Gerado' },
  { label: '95%', description: 'Clientes Satisfeitos' },
  { label: '5 Anos', description: 'No Mercado' },
]

export default function TrustBar() {
  return (
    <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                {item.label}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                {item.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

