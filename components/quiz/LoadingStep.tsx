'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Check } from 'lucide-react'

interface LoadingStepProps {
  onComplete: () => void
}

const loadingSteps = [
  'Analisando seu perfil e objetivos',
  'Identificando oportunidades de crescimento',
  'Calculando prazo e investimento estimado',
  'Preparando seu roadmap personalizado',
  'Gerando insights estratégicos',
  'Finalizando sua análise completa',
]

export default function LoadingStep({ onComplete }: LoadingStepProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    // Após todos os steps + buffer, completa o loading
    const timeout = setTimeout(() => {
      onComplete()
    }, loadingSteps.length * 800 + 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div className="text-center">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <div className="text-3xl font-bold text-white mb-2">VOGLIO</div>
        <div className="h-1 w-24 bg-[#365eff] mx-auto rounded-full" />
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-12"
      >
        Analisando Suas Respostas...
      </motion.h2>

      <div className="space-y-4 max-w-md mx-auto">
        {loadingSteps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              x: 0,
            }}
            transition={{ delay: index * 0.3 }}
            className="flex items-center gap-3 text-left"
          >
            {index < currentStep ? (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            ) : index === currentStep ? (
              <div className="w-6 h-6 rounded-full border-2 border-[#365eff] flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#365eff] animate-pulse" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-700 flex-shrink-0" />
            )}
            <span
              className={`${
                index <= currentStep ? 'text-white' : 'text-gray-600'
              } transition-colors`}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Barra de loading animada */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 5, ease: 'linear' }}
        className="mt-12 h-1 bg-gradient-to-r from-[#365eff] to-[#4a6eff] rounded-full max-w-md mx-auto"
      />
    </div>
  )
}
