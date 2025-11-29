'use client'

import { Rocket, GraduationCap, ShoppingBag } from 'lucide-react'
import { useScrollAnimation, getStaggerDelay } from '@/hooks/useScrollAnimation'

const cases = [
  {
    client: 'A LA GARÇONNE',
    industry: 'E-Commerce',
    challenge: 'O cliente contratou',
    result: 'Consultoria, Desenvolvimento e Tráfego Pago',
    metric: '6,3x',
    metricLabel: 'ROI',
    time: '45 dias',
    icon: Rocket,
    backgroundImage: '/clientes/alagarc.png',
  },
  {
    client: 'N1 Global',
    industry: 'SaaS',
    challenge: 'O cliente contratou',
    result: 'Site, Plataforma de Afiliados e Tráfego Pago',
    metric: 'R$120 mil',
    metricLabel: 'Assinaturas Recorrentes',
    time: '30 dias',
    icon: GraduationCap,
    backgroundImage: '/clientes/n1.png',
  },
  {
    client: 'SR Imobiliária',
    industry: 'Negócio Local',
    challenge: 'O cliente contratou',
    result: 'Consultoria, Tráfego Pago e CRM',
    metric: 'R$3 milhões',
    metricLabel: 'Aumento de Vendas',
    time: '30 dias',
    icon: ShoppingBag,
    backgroundImage: '/clientes/sr.png',
  },
  {
    client: '1º Oficio de Imóveis',
    industry: 'Negócio Local',
    challenge: 'O cliente contratou',
    result: 'Automação de Atendimento',
    metric: 'R$54 mil',
    metricLabel: 'Economia Operacional',
    time: '15 dias',
    icon: ShoppingBag,
    backgroundImage: '/clientes/cartorio.png',
  },
  {
    client: 'Líder Hotel',
    industry: 'Negócio Local',
    challenge: 'O cliente contratou',
    result: 'Tráfego Pago, Sistema Administrativo,\nAutomação de Processos',
    metric: '3X',
    metricLabel: 'Eficácia Operacional',
    time: '45 dias',
    icon: ShoppingBag,
    backgroundImage: '/clientes/lider.png',
  },
]

export default function CaseStudies() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black"
    >
      <div className="w-full">
        <div className="text-center mb-12 md:mb-16 max-w-7xl mx-auto">
          <h2 
            className={`text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4 scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
          >
            Cases de <span className="text-primary">Sucesso</span>
          </h2>
          <p 
            className={`text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            Veja como transformamos ideias em negócios lucrativos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden flex flex-col min-h-[400px] md:min-h-[450px] lg:h-[500px] scroll-animate-card ${isVisible ? 'is-visible' : ''}`}
              style={{
                ...(caseItem.backgroundImage ? {
                  backgroundImage: `url(${caseItem.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: index === 0 ? 'center' : 'left center',
                } : {}),
                animationDelay: getStaggerDelay(index, 0.4, 0.2),
              }}
            >
              {/* Overlay com gradiente */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: caseItem.backgroundImage 
                    ? 'linear-gradient(to bottom, transparent 0%, transparent 10%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 1) 100%)'
                    : 'linear-gradient(to bottom, transparent 0%, transparent 10%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.8) 100%)',
                  zIndex: 1,
                }}
              />
              <div className="relative z-10 flex-1 flex flex-col p-4 md:p-6">
                {/* Espaço superior para posicionar títulos no desktop */}
                <div className="hidden lg:block lg:h-[180px]">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors text-white">
                        {caseItem.client}
                      </h3>
                      <p className="text-xs text-gray-300">{caseItem.industry}</p>
                    </div>
                    {/* Conteúdo visível apenas no desktop */}
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs text-gray-300 mb-1">{caseItem.challenge}</p>
                      <p className="text-sm font-semibold text-white whitespace-pre-line">{caseItem.result}</p>
                    </div>
                  </div>
                </div>

                {/* Espaço flexível - empurra conteúdo para baixo no mobile */}
                <div className="flex-1 lg:min-h-0"></div>

                {/* Título e conteúdo - na parte inferior no mobile */}
                <div className="lg:hidden space-y-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors text-white">
                      {caseItem.client}
                    </h3>
                    <p className="text-xs text-gray-300">{caseItem.industry}</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-gray-300 mb-1">{caseItem.challenge}</p>
                    <p className="text-sm font-semibold text-white whitespace-pre-line">{caseItem.result}</p>
                  </div>
                </div>

                {/* Métricas no final */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-[18px] md:text-[22px] font-bold text-green-400">
                      {caseItem.metric}
                    </div>
                    <div className="text-xs text-gray-300">
                      {caseItem.metricLabel === 'Assinaturas Recorrentes' ? (
                        <>
                          <span className="lg:hidden">Assinaturas Recorrentes</span>
                          <span className="hidden lg:inline">Assinaturas</span>
                        </>
                      ) : (
                        caseItem.metricLabel
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary">{caseItem.time}</div>
                    <div className="text-xs text-gray-300">Entrega Inicial</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
