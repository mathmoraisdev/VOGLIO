'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Rocket, DollarSign, TrendingUp, Heart, Code, Layout, Zap, BarChart3, Smartphone, Search, Headphones, Shield } from 'lucide-react'
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
                icon: <Code className="size-5 text-primary" />,
                title: "Código Limpo",
                description: "Desenvolvimento profissional com tecnologias modernas e melhores práticas",
                date: "Sempre atualizado",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Smartphone className="size-5 text-primary" />,
                title: "100% Responsivo",
                description: "Seu site perfeito em qualquer dispositivo: mobile, tablet e desktop",
                date: "Testado em todos",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Zap className="size-5 text-primary" />,
                title: "Performance Máxima",
                description: "Sites rápidos e otimizados que carregam em segundos e convertem mais",
                date: "Velocidade garantida",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Search className="size-5 text-primary" />,
                title: "SEO Integrado",
                description: "Otimização completa para aparecer no Google e atrair clientes",
                date: "Visibilidade total",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Headphones className="size-5 text-primary" />,
                title: "Suporte Completo",
                description: "Equipe dedicada para tirar dúvidas e ajudar no que precisar",
                date: "Sempre disponível",
                iconClassName: "text-primary",
                titleClassName: "text-gray-900",
              },
              {
                icon: <Shield className="size-5 text-primary" />,
                title: "Segurança Total",
                description: "Proteção completa dos dados com certificados SSL e backups regulares",
                date: "100% seguro",
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
                DEV + MARKETING + VENDAS<br />na mesma equipe
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
