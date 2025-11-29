'use client'

import { FileText, Zap, Megaphone, Sparkles } from 'lucide-react'
import { useScrollAnimation, getStaggerDelay } from '@/hooks/useScrollAnimation'

const teamMembers = [
  {
    name: 'Processos definidos',
    role: 'Consultores estratégicos que estruturam roadmaps validados e processos eficientes para acelerar a execução e garantir resultados do seu projeto.',
    experience: '5+ anos',
    expertise: 'React, Node.js, Python',
    icon: FileText,
  },
  {
    name: 'Desenvolvimento Robusto e Veloz',
    role: 'Contamos com desenvolvedores e arquitetos que criam soluções de qualidade e alto desempenho para seu negócio.',
    experience: '8+ anos',
    expertise: 'Performance, Tráfego, Copywriting',
    icon: Zap,
  },
  {
    name: 'Tráfego Pago que Vende',
    role: 'Equipe de especialistas em mídia paga que estruturam um processo eficiente de escala para seu negócio.',
    experience: '6+ anos',
    expertise: 'Design Systems, Conversão',
    icon: Megaphone,
  },
  {
    name: 'Branding que Conecta',
    role: 'Designers experientes e editores profissionais que geram resultados para seu negócio.',
    experience: '10+ anos',
    expertise: 'Funis, Automações, CRM',
    icon: Sparkles,
  },
]

export default function Team() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/30 to-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4 scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
          >
            O Que Nos <span className="text-primary">Diferencia</span>
          </h2>
          <p 
            className={`text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            Metodologia validada, execução rápida<br />e resultados mensuráveis
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group scroll-animate-card ${isVisible ? 'is-visible' : ''}`}
              style={{ animationDelay: `${0.5 + index * 1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <member.icon className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
