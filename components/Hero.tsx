'use client'

import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '@/lib/animations'
import Button from './ui/Button'
import { DollarSign, Zap, Lock, Check } from 'lucide-react'
import ProjectSlider from './ProjectSlider'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-x-hidden overflow-y-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-[40px]">
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

          <div className="relative z-[4] max-w-6xl mx-auto text-center mt-[60px]">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[42px] font-bold mb-3 sm:mb-4 leading-tight px-0 sm:px-2">
            A Única Agência Que <span style={{ color: '#365eff' }}>Cria E Divulga</span> Seu Negócio Digital.
            <br />
            <span style={{ color: '#365eff' }}>Tudo Junto.</span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-2 leading-relaxed"
        >
          Chega de contratar <span className="text-white font-semibold">um pra criar, outro pra divulgar</span>{' '}
          <br className="hidden sm:block" />
          e <span className="text-white font-semibold">nada vender</span>. Aqui é <span className="text-white font-semibold">tudo pela mesma equipe</span>{' '}
          <br className="hidden sm:block" />
          por isso{' '}
          <br className="hidden sm:block" />
          <span className="text-white font-semibold">funciona de verdade</span>.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <Button size="lg" onClick={() => {
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
          }} className="w-full sm:w-auto min-w-[280px] text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8">
            Agendar Minha Consultoria Gratuita
          </Button>
          
          {/* Micro-copy abaixo do botão */}
          <div className="space-y-2 text-xs sm:text-sm text-gray-400 max-w-md">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={2.5} />
              <span>Consultoria estratégica de 60min <span className="text-gray-500">(valor: R$ 2.500 - grátis hoje)</span></span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={2.5} />
              <span>Roadmap personalizado do seu projeto</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={2.5} />
              <span>Estimativa de ROI e investimento</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" strokeWidth={2} />
              <span className="text-yellow-400 font-semibold">Apenas 5 vagas disponíveis esta semana</span>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-medium">
            Desenvolvimento • Tráfego • Conversão
            <br />
            <span className="text-gray-500">Separados, nada funciona. Juntos, tudo muda.</span>
          </p>
        </motion.div>

        {/* Project Slider */}
        <ProjectSlider />

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

