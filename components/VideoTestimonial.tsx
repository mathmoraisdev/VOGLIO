'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeInUp } from '@/lib/animations'

export default function VideoTestimonial() {
  const [playing, setPlaying] = useState(false)

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
            Veja O Que Nossos Clientes <span className="text-primary">Dizem</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Depoimentos em vídeo de quem já transformou seu negócio conosco
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 rounded-2xl overflow-hidden aspect-video">
            {!playing ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 cursor-pointer group" onClick={() => setPlaying(true)}>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold mb-2">Assista ao Depoimento</p>
                  <p className="text-sm text-gray-400">Carlos Mendes - TechFlow Solutions</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎥</div>
                  <p className="text-white font-semibold mb-2">Vídeo de Depoimento</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Aqui você pode integrar um player de vídeo real (YouTube, Vimeo, etc.)
                  </p>
                  <button
                    onClick={() => setPlaying(false)}
                    className="text-primary hover:text-primary-300 text-sm underline"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-xl px-6 py-4">
              <div className="text-left">
                <p className="text-white font-bold">Carlos Mendes</p>
                <p className="text-sm text-gray-400">CEO, TechFlow Solutions</p>
              </div>
              <div className="text-left border-l border-gray-800 pl-4">
                <p className="text-green-400 font-semibold">R$ 2.5M em 6 meses</p>
                <p className="text-xs text-gray-500">Resultado alcançado</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

