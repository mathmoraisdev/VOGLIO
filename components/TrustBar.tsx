'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fadeIn } from '@/lib/animations'

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number | string, suffix?: string, prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    if (typeof value === 'number') {
      const unsubscribe = springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(latest) + suffix
        }
      })
      return unsubscribe
    } else {
      if (ref.current) {
        ref.current.textContent = prefix + value + suffix
      }
    }
  }, [springValue, value, prefix, suffix])

  return <div ref={ref}>{prefix}{typeof value === 'number' ? 0 : value}{suffix}</div>
}

const trustItems = [
  { label: 'R$ 50M+', description: 'Faturamento Gerado para Clientes', animate: true },
  { label: '120+', description: 'Projetos Entregues', animate: true },
  { label: '95%', description: 'Taxa de Satisfação', animate: true },
  { label: '45 dias', description: 'Média: Zero ao Primeiro Cliente', animate: false },
]

export default function TrustBar() {
  return (
    <section id="trust-bar" className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200" data-section-type="white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {trustItems.map((item, index) => {
            let number: number | null = null
            let suffix = ''
            let prefix = ''
            
            if (item.label.includes('R$')) {
              number = 50
              suffix = 'M+'
              prefix = 'R$ '
            } else if (item.label.includes('+')) {
              number = parseInt(item.label.replace('+', ''))
              suffix = '+'
            } else if (item.label.includes('%')) {
              number = parseInt(item.label.replace('%', ''))
              suffix = '%'
            }
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2 min-h-[44px] sm:min-h-[60px] flex items-center justify-center">
                  {item.animate && number !== null ? (
                    <AnimatedNumber value={number} suffix={suffix} prefix={prefix} />
                  ) : (
                    item.label
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium px-2">
                  {item.description}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

