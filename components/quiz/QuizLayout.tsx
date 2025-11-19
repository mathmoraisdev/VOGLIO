'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import ProgressBar from './ProgressBar'

interface QuizLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  showProgress?: boolean
  showBackButton?: boolean
  onBack?: () => void
}

export default function QuizLayout({
  children,
  currentStep,
  totalSteps,
  showProgress = true,
  showBackButton = false,
  onBack,
}: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-3xl">
        {showProgress && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <ProgressBar current={currentStep} total={totalSteps} />
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl"
        >
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition-colors text-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Voltar
            </button>
          )}

          {children}
        </motion.div>
      </div>
    </div>
  )
}
