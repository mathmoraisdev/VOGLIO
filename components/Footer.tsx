'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <footer
      ref={ref}
      className="relative border-t border-gray-800/50 py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            className={`relative h-7 sm:h-9 w-auto flex items-center scroll-animate-fade-left ${isVisible ? 'is-visible' : ''}`}
          >
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
          <p 
            className={`text-sm sm:text-base text-gray-400 text-center md:text-right scroll-animate-fade-right ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            © {new Date().getFullYear()} Voglio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
