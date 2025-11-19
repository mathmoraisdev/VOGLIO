'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Sparkles } from 'lucide-react'

interface PreviewAnalysisProps {
  preview: string
}

export default function PreviewAnalysis({ preview }: PreviewAnalysisProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-[#365eff]/20 to-[#4a6eff]/10 border border-[#365eff]/30 rounded-xl p-5 mb-6"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-[#365eff]">
          <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-base mb-2">
            Preview da Sua Análise
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{preview}</p>
          <p className="text-xs text-gray-400 mt-3 italic">
            Análise completa será gerada ao final do quiz
          </p>
        </div>
      </div>
    </motion.div>
  )
}

