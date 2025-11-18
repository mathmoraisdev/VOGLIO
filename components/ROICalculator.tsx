'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp } from '@/lib/animations'
import Button from './ui/Button'

export default function ROICalculator() {
  const [currentRevenue, setCurrentRevenue] = useState('')
  const [targetRevenue, setTargetRevenue] = useState('')
  const [calculated, setCalculated] = useState(false)

  const calculateROI = () => {
    const current = parseFloat(currentRevenue) || 0
    const target = parseFloat(targetRevenue) || 0
    
    if (current > 0 && target > current) {
      setCalculated(true)
    }
  }

  const growth = calculated && parseFloat(currentRevenue) > 0
    ? ((parseFloat(targetRevenue) - parseFloat(currentRevenue)) / parseFloat(currentRevenue)) * 100
    : 0

  const monthlyIncrease = calculated && parseFloat(currentRevenue) > 0
    ? (parseFloat(targetRevenue) - parseFloat(currentRevenue)) / 12
    : 0

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Calcule Seu <span className="text-primary">ROI Potencial</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Veja quanto seu negócio pode crescer com uma solução digital completa
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Faturamento Mensal Atual (R$)
                </label>
                <input
                  type="number"
                  value={currentRevenue}
                  onChange={(e) => {
                    setCurrentRevenue(e.target.value)
                    setCalculated(false)
                  }}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ex: 50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta de Faturamento (R$)
                </label>
                <input
                  type="number"
                  value={targetRevenue}
                  onChange={(e) => {
                    setTargetRevenue(e.target.value)
                    setCalculated(false)
                  }}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ex: 150000"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <Button
                onClick={calculateROI}
                size="lg"
                disabled={!currentRevenue || !targetRevenue || parseFloat(targetRevenue) <= parseFloat(currentRevenue)}
                className="min-w-[200px]"
              >
                Calcular ROI
              </Button>
            </div>

            {calculated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                      {growth.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-400">Crescimento</div>
                  </div>

                  <div className="bg-primary/20 border border-primary/30 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      R$ {monthlyIncrease.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-400">Aumento Mensal</div>
                  </div>

                  <div className="bg-primary/20 border border-primary/30 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      R$ {(monthlyIncrease * 12).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-400">Aumento Anual</div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                  <p className="text-base text-gray-300 mb-2">
                    💡 <span className="text-white font-semibold">Investimento médio:</span> R$ 45.000
                  </p>
                  <p className="text-sm text-gray-500">
                    ROI estimado em <span className="text-white font-semibold">3-6 meses</span>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

