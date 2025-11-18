'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Check, FileText, Zap, RotateCcw, Shield, Target } from 'lucide-react'

const guarantees = [
  {
    icon: Check,
    title: 'Consultoria 100% Gratuita',
    description: 'Primeira consulta sem custo e sem compromisso. Só contrata se fizer sentido para você.',
  },
  {
    icon: FileText,
    title: 'Contrato Claro e Detalhado',
    description: 'Sem letras miúdas. Tudo documentado: escopo, prazos, entregas e investimento.',
  },
  {
    icon: Zap,
    title: 'Entregas Semanais',
    description: 'Você acompanha o progresso toda semana. Total transparência do início ao fim.',
  },
  {
    icon: RotateCcw,
    title: 'Revisões Ilimitadas',
    description: 'Ajustamos até você ficar 100% satisfeito dentro do escopo acordado.',
  },
  {
    icon: Shield,
    title: 'Suporte Pós-Lançamento',
    description: '30 dias de suporte intensivo incluso. Você nunca fica desamparado.',
  },
  {
    icon: Target,
    title: 'Foco em Resultados',
    description: 'Não vendemos horas trabalhadas. Vendemos ROI, crescimento e sucesso do seu negócio.',
  },
]

export default function Guarantee() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nossa{' '}
            <span className="text-primary">
              Garantia
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Seu sucesso é nossa prioridade. Por isso, assumimos todos os riscos.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {guarantees.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-green-400" strokeWidth={2} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
              Trabalhe Com Confiança Total
            </h3>
            <p className="text-gray-400 max-w-2xl">
              Não cobramos nada pela primeira consultoria. Você só contrata se fizer sentido para o seu negócio. Simples assim.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

