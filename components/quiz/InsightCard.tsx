'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Lightbulb, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react'

interface InsightCardProps {
  texto: string
  tipo: 'oportunidade' | 'risco' | 'dica' | 'benchmark'
}

const iconMap = {
  oportunidade: TrendingUp,
  risco: AlertTriangle,
  dica: Lightbulb,
  benchmark: BarChart3,
}

const colorMap = {
  oportunidade: 'text-green-400 bg-green-500/10 border-green-500/30',
  risco: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  dica: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  benchmark: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
}

export default function InsightCard({ texto, tipo }: InsightCardProps) {
  const Icon = iconMap[tipo]
  const colors = colorMap[tipo]

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={`${colors} border rounded-lg p-4 mb-4`}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} />
        <p className="text-sm font-medium flex-1">{texto}</p>
      </div>
    </motion.div>
  )
}

