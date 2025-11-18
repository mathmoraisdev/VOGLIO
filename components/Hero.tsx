'use client'

import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '@/lib/animations'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-gray-900/80 z-[2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,94,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(54,94,255,0.1),transparent_50%)]" />
      </div>

          {/* Animated grid background */}
          <motion.div
            className="absolute inset-0 opacity-20 z-[3]"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </motion.div>

          <div className="relative z-[4] max-w-6xl mx-auto text-center">
        {/* Social Proof Badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 sm:px-6 py-2 sm:py-3">
            <span className="text-xl sm:text-2xl">💰</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-200">
              Mais de R$ 50M gerados para nossos clientes
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight px-2">
            <span className="block mb-2">Transforme Sua Ideia em um</span>
            <span className="block" style={{ color: '#365eff' }}>
              Negócio Digital de 6 Dígitos
            </span>
            <span className="block mt-2">em 90 Dias</span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 max-w-4xl mx-auto px-2"
        >
          Sistema completo: desenvolvimento, funil de vendas e tráfego qualificado. <span className="text-white font-semibold">Tudo em um só lugar.</span>
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <Button size="lg" onClick={() => {
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
          }} className="w-full sm:w-auto min-w-[280px]">
            Agendar Consultoria Gratuita
          </Button>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">⚡</span> Vagas limitadas
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">🔒</span> Sem compromisso
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <span className="text-primary">✓</span> Resposta em 24h
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

