'use client'

import { Rocket, DollarSign, TrendingUp, Heart, Clock, Award, Brain, Eye, Handshake } from 'lucide-react'
import DisplayCards from '@/components/ui/display-cards'
import { useScrollAnimation, getStaggerDelay } from '@/hooks/useScrollAnimation'

const results = [
  { Icon: Rocket, text: 'Lança mais rápido' },
  { Icon: DollarSign, text: 'Economiza dinheiro' },
  { Icon: TrendingUp, text: 'Já sai vendendo' },
  { Icon: Heart, text: 'Zero dor de cabeça' },
]

export default function ClientLogos() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section 
      ref={ref}
      id="client-logos" 
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white" 
      data-section-type="white"
    >
      <div className="max-w-5xl mx-auto">
        {/* Título Principal */}
        <div className="text-center mb-16 md:mb-20">
          <h2 
            className={`text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4 leading-tight px-2 text-gray-900 scroll-animate-title ${isVisible ? 'is-visible' : ''}`}
          >
            COM A VOGLIO É <span className="text-primary">DIFERENTE</span>
          </h2>
        </div>

        {/* Cards de Destaque */}
        <div className="mb-16 md:mb-20">
          <DisplayCards
            isVisible={isVisible}
            baseDelay={0.5}
            staggerDelay={1.2}
            cards={[
              {
                icon: <Clock className="size-5 text-primary" />,
                title: "Agilidade na Entrega",
                description: "Execução Estratégica e de Alto Desempenho, trazemos processos validados que te entregam resultado rapidamente.",
                date: "",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Award className="size-5 text-primary" />,
                title: "Metodologia Validada",
                description: "Nós sabemos o que precisa ser feito. Diversos projetos validados mundo a fora nos ajudou a desenvolver o método que vai acelerar seu projeto.",
                date: "",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Brain className="size-5 text-primary" />,
                title: "Sistemas Inteligentes",
                description: "Mapeamos os processos, identifcamos necessidades e executamos de maneira integrada a Inteligência Artificial. Criamos automações avançadas para acelerar seu negócio.",
                date: "",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Eye className="size-5 text-primary" />,
                title: "Acompanhe ao Vivo",
                description: "Tenha em tempo real, os status do seu projeto e acompanhe evoluções diárias, tendo transparência total no processo de execução e acompanhamento também pós lançamento.",
                date: "",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <TrendingUp className="size-5 text-primary" />,
                title: "Pronto para a Escala",
                description: "Sabemos o que converte e como criar a melhor experiência para seu cliente, e também preparamos a sua estrutura para a escala.",
                date: "",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Handshake className="size-5 text-primary" />,
                title: "Um Parceiro pra Você",
                description: "Esse é o nosso diferencial, um parceiro que consegue integrar as necessidades do seu projeto em uma solução única e personalizada, trazendo praticidade, velocidade e um resultado mais eficiente.",
                date: "",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
            ]}
          />
        </div>

        <div className="space-y-12 md:space-y-16">
          {/* Seção 2: Por quê */}
          <div 
            className={`text-center scroll-animate-fade-up ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '7.5s' }}
          >
            <p className="text-xl md:text-2xl lg:text-[32px] font-bold text-primary leading-tight">
              DEV + MARKETING + CONVERSÃO<br />na mesma equipe
            </p>
          </div>

          {/* Seção 3: Resultados */}
          <div 
            className={`scroll-animate-scale ${isVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '8.5s' }}
          >
            <div className="glass-card-outer w-full max-w-4xl lg:max-w-2xl mx-auto">
              {/* Ponto animado */}
              <div className="glass-card-dot"></div>
              
              {/* Card principal */}
              <div className="glass-card p-8 md:p-10 lg:p-6">
                {/* Raio de luz */}
                <div className="glass-card-ray"></div>
                
                {/* Linhas de borda */}
                <div className="glass-card-line topl"></div>
                <div className="glass-card-line leftl"></div>
                <div className="glass-card-line bottoml"></div>
                <div className="glass-card-line rightl"></div>
                
                {/* Conteúdo */}
                <div className="relative z-10 flex flex-col h-full justify-center items-center">
                  <h3 className="text-xl md:text-2xl lg:text-lg font-bold text-center mb-8 md:mb-10 lg:mb-6 w-full text-gray-900">
                    RESULTADO PARA VOCÊ:
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-4 w-full">
                    {results.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 md:gap-5 lg:gap-3 group scroll-animate-item ${isVisible ? 'is-visible' : ''}`}
                        style={{ animationDelay: `${9.5 + index * 0.5}s` }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br from-primary to-blue-600 border-blue-300 shadow-lg shadow-primary/30">
                          <item.Icon className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-3.5 lg:h-3.5 text-white drop-shadow-md" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg md:text-xl lg:text-base text-gray-900 leading-relaxed font-semibold group-hover:text-primary transition-colors">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
