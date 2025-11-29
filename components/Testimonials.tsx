'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { BarChart3, User } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'CEO',
    company: 'TechFlow Solutions',
    image: '👨‍💼',
    rating: 5,
    text: 'A Voglio transformou completamente nosso negócio. Em 3 meses, saímos de uma ideia no papel para um sistema completo gerando R$ 150k/mês. A equipe é excepcional!',
    result: 'R$ 150k/mês em 90 dias',
  },
  {
    name: 'Mariana Silva',
    role: 'Founder',
    company: 'EduMaster Online',
    image: '👩‍💻',
    rating: 5,
    text: 'Já tinha tentado com outras agências e freelancers sem sucesso. A Voglio entregou tudo que prometeu: landing page profissional, funil otimizado e tráfego qualificado.',
    result: '18% de conversão',
  },
  {
    name: 'Roberto Andrade',
    role: 'Co-founder',
    company: 'FitApp',
    image: '🧑‍💼',
    rating: 5,
    text: 'O diferencial da Voglio é que eles pensam no negócio como um todo, não só na tecnologia. Isso fez toda a diferença nos nossos resultados. Recomendo de olhos fechados!',
    result: '2.5M de investimento captado',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4">
            O Que Nossos<br />Clientes{' '}
            <span className="text-primary">
              Dizem
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Depoimentos reais de quem já transformou seu negócio conosco
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Result Badge */}
              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg px-4 py-2">
                  <BarChart3 className="w-4 h-4 text-green-400" strokeWidth={2} />
                  <p className="text-sm font-semibold text-green-400">
                    {testimonial.result}
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Junte-se a mais de{' '}
            <span className="text-white font-semibold">100+ empresas</span>
            {' '}que já transformaram seus negócios
          </p>
        </motion.div>
      </div>
    </section>
  )
}

