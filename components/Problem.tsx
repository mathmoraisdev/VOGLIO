'use client'

import { X, DollarSign, Clock, TrendingDown } from 'lucide-react'
import { useScrollAnimation, getStaggerDelay } from '@/hooks/useScrollAnimation'

const problems = [
  {
    icon: X,
    text: 'Sua ideia incrível está parada porque você não sabe por onde começar',
    solution: 'Criamos o sistema completo do zero: desenvolvimento, landing pages e estruturação do funil'
  },
  {
    icon: DollarSign,
    text: 'Já gastou dinheiro com freelancers ou agências que não entregaram resultados',
    solution: 'Equipe integrada com garantia de entrega: dev + marketing + vendas trabalhando juntos'
  },
  {
    icon: Clock,
    text: 'Está perdendo tempo tentando juntar devs, designers e profissionais de marketing',
    solution: 'Tudo em um só lugar: sistemas web, landing pages, funis e tráfego integrados'
  },
  {
    icon: TrendingDown,
    text: 'Tem um produto digital, mas não consegue gerar vendas consistentes',
    solution: 'Funil estruturado + tráfego qualificado = vendas recorrentes e previsíveis'
  },
]

export default function Problem() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50"
    >
      <div className="max-w-5xl lg:max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`text-[20px] md:text-[32px] font-bold mb-3 sm:mb-4 md:mb-6 px-2 scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
          >
            Você Está Perdendo Dinheiro<br /><span className="text-red-400">Todos os Dias</span>
          </h2>
          <p 
            className={`text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2 scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            Sem um sistema digital completo<br />funcionando para você 24/7
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-4 hover:border-red-400/50 transition-all duration-300 group scroll-animate-card ${isVisible ? 'is-visible' : ''}`}
              style={{ animationDelay: `${0.5 + index * 1.2}s` }}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3">
                <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <p className="text-sm sm:text-base md:text-lg lg:text-base text-gray-300 pt-0.5 flex-1">{problem.text}</p>
              </div>
              <div className="ml-9 sm:ml-11 lg:ml-9 pl-3 sm:pl-4 border-l-2 border-primary/30">
                <p className="text-xs sm:text-sm lg:text-xs text-primary font-semibold mb-1">Nossa solução:</p>
                <p className="text-sm sm:text-base lg:text-sm text-gray-400 leading-relaxed">{problem.solution}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div 
            className={`inline-block bg-primary/10 border border-primary/30 rounded-2xl px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 scroll-animate-scale ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '5.5s' }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[20px] font-semibold leading-none mb-2 px-2 uppercase">
              E se você pudesse<br />ter <span className="text-primary">tudo isso resolvido</span><span className="text-primary">?</span>
            </p>
            <p className="text-[16px] sm:text-[18px] text-white px-2">
              Com uma equipe completa desenvolvendo seu sistema, criando suas landing pages, estruturando seu funil e gerando tráfego qualificado
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
