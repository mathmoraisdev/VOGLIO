'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Rocket, DollarSign, TrendingUp, Heart, Clock, Award, Brain, Eye, Handshake } from 'lucide-react'
import DisplayCards from '@/components/ui/display-cards'
const results = [
  { Icon: Rocket, text: 'Lança mais rápido' },
  { Icon: DollarSign, text: 'Economiza dinheiro' },
  { Icon: TrendingUp, text: 'Já sai vendendo' },
  { Icon: Heart, text: 'Zero dor de cabeça' },
]

export default function ClientLogos() {
  return (
    <section id="client-logos" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white" data-section-type="white">
      <div className="max-w-5xl mx-auto">
        {/* Título Principal */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight px-2 text-gray-900">
            COM A VOGLIO É <span className="text-primary">DIFERENTE</span>
          </h2>
        </motion.div>

        {/* Cards de Destaque */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20"
        >
          <DisplayCards
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
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12 md:space-y-16"
        >

          {/* Seção 2: Por quê */}
          <motion.div variants={fadeInUp}>
            <div className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-tight">
                DEV + MARKETING + CONVERSÃO<br />na mesma equipe
              </p>
            </div>
          </motion.div>

          {/* Seção 3: Resultados */}
          <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-8 md:p-10 lg:p-12">
              <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-10 md:mb-12">
                RESULTADO PARA VOCÊ:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {results.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-5 md:gap-6 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <item.Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold group-hover:text-gray-900 transition-colors">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
