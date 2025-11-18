'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fadeInUp } from '@/lib/animations'

interface StatItemProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  label: string
  decimals?: number
}

function StatItem({ end, duration = 2, prefix = '', suffix = '', label, decimals = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(end)
    }
  }, [motionValue, isInView, end])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + latest.toFixed(decimals) + suffix
      }
    })
    return unsubscribe
  }, [springValue, prefix, suffix, decimals])

  return (
    <motion.div
      variants={fadeInUp}
      className="text-center"
    >
      <div
        ref={ref}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2"
      >
        {prefix}0{suffix}
      </div>
      <div className="text-sm sm:text-base text-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Números Que Falam Por Si
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Resultados reais de clientes reais
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <StatItem end={50} prefix="R$ " suffix="M+" label="Faturamento Gerado" decimals={0} />
            <StatItem end={120} suffix="+" label="Projetos Entregues" decimals={0} />
            <StatItem end={95} suffix="%" label="Taxa de Sucesso" decimals={0} />
            <StatItem end={30} suffix=" dias" label="Tempo Médio de Entrega" decimals={0} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8">
            <StatItem end={100} suffix="+" label="Clientes Atendidos" decimals={0} />
            <StatItem end={450} suffix="%" label="Média de Melhoria" decimals={0} />
            <StatItem end={24} suffix="h" label="Tempo de Resposta" decimals={0} />
            <StatItem end={5} suffix=" anos" label="No Mercado" decimals={0} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

