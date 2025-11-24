'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useEffect, useState } from 'react'
import { 
  Globe, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  Megaphone,
  Sparkles
} from 'lucide-react'
import { useMotionValue, useSpring, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const trustItems = [
  { label: 'R$ 300M+', description: 'Faturamento Gerado', animate: true },
  { label: '36+', description: 'Projetos Entregues', animate: true },
  { label: '3x', description: 'Aumento Médio de Vendas', animate: true },
  { label: '30 dias', description: 'Resultados visíveis', animate: false },
]

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number | string, suffix?: string, prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    if (typeof value === 'number') {
      const unsubscribe = springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(latest) + suffix
        }
      })
      return unsubscribe
    } else {
      if (ref.current) {
        ref.current.textContent = prefix + value + suffix
      }
    }
  }, [springValue, value, prefix, suffix])

  return <div ref={ref}>{prefix}{typeof value === 'number' ? 0 : value}{suffix}</div>
}

const platformLogos = [
  { name: 'Meta', src: '/meta.png', alt: 'Meta' },
  { name: 'Google Ads', src: '/google.png', alt: 'Google Ads' },
  { name: 'TikTok', src: '/tiktok.png', alt: 'TikTok' },
  { name: 'Bing', src: '/bing.png', alt: 'Bing' },
  { name: 'Taboola', src: '/taboola.png', alt: 'Taboola' },
]

const benefits = [
  {
    icon: Megaphone,
    title: 'Multicanais de mídia paga',
    description: 'Equipe de especialistas em Meta, Google, TikTok, Bing, Taboola, entre outras.'
  },
  {
    icon: Globe,
    title: 'Experiência Internacional',
    description: 'Atuamos em diversos países e sabemos como posicionar seu negócio.'
  },
  {
    icon: TrendingUp,
    title: 'Anúncios que vendem',
    description: 'O criativo que conversa com seu cliente.'
  },
  {
    icon: FileText,
    title: 'Equipe de CopyWriters',
    description: 'Criamos histórias que vendem.'
  },
  {
    icon: Sparkles,
    title: 'Growth Marketing',
    description: 'Estratégias constantes focada no crescimento do seu resultado.'
  },
  {
    icon: BarChart3,
    title: 'Dashboard',
    description: 'Acompanhe seu projeto e saiba tudo que acontece em tempo real.'
  },
]

export default function SalesExpertise() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false) // Inicia como false (desktop)

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
    }
    
    // Verifica imediatamente
    if (typeof window !== 'undefined') {
      checkMobile()
    }
    
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Calcula quantos slides são possíveis
    const cardsPerView = isMobile ? 1 : 2
    const maxIndex = Math.max(0, Math.ceil(benefits.length / cardsPerView) - 1)
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (maxIndex === 0) return 0
        return (prev + 1) % (maxIndex + 1)
      })
    }, 4000) // Muda a cada 4 segundos

    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Deixe com quem<br /><span className="text-primary">sabe vender</span>
          </h2>
        </motion.div>

        {/* TrustBar abaixo do título - versão adaptada para fundo escuro */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8 md:mb-12 py-6 md:py-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustItems.map((item, index) => {
              let number: number | null = null
              let suffix = ''
              let prefix = ''
              
              if (item.label.includes('R$')) {
                number = 300
                suffix = 'M+'
                prefix = 'R$ '
              } else if (item.label.includes('x')) {
                number = parseInt(item.label.replace('x', ''))
                suffix = 'x'
              } else if (item.label.includes('+')) {
                number = parseInt(item.label.replace('+', ''))
                suffix = '+'
              } else if (item.label.includes('%')) {
                number = parseInt(item.label.replace('%', ''))
                suffix = '%'
              }
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2 min-h-[44px] sm:min-h-[60px] flex items-center justify-center">
                    {item.animate && number !== null ? (
                      <AnimatedNumber value={number} suffix={suffix} prefix={prefix} />
                    ) : (
                      item.label
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium px-2">
                    {item.description}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Descrição após o TrustBar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Mais de <span className="text-white font-semibold">300 milhões em receita gerada</span> para diferentes negócios ao redor do mundo. Nosso time conversa em todas as etapas do seu projeto e garante métricas mais assertivas e uma metodologia comprovada que gera vendas diariamente para seu negócio com a alta lucratividade.
          </p>
        </motion.div>

        {/* Slider de Benefícios */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative w-full"
        >
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 100)}%)`,
              }}
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className={`flex-shrink-0 ${isMobile ? 'w-full px-2' : 'w-1/2 px-3'}`}
                  >
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-xl p-5 md:p-6 h-full hover:border-primary/50 transition-all duration-300 group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white leading-tight pt-1">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Indicadores de posição */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ 
              length: Math.max(1, Math.ceil(benefits.length / (isMobile ? 1 : 2)))
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Slider de logos das plataformas */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 md:mt-16"
        >
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll-infinite gap-8 md:gap-12" style={{ width: 'fit-content' }}>
              {/* Duplicar logos para criar loop infinito */}
              {[...platformLogos, ...platformLogos, ...platformLogos].map((logo, logoIndex) => (
                <div
                  key={`${logo.name}-${logoIndex}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: '120px', height: '40px' }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

