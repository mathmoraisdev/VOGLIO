'use client'

import Button from './ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function CTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section 
      ref={ref}
      id="cta" 
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <div className="relative rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
            
            <div className="relative z-10">
              <h2 
                className={`text-[20px] md:text-[28px] font-bold mb-3 sm:mb-4 md:mb-6 px-2 leading-tight scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
              >
                Vamos Entender Sua Necessidade{' '}
                <br className="hidden lg:block" />
                e Criar a{' '}
                <span className="text-primary">
                  Solução Ideal Para Você
                </span>
              </h2>
              
              <p 
                className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-2 leading-relaxed scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
                style={{ animationDelay: '0.3s' }}
              >
                Em poucos minutos, vamos conhecer seu negócio, seus objetivos e desafios. Com essas informações, criamos uma análise personalizada com recomendações específicas para o seu caso.
              </p>

              <div 
                className={`mb-8 scroll-animate-scale ${isVisible ? 'is-visible' : ''}`}
                style={{ animationDelay: '0.6s' }}
              >
                <Button 
                  size="lg" 
                  onClick={() => {
                    window.location.href = '/quiz'
                  }}
                  className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] text-base sm:text-lg py-3 sm:py-4 md:py-5 min-h-[44px] sm:min-h-[56px] hover:scale-105 active:scale-95 transition-transform"
                >
                  Contar Sobre Meu Negócio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
