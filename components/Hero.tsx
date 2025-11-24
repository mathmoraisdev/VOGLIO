'use client'

import React, { useEffect, useRef } from 'react'
import Button from './ui/Button'
import { Check } from 'lucide-react'
import ProjectSlider from './ProjectSlider'

// Cores adaptadas para Voglio (azul primary)
const colors = {
  50: '#f8f9ff',
  100: '#e8ebff',
  200: '#d1d7ff',
  300: '#a3afff',
  400: '#7587ff',
  500: '#365eff', // Primary Voglio
  600: '#2b4bcc',
  700: '#203899',
  800: '#162666',
  900: '#0b1333',
}

export default function Hero() {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>('.word')
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0', 10)
      setTimeout(() => {
        word.style.animation = 'word-appear 0.8s ease-out forwards'
      }, delay)
    })

    // Mouse gradient
    const gradient = gradientRef.current
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + 'px'
        gradient.style.top = e.clientY - 192 + 'px'
        gradient.style.opacity = '1'
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = '0'
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    // Word hover effects
    words.forEach((word) => {
      word.addEventListener('mouseenter', () => {
        word.style.textShadow = '0 0 20px rgba(54, 94, 255, 0.5)'
      })
      word.addEventListener('mouseleave', () => {
        word.style.textShadow = 'none'
      })
    })

    // Click ripple effect
    function onClick(e: MouseEvent) {
      const ripple = document.createElement('div')
      ripple.style.position = 'fixed'
      ripple.style.left = e.clientX + 'px'
      ripple.style.top = e.clientY + 'px'
      ripple.style.width = '4px'
      ripple.style.height = '4px'
      ripple.style.background = 'rgba(54, 94, 255, 0.6)'
      ripple.style.borderRadius = '50%'
      ripple.style.transform = 'translate(-50%, -50%)'
      ripple.style.pointerEvents = 'none'
      ripple.style.animation = 'pulse-glow 1s ease-out forwards'
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 1000)
    }
    document.addEventListener('click', onClick)

    // Floating elements on scroll
    let scrolled = false
    function onScroll() {
      if (!scrolled) {
        scrolled = true
        document.querySelectorAll<HTMLElement>('.floating-element').forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = 'running'
          }, index * 200)
        })
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1333] via-black to-[#162666] text-[#e8ebff] font-primary overflow-hidden relative w-full">
      {/* SVG Grid Background */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(54, 94, 255, 0.08)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          className="grid-line"
          style={{ animationDelay: '2.5s', opacity: 0.05 }}
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className="grid-line"
          style={{ animationDelay: '3s', opacity: 0.05 }}
        />
        <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3s' }} />
        <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3.2s' }} />
        <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.4s' }} />
        <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.6s' }} />
        <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: '4s' }} />
      </svg>

      {/* Corner elements */}
      <div className="corner-element top-8 left-8" style={{ animationDelay: '4s' }}>
        <div
          className="absolute top-0 left-0 w-2 h-2 opacity-30"
          style={{ background: colors[300] }}
        ></div>
      </div>
      <div className="corner-element top-8 right-8" style={{ animationDelay: '4.2s' }}>
        <div
          className="absolute top-0 right-0 w-2 h-2 opacity-30"
          style={{ background: colors[300] }}
        ></div>
      </div>
      <div className="corner-element bottom-8 left-8" style={{ animationDelay: '4.4s' }}>
        <div
          className="absolute bottom-0 left-0 w-2 h-2 opacity-30"
          style={{ background: colors[300] }}
        ></div>
      </div>
      <div className="corner-element bottom-8 right-8" style={{ animationDelay: '4.6s' }}>
        <div
          className="absolute bottom-0 right-0 w-2 h-2 opacity-30"
          style={{ background: colors[300] }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="floating-element" style={{ top: '25%', left: '15%', animationDelay: '5s' }}></div>
      <div className="floating-element" style={{ top: '60%', left: '85%', animationDelay: '5.5s' }}></div>
      <div className="floating-element" style={{ top: '40%', left: '10%', animationDelay: '6s' }}></div>
      <div className="floating-element" style={{ top: '75%', left: '90%', animationDelay: '6.5s' }}></div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Main headline */}
        <div className="text-center max-w-5xl mx-auto flex flex-col justify-center my-8 pt-[50px] md:pt-0">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 md:mb-8"
            style={{ color: colors[50] }}
          >
            <div className="mb-1 md:mb-2">
              <span className="word" data-delay="1600" style={{ opacity: 0 }}>
                A
              </span>{' '}
              <span className="word" data-delay="1750" style={{ opacity: 0 }}>
                Única
              </span>{' '}
              <span className="word" data-delay="1900" style={{ opacity: 0 }}>
                Agência
              </span>{' '}
              <span className="word" data-delay="2050" style={{ opacity: 0 }}>
                Que
              </span>{' '}
              <span className="word" data-delay="2200" style={{ opacity: 0, color: colors[500] }}>
                Cria
              </span>{' '}
              <span className="word" data-delay="2350" style={{ opacity: 0, color: colors[500] }}>
                E
              </span>{' '}
              <span className="word" data-delay="2500" style={{ opacity: 0, color: colors[500] }}>
                Divulga
              </span>
            </div>
            <div className="font-bold leading-tight">
              <span className="word" data-delay="2600" style={{ opacity: 0, color: colors[50] }}>
                Seu
              </span>{' '}
              <span className="word" data-delay="2750" style={{ opacity: 0, color: colors[50] }}>
                Negócio
              </span>{' '}
              <span className="word" data-delay="2900" style={{ opacity: 0, color: colors[50] }}>
                Digital.
              </span>
            </div>
            <div className="font-bold leading-tight mt-1">
              <span className="word" data-delay="3050" style={{ opacity: 0, color: colors[500] }}>
                Tudo
              </span>{' '}
              <span className="word" data-delay="3200" style={{ opacity: 0, color: colors[500] }}>
                Junto.
              </span>
            </div>
          </h1>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed"
            style={{
              animation: 'word-appear 1s ease-out forwards',
              animationDelay: '3500ms',
              opacity: 0,
            }}
          >
            Chega de contratar <span className="text-white font-semibold">um pra criar, outro pra divulgar</span> e{' '}
            <span className="text-white font-semibold">nada vender</span>. Aqui é{' '}
            <span className="text-white font-semibold">tudo pela mesma equipe</span> por isso{' '}
            <span className="text-white font-semibold">funciona de verdade</span>.
          </p>

          {/* CTA Button + Micro-copy */}
          <div
            className="flex flex-col items-center gap-4 mb-8"
            style={{
              animation: 'word-appear 1s ease-out forwards',
              animationDelay: '4000ms',
              opacity: 0,
            }}
          >
            <Button
              size="lg"
              onClick={() => {
                window.location.href = '/quiz'
              }}
              className="w-full sm:w-auto min-w-[280px] text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
            >
              Ver Como Podemos Ajudar
            </Button>

            {/* Micro-copy abaixo do botão */}
            <div className="space-y-2 text-xs sm:text-sm text-gray-400 max-w-md">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                <span>Consultoria de 45min com especialista</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                <span>Proposta comercial detalhada</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                <span>Orçamento real sem surpresas</span>
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <div
            className="mb-4 w-16 h-px opacity-30 mx-auto"
            style={{
              background: `linear-gradient(to right, transparent, ${colors[300]}, transparent)`,
            }}
          ></div>
          <h2
            className="text-[15px] md:text-[17px] font-mono font-light uppercase tracking-[0.2em] opacity-80"
            style={{ color: colors[200] }}
          >
            <span className="word" data-delay="4400" style={{ opacity: 0 }}>
              Desenvolvimento
            </span>{' '}
            <span className="word" data-delay="4550" style={{ opacity: 0 }}>
              •
            </span>{' '}
            <span className="word" data-delay="4700" style={{ opacity: 0 }}>
              Tráfego
            </span>{' '}
            <span className="word" data-delay="4850" style={{ opacity: 0 }}>
              •
            </span>{' '}
            <span className="word" data-delay="5000" style={{ opacity: 0 }}>
              Conversão
            </span>
          </h2>
          <p
            className="text-[15px] md:text-[17px] text-gray-500 mt-2"
            style={{
              animation: 'word-appear 1s ease-out forwards',
              animationDelay: '5150ms',
              opacity: 0,
            }}
          >
            Separados, nada funciona. Juntos, tudo muda.
          </p>
        </div>

        {/* ProjectSlider com animação */}
        <div
          className="w-full mt-4 md:mt-6"
          style={{
            animation: 'word-appear 1s ease-out forwards',
            animationDelay: '5500ms',
            opacity: 0,
          }}
        >
          <ProjectSlider />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block z-20"
        style={{
          animation: 'word-appear 1s ease-out forwards',
          animationDelay: '6000ms',
          opacity: 0,
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            style={{
              animation: 'float 1.5s ease-in-out infinite',
            }}
          ></div>
        </div>
      </div>

      {/* Mouse gradient effect */}
      <div
        id="mouse-gradient"
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background: `radial-gradient(circle, ${colors[500]}0D 0%, transparent 100%)`,
        }}
      ></div>
    </div>
  )
}
