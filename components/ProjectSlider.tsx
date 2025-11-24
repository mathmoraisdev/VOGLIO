'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Project {
  title: string
  subtitle: string
  description: string
  info: string
}

const projects: Project[] = [
  {
    title: 'Dashboard e Automação',
    subtitle: 'Cliente contratou Plano Enterprise',
    description: 'Sistema completo de gestão com automações inteligentes',
    info: 'Período Total de Criação 16 dias'
  },
  {
    title: 'Reestilização do Funil de Vendas',
    subtitle: 'Otimização completa de conversão',
    description: 'Redesign completo do funil com aumento de 340% na conversão',
    info: 'Período Total de Criação 12 dias'
  },
  {
    title: 'Gestão de Google Ads',
    subtitle: 'Cliente contratou Plano Business',
    description: 'Estratégia completa de tráfego pago com ROI positivo desde o primeiro mês',
    info: 'Período Total de Criação 8 dias'
  },
  {
    title: 'APP para entrega de curso e comunidade',
    subtitle: 'Plataforma completa de educação',
    description: 'Aplicativo mobile e web para entrega de cursos e gestão de comunidade',
    info: 'Período Total de Criação 45 dias'
  },
  {
    title: 'Landing Page de Alta Conversão',
    subtitle: 'Cliente contratou Plano Starter',
    description: 'Landing page otimizada com copy persuasivo e design profissional',
    info: 'Período Total de Criação 7 dias'
  },
  {
    title: 'Sistema de E-commerce Completo',
    subtitle: 'Cliente contratou Plano Enterprise',
    description: 'Loja virtual completa com gestão de estoque e integrações',
    info: 'Período Total de Criação 28 dias'
  },
  {
    title: 'Automação de Marketing Digital',
    subtitle: 'Cliente contratou Plano Business',
    description: 'Sistema de automação com IA para qualificação de leads',
    info: 'Período Total de Criação 20 dias'
  },
  {
    title: 'Plataforma SaaS de Gestão',
    subtitle: 'Cliente contratou Plano Enterprise',
    description: 'SaaS completo com dashboard, assinaturas e área de membros',
    info: 'Período Total de Criação 60 dias'
  }
]

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-play contínuo com velocidade lenta
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }, 7000)
    } else {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  const handleMouseDown = () => {
    setIsPaused(true)
  }

  const handleMouseUp = () => {
    setIsPaused(false)
  }

  const handleTouchStart = () => {
    setIsPaused(true)
  }

  const handleTouchEnd = () => {
    setIsPaused(false)
  }

  const getCardTransform = (index: number) => {
    const offset = index - currentIndex
    const absOffset = Math.abs(offset)
    
    if (offset === 0) {
      return {
        x: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        blur: 0,
        zIndex: 10,
      }
    }
    
    const isLeft = offset < 0
    const rotationY = isLeft ? 30 : -30
    const scale = Math.max(0.7, 1 - absOffset * 0.15)
    const opacity = Math.max(0.3, 1 - absOffset * 0.3)
    const blur = Math.min(8, absOffset * 2)
    // Mostrar metade do card anterior e seguinte
    const translateX = offset * (isMobile ? 130 : 140)
    
    return {
      x: translateX,
      rotateY: rotationY,
      scale,
      opacity,
      blur,
      zIndex: 10 - absOffset,
    }
  }

  return (
    <div className="relative w-full mt-0 z-[5] px-2 sm:px-4">
      <div
        className="relative w-full h-[200px] sm:h-[220px] md:h-[240px]"
        style={{ perspective: '1500px', perspectiveOrigin: 'center center', overflow: 'visible' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center" style={{ overflow: 'visible' }}>
          {projects.map((project, index) => {
            const transform = getCardTransform(index)
            const isActive = index === currentIndex
            
            return (
              <motion.div
                key={`project-${index}`}
                className="absolute sm:w-[280px] sm:h-[220px] sm:ml-[-140px]"
                style={{
                  width: '260px',
                  height: '200px',
                  left: '50%',
                  marginLeft: '-130px',
                  transformStyle: 'preserve-3d',
                  zIndex: transform.zIndex + 100,
                }}
                animate={{
                  x: transform.x,
                  rotateY: `${transform.rotateY}deg`,
                  scale: transform.scale,
                  opacity: transform.opacity,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div 
                  className="relative w-full h-full bg-gradient-to-br from-gray-900/95 to-gray-800/70 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl"
                  style={{
                    filter: `blur(${transform.blur}px)`,
                    transition: 'filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive ? '0 20px 60px rgba(54, 94, 255, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`star-${index}-${i}`}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-primary text-primary"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white mb-1 sm:mb-1.5 pr-12 sm:pr-16 mt-[12px] sm:mt-[15px] leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-300 mb-1 sm:mb-1.5 leading-tight">
                        {project.subtitle}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-800/50">
                      <p className="text-[10px] sm:text-[11px] text-gray-500">
                        {project.info}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50 pointer-events-none"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
