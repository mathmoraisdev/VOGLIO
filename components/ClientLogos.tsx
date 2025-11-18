'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Rocket, GraduationCap, Activity, Cloud, BarChart3, Lock, TrendingUp, Palette } from 'lucide-react'

const clients = [
  { name: 'TechFlow', icon: Rocket },
  { name: 'EduMaster', icon: GraduationCap },
  { name: 'FitApp', icon: Activity },
  { name: 'CloudSync', icon: Cloud },
  { name: 'DataViz', icon: BarChart3 },
  { name: 'SecurePay', icon: Lock },
  { name: 'MarketPro', icon: TrendingUp },
  { name: 'DesignLab', icon: Palette },
]

export default function ClientLogos() {
  return (
    <section id="client-logos" className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white" data-section-type="white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-2">Empresas que confiam na Voglio</p>
          <h2 className="text-[20px] font-bold text-gray-900">
            Mais de <span className="text-primary">100 empresas</span><br />já transformaram seus negócios
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 rounded-xl flex items-center justify-center hover:border-primary transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md">
                <client.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-700" strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-sm text-gray-600">
            De startups a empresas consolidadas • <span className="text-gray-900 font-semibold">Todos os tamanhos</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

