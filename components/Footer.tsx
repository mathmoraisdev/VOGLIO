'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { useState } from 'react'

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative border-t border-gray-800/50 py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative h-7 sm:h-9 w-auto flex items-center">
            <img
              src="/logo.png"
              alt="Voglio"
              className="h-full w-auto object-contain"
              style={{ maxWidth: '100px', display: logoError ? 'none' : 'block' }}
              onError={() => setLogoError(true)}
              onLoad={() => setLogoError(false)}
            />
            {logoError && (
              <span className="text-xl sm:text-2xl font-bold text-primary">
                VOGLIO
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base text-gray-400 text-center md:text-right">
            © {new Date().getFullYear()} Voglio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

