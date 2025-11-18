'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Flame, Star, DollarSign, Rocket } from 'lucide-react'

const messages = [
  { text: '3 clientes contrataram hoje', icon: Flame },
  { text: '95% de satisfação', icon: Star },
  { text: 'R$ 50M+ gerados', icon: DollarSign },
  { text: '120+ projetos entregues', icon: Rocket },
]

export default function SocialProofBar() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-t border-gray-800/50 px-4 py-3 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        {(() => {
          const IconComponent = messages[currentMessage].icon
          return <IconComponent className="w-5 h-5 text-primary" strokeWidth={2} />
        })()}
        <motion.p
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm sm:text-base text-gray-300 font-medium"
        >
          {messages[currentMessage].text}
        </motion.p>
        <button
          onClick={() => {
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="text-xs sm:text-sm text-primary hover:text-primary-300 font-semibold underline ml-4"
        >
          Quero ser o próximo →
        </button>
      </div>
    </motion.div>
  )
}

