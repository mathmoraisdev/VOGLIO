'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Target, Smartphone, Cloud, RefreshCw, Search, Facebook, CreditCard, ShoppingCart } from 'lucide-react'

const certifications = [
  { name: 'Google Ads Certified', icon: Target },
  { name: 'Meta Business Partner', icon: Smartphone },
  { name: 'AWS Certified', icon: Cloud },
  { name: 'HubSpot Partner', icon: RefreshCw },
]

const partners = [
  { name: 'Google', icon: Search },
  { name: 'Meta', icon: Facebook },
  { name: 'Stripe', icon: CreditCard },
  { name: 'Shopify', icon: ShoppingCart },
]

export default function Certifications() {
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
          <h2 className="text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4">
            <span className="text-primary">Reconhecidos</span> Pelo Mercado
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Certificações e parcerias que comprovam nossa expertise e compromisso com qualidade
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-center mb-8 text-gray-300">Certificações</h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-xl p-6 text-center hover:border-green-500/30 transition-all duration-300"
              >
                <cert.icon className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-white">{cert.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Partners */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-center mb-8 text-gray-300">Parceiros Estratégicos</h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300"
              >
                <partner.icon className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-white">{partner.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            Parceiros oficiais das principais plataformas do mercado
          </p>
        </motion.div>
      </div>
    </section>
  )
}

