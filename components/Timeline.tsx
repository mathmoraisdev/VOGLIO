'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { FileText, Zap, Rocket, TrendingUp, Check, Clock } from 'lucide-react'

const phases = [
  {
    phase: 'Semana 1-2',
    title: 'Planejamento & Estratégia',
    results: [
      'Briefing completo do projeto',
      'Definição de objetivos e KPIs',
      'Estruturação do funil',
      'Wireframes e protótipos',
    ],
    icon: FileText,
  },
  {
    phase: 'Semana 3-4',
    title: 'Desenvolvimento Inicial',
    results: [
      'Design finalizado',
      'Desenvolvimento em andamento',
      'Primeiras entregas visuais',
      'Ajustes e refinamentos',
    ],
    icon: Zap,
  },
  {
    phase: 'Mês 2',
    title: 'Implementação & Testes',
    results: [
      'Sistema funcional completo',
      'Testes de usabilidade',
      'Otimizações de performance',
      'Preparação para lançamento',
    ],
    icon: Rocket,
  },
  {
    phase: 'Mês 3+',
    title: 'Lançamento & Escala',
    results: [
      'Sistema no ar e funcionando',
      'Tráfego qualificado ativo',
      'Primeiros resultados mensuráveis',
      'Otimização contínua',
    ],
    icon: TrendingUp,
  },
]

export default function Timeline() {
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
          <h2 className="text-[20px] sm:text-4xl md:text-5xl lg:text-[32px] font-bold mb-4">
            O Que Acontece em Cada <span className="text-primary">Etapa</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Transparência total: veja exatamente o que acontece do início ao lançamento
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300">
                {/* Timeline Marker */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <phase.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full">
                      {phase.phase}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {phase.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {phase.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-gray-300 text-sm md:text-base">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              {index < phases.length - 1 && (
                <div className="hidden md:block absolute left-10 top-full w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
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
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-2xl px-6 sm:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-primary" strokeWidth={2} />
              <p className="text-base sm:text-lg text-gray-300">
                <span className="text-white font-semibold">Tempo médio:</span> 60-90 dias do início ao lançamento
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Com entregas semanais e total transparência</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

