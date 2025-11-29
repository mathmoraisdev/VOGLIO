'use client'

import React, { useRef, useEffect, useState } from 'react'
import { CheckCircle2, X, AlertTriangle, DollarSign, Clock, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react'

const sections = [
  {
    title: 'Você contrata um desenvolvedor',
    items: [
      { type: 'success', Icon: CheckCircle2, text: 'Sistema funcional' },
      { type: 'error', Icon: X, text: 'Não converte' },
      { type: 'error', Icon: X, text: 'Sem estrutura para tráfego' },
      { type: 'error', Icon: X, text: 'Analytics quebrado' },
    ],
  },
  {
    title: 'Aí você contrata tráfego',
    items: [
      { type: 'warning', Icon: AlertTriangle, text: 'Site não preparado' },
      { type: 'warning', Icon: AlertTriangle, text: 'Precisa refazer tudo' },
      { type: 'warning', Icon: AlertTriangle, text: 'Tracking quebrado' },
    ],
  },
  {
    title: 'Resultado:',
    items: [
      { type: 'consequence', Icon: DollarSign, text: 'Gasta 2x mais' },
      { type: 'consequence', Icon: Clock, text: 'Perde 6 meses' },
      { type: 'consequence', Icon: AlertCircle, text: 'Sem saber quem culpar' },
      { type: 'consequence', Icon: TrendingDown, text: 'Tráfego que não converte' },
    ],
  },
]

type IconType = 'success' | 'error' | 'warning' | 'consequence'

const iconStyles: Record<IconType, string> = {
  success: 'text-white drop-shadow-md',
  error: 'text-white drop-shadow-md',
  warning: 'text-gray-900 drop-shadow-sm',
  consequence: 'text-white drop-shadow-md',
}

const iconBgStyles: Record<IconType, string> = {
  success: 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 shadow-lg shadow-emerald-500/30',
  error: 'bg-gradient-to-br from-rose-400 to-rose-600 border-rose-300 shadow-lg shadow-rose-500/30',
  warning: 'bg-gradient-to-br from-amber-300 to-amber-500 border-amber-200 shadow-lg shadow-amber-500/30',
  consequence: 'bg-gradient-to-br from-orange-400 to-orange-600 border-orange-300 shadow-lg shadow-orange-500/30',
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px) scale(0.95);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px) scale(0.95);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes itemReveal {
          0% {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
            filter: blur(8px);
          }
          60% {
            opacity: 1;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes arrowPulse {
          0%, 100% {
            opacity: 0;
            transform: translateX(-10px);
            filter: blur(4px);
          }
          50% {
            opacity: 0.7;
            transform: translateX(0);
            filter: blur(0);
          }
        }
        
        .about-title {
          opacity: 0;
        }
        
        .about-title.animate {
          animation: fadeInDown 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .about-card-1 {
          opacity: 0;
        }
        
        .about-card-1.animate {
          animation: slideInLeft 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 2s;
        }
        
        .about-card-2 {
          opacity: 0;
        }
        
        .about-card-2.animate {
          animation: slideInUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 4s;
        }
        
        .about-card-3 {
          opacity: 0;
        }
        
        .about-card-3.animate {
          animation: slideInRight 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 6s;
        }
        
        .about-arrow-1 {
          opacity: 0;
        }
        
        .about-arrow-1.animate {
          animation: fadeInScale 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 3s;
        }
        
        .about-arrow-2 {
          opacity: 0;
        }
        
        .about-arrow-2.animate {
          animation: fadeInScale 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 5s;
        }
        
        .about-item {
          opacity: 0;
        }
        
        .about-item.animate {
          animation: itemReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      
      <div className="max-w-5xl mx-auto">
        {/* Título Principal */}
        <div className={`text-center mb-16 md:mb-20 about-title ${isVisible ? 'animate' : ''}`}>
          <h2 className="text-[20px] sm:text-4xl md:text-5xl lg:text-[30px] font-bold mb-4 leading-tight px-2">
            O QUE ACONTECE QUANDO VOCÊ{' '}
            <br className="hidden lg:block" />
            CONTRATA{' '}
            <span className="text-primary">EMPRESAS SEPARADAS</span>
          </h2>
        </div>

        {/* Seções Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-8 items-center">
          {sections.map((section, sectionIndex) => {
            const isResultCard = sectionIndex === sections.length - 1
            const cardClass = `about-card-${sectionIndex + 1}`
            const arrowClass = `about-arrow-${sectionIndex + 1}`
            
            // Calculate item delays based on card delay
            const cardBaseDelay = (sectionIndex + 1) * 2 // 2s, 4s, 6s
            
            return (
              <React.Fragment key={sectionIndex}>
                <div className={`flex flex-col h-full ${cardClass} ${isVisible ? 'animate' : ''}`}>
                  {/* Card da Seção */}
                  <div className={`rounded-2xl p-8 md:p-10 lg:p-6 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full ${
                    isResultCard 
                      ? 'bg-gradient-to-br from-red-950/20 to-red-900/10 border border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10' 
                      : 'bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 hover:border-primary/30 hover:shadow-primary/5'
                  }`}>
                    {/* Título da Seção */}
                    <div className={`mb-6 md:mb-8 lg:mb-4 pb-4 lg:pb-3 border-b ${
                      isResultCard ? 'border-red-500/20' : 'border-gray-800/50'
                    }`}>
                      <h3 className={`text-base md:text-xl lg:text-base font-semibold leading-tight ${
                        isResultCard ? 'text-red-200' : 'text-white'
                      }`}>
                        {section.title}
                      </h3>
                    </div>

                    {/* Lista de Itens */}
                    <div className="space-y-4 md:space-y-5 lg:space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`flex items-center gap-4 md:gap-5 lg:gap-3 group about-item ${isVisible ? 'animate' : ''}`}
                          style={{ 
                            animationDelay: isVisible ? `${cardBaseDelay + 0.5 + (itemIndex * 0.35)}s` : '0s'
                          }}
                        >
                          {/* Ícone com Background */}
                          <div className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                            isResultCard 
                              ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-300 shadow-lg shadow-red-500/40' 
                              : iconBgStyles[item.type as IconType]
                          }`}>
                            <item.Icon 
                              className={`w-4 h-4 md:w-4.5 md:h-4.5 lg:w-3.5 lg:h-3.5 ${
                                isResultCard 
                                  ? 'text-white drop-shadow-md' 
                                  : iconStyles[item.type as IconType]
                              }`} 
                              strokeWidth={2.5}
                            />
                          </div>
                          
                          {/* Texto */}
                          <div className="flex-1">
                            <p className={`text-lg md:text-xl lg:text-sm font-medium leading-relaxed transition-colors ${
                              isResultCard 
                                ? 'text-red-200 group-hover:text-red-100' 
                                : 'text-gray-300 group-hover:text-gray-200'
                            }`}>
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Separador Visual - apenas no mobile */}
                  {sectionIndex < sections.length - 1 && (
                    <div className="flex items-center justify-center py-8 md:py-10 lg:hidden">
                      <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    </div>
                  )}
                </div>

                {/* Seta entre cards - apenas no desktop */}
                {sectionIndex < sections.length - 1 && (
                  <div className={`hidden lg:flex items-center justify-center px-2 ${arrowClass} ${isVisible ? 'animate' : ''}`}>
                    <ArrowRight className="w-7 h-7 text-gray-400" strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
