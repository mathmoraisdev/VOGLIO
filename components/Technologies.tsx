'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useScrollAnimation, getStaggerDelay } from '@/hooks/useScrollAnimation'

const stacks = [
  { name: 'Python', category: 'Linguagem' },
  { name: 'React & Next.js', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Inteligência Artificial', category: 'Tecnologia' },
  { name: 'Cloud Computing', category: 'Infraestrutura' },
  { name: 'Automação', category: 'Solução' },
  { name: 'Design Thinking', category: 'Metodologia' },
  { name: 'Mapeamento de Processos', category: 'Metodologia' },
]

export default function Technologies() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4 scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
          >
            Código <span className="text-primary">Real</span>, Soluções Personalizadas
          </h2>
          <p 
            className={`text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            Não usamos templates. Desenvolvemos código do zero, 100% personalizado para seu negócio. O código é seu, você tem propriedade total e pode escalar sem limites.
          </p>
        </div>

        <div className="flex flex-row gap-4 md:gap-12 items-start md:items-center lg:justify-center">
          {/* Imagem na esquerda */}
          <div 
            className={`relative w-1/2 md:w-1/2 lg:w-[32%] h-[200px] sm:h-[250px] md:h-[400px] lg:h-[242px] rounded-2xl overflow-hidden flex-shrink-0 scroll-animate-fade-left ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            <Image
              src="/code.webp"
              alt="Código e tecnologias"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 32vw"
            />
          </div>

          {/* Lista de stacks na direita */}
          <div className="w-1/2 md:w-1/2 lg:w-auto flex-shrink-0">
            <h3 
              className={`text-lg sm:text-xl md:text-2xl lg:text-[18px] font-semibold leading-none text-white mb-4 sm:mb-6 scroll-animate-fade-right ${isVisible ? 'is-visible' : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              Tecnologias e <span className="text-primary">Metodologias</span>
            </h3>
            <div className="space-y-3">
              {stacks.map((stack, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2.5 scroll-animate-item ${isVisible ? 'is-visible' : ''}`}
                  style={{ animationDelay: getStaggerDelay(index, 0.6, 0.1) }}
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-gray-300 text-sm sm:text-base">{stack.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
