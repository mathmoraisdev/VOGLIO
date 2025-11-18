'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { scaleIn } from '@/lib/animations'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-gray-700/50 transition-all duration-300 touch-manipulation ${className}`}
    >
      {children}
    </motion.div>
  )
}

