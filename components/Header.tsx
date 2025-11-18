'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800/50' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-8 sm:h-10 w-auto flex items-center"
          >
            <img
              src="/logo.png"
              alt="Voglio"
              className="h-full w-auto object-contain"
              style={{ maxWidth: '120px', display: logoError ? 'none' : 'block' }}
              onError={() => setLogoError(true)}
              onLoad={() => setLogoError(false)}
            />
            {logoError && (
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                VOGLIO
              </span>
            )}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-300"
            style={{ backgroundColor: '#365eff' }}
          >
            Contato
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}

