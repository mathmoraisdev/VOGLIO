'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Image from 'next/image'
import { Check } from 'lucide-react'

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Código <span className="text-primary">Real</span>, Soluções Personalizadas
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12">
            Não usamos templates. Desenvolvemos código do zero, 100% personalizado para seu negócio. O código é seu, você tem propriedade total e pode escalar sem limites.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-row gap-4 md:gap-12 items-start md:items-center"
        >
          {/* Imagem na esquerda */}
          <div className="relative w-1/2 md:w-1/2 h-[200px] sm:h-[250px] md:h-[400px] rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src="/code.webp"
              alt="Código e tecnologias"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 50vw"
            />
          </div>

          {/* Lista de stacks na direita */}
          <div className="w-1/2 md:w-1/2 flex-shrink-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
              Tecnologias e <span className="text-primary">Metodologias</span>
            </h3>
            <div className="space-y-3">
              {stacks.map((stack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2.5"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-gray-300 text-sm sm:text-base">{stack.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

