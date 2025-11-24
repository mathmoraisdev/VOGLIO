'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isOnWhiteSection, setIsOnWhiteSection] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Animate logo and button on page load
    const logo = logoRef.current
    const button = buttonRef.current
    
    if (logo) {
      setTimeout(() => {
        logo.style.animation = 'word-appear 0.8s ease-out forwards'
      }, 0)
    }
    
    if (button) {
      setTimeout(() => {
        button.style.animation = 'word-appear 0.8s ease-out forwards'
      }, 200)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Verificar se o header está sobre uma seção branca
      const whiteSections = document.querySelectorAll('[data-section-type="white"]')
      
      let isOverWhite = false
      const headerHeight = headerRef.current?.offsetHeight || 80
      
      whiteSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // rect.top é relativo à viewport, então valores negativos significam que a seção está acima da viewport
        // Verificamos se o header (que está fixo no topo) está sobrepondo a seção branca
        // O header está sobre a seção se a seção começa antes ou dentro da altura do header
        if (rect.top <= headerHeight && rect.bottom > 0) {
          isOverWhite = true
        }
      })
      
      setIsOnWhiteSection(isOverWhite)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Verificar estado inicial
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerBgClass = isOnWhiteSection
    ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
    : scrolled
    ? 'bg-black/80 backdrop-blur-md border-b border-gray-800/50'
    : 'bg-transparent'

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <motion.div
            ref={logoRef}
            whileHover={{ scale: 1.05 }}
            className="relative h-8 sm:h-10 w-auto flex items-center word"
            style={{ opacity: 0 }}
          >
            {isOnWhiteSection ? (
              <>
                <img
                  src="/logo black.png"
                  alt="Voglio"
                  className="h-full w-auto object-contain transition-opacity duration-300"
                  style={{ maxWidth: '120px', display: logoError ? 'none' : 'block' }}
                  onError={() => setLogoError(true)}
                  onLoad={() => setLogoError(false)}
                />
                {logoError && (
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    VOGLIO
                  </span>
                )}
              </>
            ) : (
              <>
                <img
                  src="/logo.png"
                  alt="Voglio"
                  className="h-full w-auto object-contain transition-opacity duration-300"
                  style={{ maxWidth: '120px', display: logoError ? 'none' : 'block' }}
                  onError={() => setLogoError(true)}
                  onLoad={() => setLogoError(false)}
                />
                {logoError && (
                  <span className="text-2xl sm:text-3xl font-bold text-primary">
                    VOGLIO
                  </span>
                )}
              </>
            )}
          </motion.div>
          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 word ${
              isOnWhiteSection ? 'text-white' : 'text-white'
            }`}
            style={{ backgroundColor: '#365eff', opacity: 0 }}
          >
            Falar Agora
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}

