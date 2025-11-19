'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import Button from '@/components/ui/Button'

interface AdaptiveQuestionProps {
  pergunta: string
  onAnswer: (resposta: string) => void
  onSkip?: () => void
}

export default function AdaptiveQuestion({ pergunta, onAnswer, onSkip }: AdaptiveQuestionProps) {
  const [resposta, setResposta] = useState('')

  const handleSubmit = () => {
    if (resposta.trim()) {
      onAnswer(resposta.trim())
      setResposta('')
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-[#365eff]/10 border border-[#365eff]/30 rounded-lg p-4 mb-4"
    >
      <p className="text-sm text-white font-semibold mb-3">{pergunta}</p>
      <textarea
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        placeholder="Sua resposta..."
        rows={3}
        className="w-full px-3 py-2 text-sm bg-gray-900/50 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#365eff] transition-colors resize-none mb-3"
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!resposta.trim()}
          className="text-xs"
        >
          Responder
        </Button>
        {onSkip && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            className="text-xs"
          >
            Pular
          </Button>
        )}
      </div>
    </motion.div>
  )
}

